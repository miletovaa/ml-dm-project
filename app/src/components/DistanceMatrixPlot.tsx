export default function DistanceMatrix({ matrix }: { matrix: number[][] }) {
    return (
        <table className="border-collapse border border-blue-400">
            <tbody>
                <tr>
                    <td className="border border-blue-400 text-center bg-blue-200"></td>
                    {matrix.map((_, j) => (
                        <td key={j} className="border border-blue-400 text-center bg-blue-200">
                            e{j + 1}
                        </td>
                    ))}
                </tr>
                {matrix.map((row, i) => (
                    <tr key={i}>
                        <td className="border border-blue-400 text-center bg-blue-200">e{i + 1}</td>

                        {row.map((col, j) => (
                            <td key={j} className="border border-blue-400 text-center">{col}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}