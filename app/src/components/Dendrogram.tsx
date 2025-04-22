import { useEffect, useRef } from "react"
import { getDendrogram } from "../utils/dendrogram"
import { DendrogramNode } from "../types/dendrogram"

const testData = {
    height: 18,
    children: [
        {
            height: 8,
            children: [
              {
                height: 2,
                children: [
                  { height: 0, isLeaf: true, index: "1" },
                  { height: 0, isLeaf: true, index: "2" }
                ]
              },
              {
                height: 2,
                children: [
                  {
                      height: 1,
                      children: [
                        { height: 0, isLeaf: true, index: "3" },
                        { height: 0, isLeaf: true, index: "4" }
                      ] 
                  },
                  { height: 0, isLeaf: true, index: "5" }
                ]
              }
            ]
        },
        { height: 0, isLeaf: true, index: "6" }
    ]
}

export default function Dendrogram({ data }: { data: DendrogramNode }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (containerRef.current && data) {
      containerRef.current.innerHTML = ""

      const svg = getDendrogram(data, {
        width: 500,
        height: 300,
        cutHeight: 2,
        hideLabels: false
      })

      containerRef.current.appendChild(svg)
    }
  }, [data])

  return <div ref={containerRef} />
}
