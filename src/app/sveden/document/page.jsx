import { SimpleLayout } from '@/components/SimpleLayout'
import { SvedenNav } from '@/components/SvedenNav'
import { TextBlock } from '@/components/TextBlock'

export const metadata = {
  title: 'Документы',
  description:
    'Устав, лицензия, свидетельства и локальные нормативные акты организации.',
}

export default function SvedenDocumentPage() {
  return (
    <SimpleLayout
      title="Документы"
      intro="В разделе размещаются скан-копии (PDF) учредительных и локальных нормативных документов."
    >
      <div className="space-y-10">
        <SvedenNav className="max-w-3xl" />

        <div className="space-y-20">
          <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
            <TextBlock className="max-w-none md:max-w-3xl">
              <p>Документы размещаются в формате PDF:</p>
              <ul className="list-disc pl-5">
                <li>
                  <strong>Устав ООО «ЮКомплекс»</strong> —{' '}
                  <a
                    href="/ucdocs/ustav.pdf"
                    className="font-semibold text-teal-600 hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-300"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Скачать (PDF)
                  </a>
                </li>
                <li>
                  <strong>Лицензия на образовательную деятельность (c приложением к лицензии)</strong> —{' '}
                  <a
                    href="/ucdocs/license.pdf"
                    className="font-semibold text-teal-600 hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-300"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Скачать (PDF)
                  </a>
                </li>
                
                
                <li>
                  <strong>Свидетельство ОГРН</strong> —{' '}
                  <a
                    href="/ucdocs/ogrn.pdf"
                    className="font-semibold text-teal-600 hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-300"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Скачать (PDF)
                  </a>
                </li>
                <li>
                  <strong>Свидетельство ИНН</strong> —{' '}
                  <a
                    href="/ucdocs/inn.pdf"
                    className="font-semibold text-teal-600 hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-300"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Скачать (PDF)
                  </a>
                </li>
              </ul>
            </TextBlock>
          </div>
        </div>
      </div>
    </SimpleLayout>
  )
}

