import React, { useEffect } from "react"
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useRecoilValue } from "recoil"
import { pointsState } from "../state"

export default function UserPointsVisualization() {
    const points = useRecoilValue(pointsState)

    return (
        <div className="flex flex-col justify-between w-1/2 aspect-[1/1] bg-white rounded-lg bg-opacity-50 text-blue-400 pt-6 pb-4 pr-8">
            {points?.length > 0 ? (
                <div className="relative size-full">
                    <ResponsiveContainer width="100%">
                        <ScatterChart>
                            <CartesianGrid />
                            <XAxis type="number" dataKey="x" name="X" unit="" />
                            <YAxis type="number" dataKey="y" name="Y" unit="" />
                            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                            <Scatter data={points} fill="#72d932" />
                        </ScatterChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                <div className="size-full flex justify-center text-4xl pl-4">Select points</div>
            )}
        </div>
    )
}
