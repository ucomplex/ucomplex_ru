import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'

import '@/styles/tailwind.css'

export const metadata = {
  title: {
    template: '%s — ЮКомплекс',
    default: 'ЮКомплекс',
  },
  description:
    'Поставщик решений и сервисов в области цифровой трансформации и информационной безопасности',
  icons: {
    icon: [{ url: '/uc.png', type: 'image/png' }],
    shortcut: ['/uc.png'],
    apple: [{ url: '/uc.png', type: 'image/png' }],
  },
  alternates: {
    types: {
      'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex h-full bg-zinc-50 dark:bg-black">
        <Providers>
          <div className="flex w-full">
            <Layout>{children}</Layout>
          </div>
        </Providers>
      </body>
    </html>
  )
}