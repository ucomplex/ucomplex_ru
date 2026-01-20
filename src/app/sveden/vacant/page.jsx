import { SimpleLayout } from '@/components/SimpleLayout'
import { SvedenNav } from '@/components/SvedenNav'
import { TextBlock } from '@/components/TextBlock'

export const metadata = {
  title: 'Вакантные места для приёма',
  description:
    'Сведения о наличии вакантных мест для приёма (зачисления) по реализуемым программам.',
}

export default function SvedenVacantPage() {
  return (
    <SimpleLayout
      title="Вакантные места для приёма"
      intro="Раздел содержит сведения о наборе слушателей и наличии вакантных мест по программам."
    >
      <div className="space-y-10">
        <SvedenNav className="max-w-3xl" />

        <div className="space-y-20">
          <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
            <TextBlock className="max-w-none md:max-w-3xl">
              <p>
                Формирование учебных групп в <strong>ООО «ЮКомплекс»</strong> осуществляется на
                основании поступающих заявок от физических и юридических лиц.
                Набор слушателей производится по мере комплектования групп в
                рамках реализуемых программ дополнительного образования.
              </p>
              <p>
                Информация о наличии вакантных мест для приёма (зачисления)
                является актуальной на момент обращения и может меняться.
                Актуальные сведения о количестве свободных мест, сроках начала
                обучения и составе групп рекомендуем уточнять по электронной
                почте:{' '}
                <strong>
                  <a href="mailto:mail@ucomplex.org">mail@ucomplex.org</a>
                </strong>
              </p>
            </TextBlock>
          </div>
        </div>
      </div>
    </SimpleLayout>
  )
}

