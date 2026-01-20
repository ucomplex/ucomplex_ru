import { SimpleLayout } from '@/components/SimpleLayout'
import { SvedenNav } from '@/components/SvedenNav'
import { TextBlock } from '@/components/TextBlock'

export const metadata = {
  title: 'Международное сотрудничество',
  description:
    'Сведения о международном сотрудничестве в сфере образования.',
}

export default function SvedenInterPage() {
  return (
    <SimpleLayout
      title="Международное сотрудничество"
      intro="Раздел содержит сведения о международном сотрудничестве в сфере образования."
    >
      <div className="space-y-10">
        <SvedenNav className="max-w-3xl" />

        <div className="space-y-20">
          <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
            <TextBlock className="max-w-none md:max-w-3xl">
              <p>
                  Заключенные и планируемые к заключению договоры об оказании
                  платных образовательных услуг с иностранными/ международными
                  организациями по вопросам образования и науки отсутствуют.
              </p>
            </TextBlock>
          </div>
        </div>
      </div>
    </SimpleLayout>
  )
}

