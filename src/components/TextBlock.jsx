import clsx from 'clsx'

export function TextBlock({ className, ...props }) {
  return (
    <div
      className={clsx(
        'space-y-7 text-justify text-base text-zinc-600 dark:text-zinc-400',
        className,
      )}
      {...props}
    />
  )
}

