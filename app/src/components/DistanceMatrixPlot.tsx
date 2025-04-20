import { DistanceMatrix as MatrixType } from "../types";

export default function DistanceMatrix({ matrix }: { matrix: MatrixType }) {
    return (
        <table className="table-fixed w-full border border-blue-400">
            <tbody>
                <tr key={0}>
                    <td className="border border-blue-400 text-center bg-blue-200"></td>
                    {matrix.map(({ id }, i) => (
                        <td key={i} className="border border-blue-400 text-center bg-blue-200">
                            {id}
                        </td>
                    ))}
                </tr>
                {matrix.map((row, i) => (
                    <tr key={i + 1}>
                        <td className="border border-blue-400 text-center bg-blue-200">{row.id}</td>

                        {row.distances.map(({ distance }, j) => (
                            <td key={j} className="border border-blue-400 text-center">{distance}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
