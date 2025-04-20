import { Points, Point, LinkageType, DistanceMatrix, ClosestPoints } from "../types"

function calculateInitialDistanceMatrix(points: Points): DistanceMatrix {
    return points.map((point: Point, i: number) => ({
        id: i + 1,
        distances: points.map((_: Point, j: number) => ({
            id: j + 1,
            distance: Math.abs(point.x - points[j].x) + Math.abs(point.y - points[j].y)
        }))
    }))
}

function getClosestPoints(distanceMatrix: DistanceMatrix): ClosestPoints {
    return distanceMatrix.reduce((acc, row) => {
        const distances = row.distances.filter(e => e.distance > 0)
        const minRowDist = Math.min(...distances.map(e => e.distance))

        return minRowDist < acc.minDist
            ? { 
                pointAId: row.id,
                pointBId: distances.find(e => e.distance === minRowDist).id, 
                minDist: minRowDist
            }
            : acc
    }, { pointAId: null, pointBId: null, minDist: Infinity })
}

function calculateNewDistanceMatrix(oldMatrix: DistanceMatrix, closestPoints: ClosestPoints, linkageType: LinkageType): DistanceMatrix {
    const { pointAId, pointBId } = closestPoints

    function getNewDistance(id: number, pointAId: number, pointBId: number) {
        const { distances } = oldMatrix.find(e => e.id === id)

        const { distance: distanceA } = distances.find(d => d.id === pointAId)
        const { distance: distanceB } = distances.find(d => d.id === pointBId)

        return linkageType === "S"
            ? Math.min(distanceA, distanceB)
            : Math.max(distanceA, distanceB)
    }

    return oldMatrix.reduce((accR, row) => {
        switch (row.id) {
            case pointAId:
                return accR
            case pointBId:
                return [
                    ...accR,
                    {
                        id: `${pointAId}${pointBId}`,
                        distances: row.distances.reduce((accD, { id }) => {
                            switch (id) {
                                case pointAId:
                                    return accD
                                case pointBId:
                                    return [
                                        ...accD,
                                        {
                                            id: `${pointAId}${pointBId}`,
                                            distance: 0
                                        }
                                    ]
                                default:
                                    return [
                                        ...accD,
                                        {
                                            id,
                                            distance: getNewDistance(id, pointAId, pointBId)
                                        }
                                    ]
                            }
                        }, [])
                    }
                ]
            default:
                return [
                    ...accR,
                    {
                        id: row.id,
                        distances: row.distances.reduce((accD, distance) => {
                            switch (distance.id) {
                                case pointAId:
                                    return accD
                                case pointBId:
                                    return [
                                        ...accD,
                                        {
                                            id: `${pointAId}${pointBId}`,
                                            distance: getNewDistance(row.id, pointAId, pointBId)
                                        }
                                    ]
                                default:
                                    return [
                                        ...accD,
                                        distance
                                    ]
                            }
                        }, [])
                    }
                ]
        }
    }, [])
}

export function clusteringAlgorithm(initialPoints: Points, linkageType: LinkageType): DistanceMatrix[] {
    const points = [...initialPoints]

    const distanceMatrix = calculateInitialDistanceMatrix(points)

    const matrices = points.reduce((acc, _) => {
        const matrix = acc[acc.length - 1]
        const closestPoints = getClosestPoints(matrix)

        return matrix.length > 2 ? [
            ...acc,
            calculateNewDistanceMatrix(matrix, closestPoints, linkageType)
        ] : acc
    }, [ distanceMatrix ] as DistanceMatrix[])

    return matrices
}
