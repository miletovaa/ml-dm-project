import { useMemo, useCallback, useState } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import classnames from "classnames"
import { linkageTypeState, pointsState } from "../state"
import { Points } from "../types/point"
import { DistanceMatrix, LinkageType } from "../types"
import { clusteringAlgorithm, getClusters } from "../utils/clusteringAlgorithm"
import Dendrogram from "./Dendrogram"
import DistanceMatrixPlot from "./DistanceMatrixPlot"
import { DendrogramNode } from "../types/dendrogram"

export default function UserInputContainer() {
    const [linkageType, setLinkage] = useRecoilState<LinkageType>(linkageTypeState)
    const points = useRecoilValue<Points>(pointsState)
    
    const [matrices, setMatrices] = useState<DistanceMatrix[]>([])
    const [dendrogram, setDendrogram] = useState<DendrogramNode | null>(null)
    const [clusters, setClusters] = useState<Array<string>>(null)
    const [cutHeight, setCutHeight] = useState<number>(null)

    const isPointsEmpty = useMemo(() => points?.length < 2, [points])

    const calculate = useCallback(() => {
        const result = clusteringAlgorithm(points, linkageType)
        setMatrices(result.matrices)
        setDendrogram(result.nodes[result.nodes.length - 1])
        const clustersResult = getClusters(result.nodes[result.nodes.length - 1])
        setClusters(clustersResult.clusters)
        setCutHeight(clustersResult.cutHeight)
    }, [points, linkageType])

    return (
        <div className="flex flex-col justify-between gap-4 py-4 px-6 bg-white rounded-lg bg-opacity-50 text-blue-400 w-1/2 w-[360px]">
            <div className="flex flex-col">
                <div className="flex items-center gap-4">
                    <span className="w-full text-center text-xl">Linkage type:</span>
                    <select
                        className="w-full p-2 rounded-lg bg-blue-100 text-blue-400"
                        onChange={(e) => setLinkage(e.target.value as LinkageType)}
                    >
                        <option value="S">Single</option>
                        <option value="C">Complete</option>
                    </select>
                </div>
                <button
                    className={classnames("text-xl uppercase text-white rounded-lg bg-blue-400 hover:bg-blue-500 transition-all duration-1000", {
                        "opacity-0 size-0 m-0 p-0": isPointsEmpty,
                        "opacity-100 mt-4 py-2 size-auto": !isPointsEmpty
                    })}
                    onClick={calculate}
                >Calculate results</button>
                {isPointsEmpty && 
                    <div className="text-center italic text-xs mt-2">
                        Please add at least 2 points to calculate the results    
                    </div>
                }
            </div>
            <div className="flex flex-col gap-2 scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-blue-100 overflow-y-auto max-h-60">
                {clusters?.length > 0 &&
                    <div className="text-lg">
                        Clustering result ({clusters.length}): {clusters.map(c => `{${c}}`).join(", ")}
                    </div>
                }
                <Dendrogram data={dendrogram} cutHeight={cutHeight} />
                {matrices.length > 0 && matrices.map((matrix: DistanceMatrix, index: number) => <DistanceMatrixPlot key={index} matrix={matrix} />)}
            </div>
        </div>
    )
}
