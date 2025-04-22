export type DendrogramNode = {
    index: string
    height: number
    isLeaf?: boolean
    children?: DendrogramNode[]
}