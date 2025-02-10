import React from "react";

import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function UserPointsVisualization() {
    const points = [
        { x: 2, y: 5 },
        { x: 3, y: 4 },
        { x: 10, y: 2 },
        { x: 6, y: 15 },
    ]

    return (
        <div className="flex flex-col justify-between w-1/2 aspect-[1/1] bg-white rounded-lg bg-opacity-50 text-blue-400 pt-6 pb-4 pr-8">
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
        </div>
    )
}
