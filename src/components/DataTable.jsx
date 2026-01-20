import clsx from 'clsx'

export function DataTable({
  columns,
  rows,
  rowKey,
  showHeader = true,
  className,
  tableClassName,
}) {
  return (
    <div className={clsx('flow-root overflow-hidden', className)}>
      <table className={clsx('w-full text-left', tableClassName)}>
        {showHeader && (
          <thead className="bg-white dark:bg-zinc-900">
            <tr>
              {columns.map((col, colIdx) => (
                <th
                  key={col.key}
                  scope="col"
                  className={clsx(
                    colIdx === 0 &&
                      'relative isolate py-3.5 pr-3 text-left text-sm font-semibold text-zinc-900 dark:text-zinc-100',
                    colIdx !== 0 &&
                      'px-3 py-3.5 text-left text-sm font-semibold text-zinc-900 dark:text-zinc-100',
                    col.className,
                  )}
                >
                  {col.label}
                  {colIdx === 0 && (
                    <>
                      <div className="absolute inset-y-0 right-0 -z-10 w-full border-b border-b-zinc-200 dark:border-b-zinc-700/40" />
                      <div className="absolute inset-y-0 left-0 -z-10 w-full border-b border-b-zinc-200 dark:border-b-zinc-700/40" />
                    </>
                  )}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {rows.map((row) => (
            <tr key={rowKey(row)}>
              {columns.map((col, colIdx) => (
                <td
                  key={col.key}
                  className={clsx(
                    colIdx === 0
                      ? 'relative py-4 pr-3 text-sm font-medium text-zinc-900 dark:text-zinc-100'
                      : 'px-3 py-4 text-sm text-zinc-600 dark:text-zinc-400',
                    col.className,
                  )}
                >
                  {col.render(row)}
                  {colIdx === 0 && (
                    <>
                      <div className="absolute right-0 bottom-0 h-px w-full bg-zinc-100 dark:bg-zinc-700/40" />
                      <div className="absolute bottom-0 left-0 h-px w-full bg-zinc-100 dark:bg-zinc-700/40" />
                    </>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

