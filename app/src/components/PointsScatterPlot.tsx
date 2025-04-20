import React, { useMemo } from "react"
import { useRecoilValue } from "recoil"
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts'
import InsertNewPoint from "./InsertNewPoint"
import { pointsState } from "../state"
import { Point, Points } from "../types"
import classnames from "classnames"

export default function PointsScatterPlot() {
    const points = useRecoilValue<Points>(pointsState)
    
    const isPointsEmpty = useMemo(() => points?.length === 0, [points])

    return (
        <div className="flex flex-col justify-between bg-white rounded-lg bg-opacity-50 py-4 text-blue-400 transition-all duration-1000 w-[360px] opacity-100">
            <InsertNewPoint />
            <div className={classnames("transition-all duration-1000",{
                "size-0": isPointsEmpty,
                "size-80 pt-6 pr-8": !isPointsEmpty
            })}>
                <div className={classnames("relative transition-all duration-[2000]", {
                    "size-0 opacity-0": isPointsEmpty,
                    "size-full opacity-100": !isPointsEmpty
                })}>
                    <ResponsiveContainer width="100%">
                        <ScatterChart>
                            <CartesianGrid />
                            <XAxis type="number" dataKey="x" name="X" unit="" />
                            <YAxis type="number" dataKey="y" name="Y" unit="" />
                            <Tooltip />
                            <Scatter data={points.map((p: Point) => ({ ...p, id: p.id + 1 }))} fill="#72d932">
                                <LabelList dataKey="id" position="right" />
                            </Scatter>
                        </ScatterChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}
