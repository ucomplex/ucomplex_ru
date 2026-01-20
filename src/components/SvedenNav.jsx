import Link from 'next/link'
import clsx from 'clsx'

import { SVEDEN_SECTIONS } from '@/lib/sveden'

export function SvedenNav({ className }) {
  return (
    <nav
      aria-label="Раздел «Сведения об образовательной организации»"
      className={clsx(className)}
    >
      <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
        <li>
          <Link
            href="/sveden"
            className="font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-400"
          >
            Все разделы
          </Link>
        </li>
        {SVEDEN_SECTIONS.map((item) => (
          <li key={item.key}>
            <Link
              href={item.href}
              className="text-zinc-600 transition hover:text-teal-500 dark:text-zinc-400 dark:hover:text-teal-400"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

