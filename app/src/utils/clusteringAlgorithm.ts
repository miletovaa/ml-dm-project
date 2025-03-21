import { Points, Point, LinkageType, DistanceMatrix } from "../types"

function calculateDistanceMatrix(points: Points): DistanceMatrix {
    const distanceMatrix: DistanceMatrix = [];

    for (let i = 0; i < points.length; i++) {
        distanceMatrix[i] = [];
        for (let j = 0; j < points.length; j++) {
            if (i === j) {
                distanceMatrix[i][j] = 0
            } else {
                distanceMatrix[i][j] = Math.abs(points[i].x - points[j].x) + Math.abs(points[i].y - points[j].y)
            }
        }
    }

    return distanceMatrix
}

export function clusteringAlgorithm(initialPoints: Points, linkageType: LinkageType): DistanceMatrix[] {
    const matrices: DistanceMatrix[] = []
    let points = [...initialPoints]

    while (points.length > 1) {
        const distanceMatrix = calculateDistanceMatrix(points);
        matrices.push(distanceMatrix);

        let minDist = Number.MAX_VALUE;
        let minI = -1, minJ = -1;

        for (let i = 0; i < distanceMatrix.length; i++) {
            for (let j = 0; j < distanceMatrix[i].length; j++) {
                if (i !== j) {
                    const currentDist = distanceMatrix[i][j];

                    if (currentDist < minDist) {
                        minDist = currentDist;
                        minI = i
                        minJ = j
                    }
                }
            }
        }

        if (minI === -1 || minJ === -1) break

        const newPoint: Point = {
            id: Math.min(points[minI].id, points[minJ].id),
            x: (points[minI].x + points[minJ].x) / 2,
            y: (points[minI].y + points[minJ].y) / 2
        }

        points = points.filter((_, index) => index !== minI && index !== minJ)
        points.push(newPoint)

        for (let i = 0; i < points.length - 1; i++) {
            let newDist = linkageType === 0
                ? Math.min(distanceMatrix[minI][i], distanceMatrix[minJ][i])
                : Math.max(distanceMatrix[minI][i], distanceMatrix[minJ][i])

            distanceMatrix[i][points.length - 1] = newDist
            distanceMatrix[points.length - 1][i] = newDist
        }
    }

    return matrices
}