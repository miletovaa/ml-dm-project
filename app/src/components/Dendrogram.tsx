import { useEffect, useRef } from "react"
import { getDendrogram } from "../utils/dendrogram"
import { DendrogramNode } from "../types/dendrogram"

export default function Dendrogram({ data, cutHeight }: { data: DendrogramNode, cutHeight?: number }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (containerRef.current && data) {
      containerRef.current.innerHTML = ""

      const svg = getDendrogram(data, {
        width: 500,
        height: 300,
        hideLabels: false,
        cutHeight,
      })

      containerRef.current.appendChild(svg)
    }
  }, [data, cutHeight])

  return <div ref={containerRef} />
}
