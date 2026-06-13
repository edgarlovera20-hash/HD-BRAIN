interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (row: T) => React.ReactNode;
  width?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  emptyMessage = "No hay datos disponibles.",
}: DataTableProps<T>) {
  return (
    <div className="bg-[#161F33] border border-white/[0.08] rounded-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.25)] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.08]">
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className="px-4 py-3.5 text-left text-xs font-semibold text-[#94A3B8] uppercase tracking-wider whitespace-nowrap"
                  style={{ width: col.width }}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-10 text-center text-[#94A3B8] text-sm"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, i) => (
                <tr
                  key={i}
                  className="hover:bg-white/[0.02] transition-colors duration-100"
                >
                  {columns.map((col) => (
                    <td key={String(col.key)} className="px-4 py-3.5 text-[#E2E8F0] whitespace-nowrap">
                      {col.render
                        ? col.render(row)
                        : String(row[col.key as keyof T] ?? "")}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
