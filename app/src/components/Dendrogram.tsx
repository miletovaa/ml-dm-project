import { useEffect, useRef } from "react"
import { getDendrogram } from "../utils/dendrogram"
import { DendrogramNode } from "../types/dendrogram"

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
