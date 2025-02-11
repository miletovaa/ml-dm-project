import React, { useCallback, useState } from "react"
import { useSetRecoilState } from "recoil"
import { linkageTypeState, pointsState } from "../state"

export default function UserInputContainer() {
    const setLinkage = useSetRecoilState(linkageTypeState)
    const setPoints = useSetRecoilState(pointsState)

    const [x, setX] = useState(0)
    const [y, setY] = useState(0)

    const addNewPoint = useCallback(() => {
        if (x === 0 && y === 0) return
        setPoints((points) => [...points, { x, y }])
        setX(0)
        setY(0)
    }, [x, y, setX, setY, setPoints])

    return (
        <div className="flex flex-col justify-between w-1/2 gap-4 p-6 bg-white rounded-lg bg-opacity-50 text-blue-400">
            <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                    <span className="w-full text-lg">Linkage type:</span>
                    <select 
                        className="w-full p-2 rounded-lg bg-blue-100 text-blue-400"
                        onChange={(e) => setLinkage(parseInt(e.target.value))}
                    >
                        <option value={0}>Single</option>
                        <option value={1}>Complete</option>
                    </select>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-lg">Insert new point:</span>
                    <input
                        value={x}
                        min={0}
                        step={1}
                        className="py-2 px-4 rounded-lg bg-blue-100 text-blue-400 w-20"
                        type="number"
                        placeholder="x"
                        onChange={(e) => setX(parseInt(e.target.value))}
                    />
                    <input
                        value={y}
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
            <button className="text-xl uppercase text-white rounded-lg py-2 mt-4 transition bg-blue-400 hover:bg-blue-500">Calculate results</button>
        </div>
    )
}
