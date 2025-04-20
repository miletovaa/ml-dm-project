export type Point = {
    id: string
    x: number
    y: number
}

export type Points = Point[] | []

export type ClosestPoints = {
    pointAId: string
    pointBId: string
    minDist: number
}