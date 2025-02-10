import React from "react"

export default function UserInputContainer() {
    return (
        <div className="flex flex-col justify-between w-1/2 gap-4 p-6 bg-white rounded-lg bg-opacity-50 text-blue-400">
            <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                    <span className="w-full text-lg">Linkage type:</span>
                    <select className="w-full p-2 rounded-lg bg-blue-100 text-blue-400">
                        <option>Single</option>
                        <option>Complete</option>
                    </select>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-lg">Insert new point:</span>
                    <input
                        className="py-2 px-4 rounded-lg bg-blue-100 text-blue-400 w-20"
                        type="number"
                        placeholder="x"
                    />
                    <input
                        className="py-2 px-4 rounded-lg bg-blue-100 text-blue-400 w-20"
                        type="number"
                        placeholder="y"
                    />
                    <button className="text-4xl rounded-lg transition text-blue-400 hover:text-blue-500">+</button>
                </div>
            </div>
            <button className="text-xl uppercase text-white rounded-lg py-2 mt-4 transition bg-blue-400 hover:bg-blue-500">Calculate results</button>
        </div>
    )
}
