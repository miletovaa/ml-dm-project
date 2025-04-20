import React, { useCallback, useState } from "react"
import { useSetRecoilState } from "recoil"
import { pointsState } from "../state"
import { Points } from "../types"

export default function InsertNewPoint() {
    const setPoints = useSetRecoilState<Points>(pointsState)

    const [x, setX] = useState<number>(0)
    const [y, setY] = useState<number>(0)

    const addNewPoint = useCallback(() => {
        if (x === 0 && y === 0) return
        setPoints((points: Points) => [...points, { x, y, id: points.length + 1 }])
        setX(0)
        setY(0)
    }, [x, y, setX, setY, setPoints])

    return (
        <div className="flex gap-4 justify-center items-center px-4">
            <span className="text-xl text-center">Add point:</span>
            <div className="flex items-center gap-4">
                <input
                    value={x === 0 ? "" : x}
                    min={0}
                    step={1}
                    className="py-2 px-4 rounded-lg bg-blue-100 text-blue-400 w-20"
                    type="number"
                    placeholder="x"
                    onChange={(e) => setX(parseInt(e.target.value))}
                    />
                <input
                    value={y === 0 ? "" : y}
                    min={0}
                    step={1}
                    className="py-2 px-4 rounded-lg bg-blue-100 text-blue-400 w-20"
                    type="number"
                    placeholder="y"
                    onChange={(e) => setY(parseInt(e.target.value))}
                    />
                <button
                    className="text-4xl rounded-lg transition text-blue-400 hover:text-blue-500"
                    onClick={addNewPoint}
                    >+</button>
            </div>
        </div>
    )
}