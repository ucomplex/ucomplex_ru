import { SimpleLayout } from '@/components/SimpleLayout'
import { SvedenNav } from '@/components/SvedenNav'
import { TextBlock } from '@/components/TextBlock'

export const metadata = {
  title: 'Платные образовательные услуги',
  description:
    'Сведения об оказании платных образовательных услуг и публикации перечня программ и стоимости.',
}

export default function SvedenPaidEduPage() {
  return (
    <SimpleLayout
      title="Платные образовательные услуги"
      intro="Раздел содержит информацию об оказании платных образовательных услуг."
    >
      <div className="space-y-10">
        <SvedenNav className="max-w-3xl" />

        <div className="space-y-20">
          <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
            <TextBlock className="max-w-none md:max-w-3xl">
              <p>
               В 2025 году образовательная деятельность по дополнительным профессиональным программам в <strong>ООО «ЮКомплекс»</strong> не осуществлялась.
              </p>
            </TextBlock>
          </div>
        </div>
      </div>
    </SimpleLayout>
  )
}

