type Distance = {
    id: string
    distance: number
}

type Point = {
    id: string
    distances: Distance[]
}

export type DistanceMatrix = Point[]