import { DendrogramNode } from './../types/dendrogram'
import { Points, Point, LinkageType, DistanceMatrix, ClosestPoints } from "../types"

function calculateInitialDistanceMatrix(points: Points): DistanceMatrix {
    return points.map((point: Point, i: number) => ({
        id: (i + 1).toString(),
        distances: points.map((_: Point, j: number) => ({
            id: (j + 1).toString(),
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

    function getNewDistance(id: string, pointAId: string, pointBId: string) {
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

export function clusteringAlgorithm(initialPoints: Points, linkageType: LinkageType): { matrices: DistanceMatrix[], nodes: DendrogramNode[] } {
    const points = [...initialPoints]

    const distanceMatrix = calculateInitialDistanceMatrix(points)
    const initDendrogramNodes = points.map((point) => ({
        index: point.id,
        height: 0,
        isLeaf: true,
    }))

    return points.slice(0, -1).reduce((acc, _) => {
        const { matrices, nodes } = acc
        const lastMatrix = matrices[matrices.length - 1]
        const closestPoints = getClosestPoints(lastMatrix)

        const { pointAId, pointBId, minDist } = closestPoints

        const updatedMatrices = lastMatrix.length > 2 ? [
            ...matrices,
            calculateNewDistanceMatrix(lastMatrix, closestPoints, linkageType)
        ] : matrices

        const updatedNodes = [
            ...nodes,
            {
                index: `${pointAId}${pointBId}`,
                height: minDist,
                children: [
                    nodes.find((node: DendrogramNode) => node.index === pointAId),
                    nodes.find((node: DendrogramNode) => node.index === pointBId)
                ]
            }
        ]

        return {
            matrices: updatedMatrices,
            nodes: updatedNodes
        }
    }, { matrices: [ distanceMatrix ], nodes: initDendrogramNodes } as { matrices: DistanceMatrix[], nodes: any })
}

export function getClusters(dendrogram: DendrogramNode): { cutHeight: number, clusters: string[] } {
    const heights: number[] = []

    function collectHeights(node: DendrogramNode) {
        if (node.height) {
            heights.push(node.height)
            node.children?.forEach(collectHeights)
        }
    }

    collectHeights(dendrogram)

    const sorted = Array.from(heights.sort((a, b) => a - b))

    let maxDiff = 0
    let maxJumpIndex = 0

    for (let i = 0; i < sorted.length - 1; i++) {
        const diff = sorted[i + 1] - sorted[i]
        if (diff > maxDiff) {
            maxDiff = diff
            maxJumpIndex = i
        }
    }

    const cutHeight = sorted[maxJumpIndex] + maxDiff / 2

    const clusters: string[] = []

    function collectClusters(node: DendrogramNode) {
        if (node.height <= cutHeight) {
            clusters.push(node.index)
        } else {
            node.children?.forEach(collectClusters)
        }
    }

    collectClusters(dendrogram)

    return { cutHeight, clusters }
}