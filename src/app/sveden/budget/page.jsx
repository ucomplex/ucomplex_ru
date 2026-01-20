import { SimpleLayout } from '@/components/SimpleLayout'
import { SvedenNav } from '@/components/SvedenNav'
import { TextBlock } from '@/components/TextBlock'

export const metadata = {
  title: 'Финансово‑хозяйственная деятельность',
  description:
    'Сведения об источниках финансирования и финансово‑хозяйственной деятельности.',
}

export default function SvedenBudgetPage() {
  return (
    <SimpleLayout
      title="Финансово‑хозяйственная деятельность"
      intro="Раздел содержит сведения об источниках финансирования образовательной деятельности."
    >
      <div className="space-y-10">
        <SvedenNav className="max-w-3xl" />

        <div className="space-y-20">
          <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
            <TextBlock className="max-w-none md:max-w-3xl">
              <p>
                <strong>Источники финансирования:</strong>
              </p>
              <ul className="list-disc pl-5">
                <li>
                  <strong>средства от оказания платных образовательных услуг</strong>
                </li>
              </ul>
              <p>
                <strong>Госфинансирование:</strong> <strong>отсутствует</strong>.
              </p>
            </TextBlock>
          </div>
        </div>
      </div>
    </SimpleLayout>
  )
}

