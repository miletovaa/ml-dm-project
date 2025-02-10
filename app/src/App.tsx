import React from "react";
import UserInputContainer from "./components/UserInputContainer.tsx";
import UserPointsVisualization from "./components/UserPointsVisualization.tsx";

export default function App() {
  return (
    <div className="w-full h-screen bg-gradient-to-b to-blue-300 from-blue-100 flex justify-center pt-24">
      <div className="flex flex-col gap-4 p-8">
        <h1 className="capitalize text-blue-400 text-4xl font-bold p-8">Hierarchical agglomerative clustering algorithm</h1>
        <div className="flex gap-3 p-3 bg-white rounded-lg bg-opacity-30 text-blue-400">
          <UserInputContainer />
          <UserPointsVisualization />
        </div>
      </div>
    </div>
  )
}
