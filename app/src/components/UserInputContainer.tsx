import React, { useMemo } from "react"
import { useSetRecoilState, useRecoilValue } from "recoil"
import classnames from "classnames"
import { linkageTypeState, pointsState } from "../state"
import { Points } from "../types/point"
import { LinkageType } from "../types"

export default function UserInputContainer() {
    const setLinkage = useSetRecoilState<LinkageType>(linkageTypeState)
    const points = useRecoilValue<Points>(pointsState)

    const isPointsEmpty = useMemo(() => points?.length === 0, [points])

    return (
        <div className="flex flex-col justify-between gap-4 py-4 px-6 bg-white rounded-lg bg-opacity-50 text-blue-400 w-1/2 min-w-[360px]">
            <div className="flex flex-col">
                <div className="flex items-center gap-4">
                    <span className="w-full text-center text-xl">Linkage type:</span>
                    <select
                        className="w-full p-2 rounded-lg bg-blue-100 text-blue-400"
                        onChange={(e) => setLinkage(parseInt(e.target.value) as LinkageType)}
                    >
                        <option value={0}>Single</option>
                        <option value={1}>Complete</option>
                    </select>
                </div>
                <button
                    className={classnames("text-xl uppercase text-white rounded-lg bg-blue-400 hover:bg-blue-500 transition-all duration-1000", {
                        "opacity-0 size-0 m-0 p-0": isPointsEmpty,
                        "opacity-100 mt-4 py-2 size-auto": !isPointsEmpty
                    })}
                    onClick={() => console.log("Calculating results...")}
                >Calculate results</button>
            </div>
        </div>
    )
}
