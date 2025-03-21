import React from 'react'
import UserInputContainer from "./components/UserInputContainer"
import PointsScatterPlot from "./components/PointsScatterPlot"

export default function App() {
  return (
    <div className="w-full h-screen bg-gradient-to-b to-blue-300 from-blue-100 flex justify-center items-center">
      <div className="flex w-full flex-col gap-4 p-8">
        <h1 className="capitalize text-center text-blue-400 text-4xl font-bold p-8">Hierarchical agglomerative clustering algorithm</h1>
        <div className="flex lg:flex-row flex-col w-fit gap-3 p-3 mx-auto bg-white rounded-lg bg-opacity-30 text-blue-400">
          <PointsScatterPlot />
          <UserInputContainer />
        </div>
      </div>
    </div>
  )
}
