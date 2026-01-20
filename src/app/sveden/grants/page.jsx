import { SimpleLayout } from '@/components/SimpleLayout'
import { SvedenNav } from '@/components/SvedenNav'
import { TextBlock } from '@/components/TextBlock'

export const metadata = {
  title: 'Стипендии и иные виды поддержки',
  description:
    'Сведения о наличии (или отсутствии) стипендий и иных мер материальной поддержки.',
}

export default function SvedenGrantsPage() {
  return (
    <SimpleLayout
      title="Стипендии и иные виды поддержки"
      intro="Раздел содержит сведения о стипендиях и иных видах материальной поддержки обучающихся."
    >
      <div className="space-y-10">
        <SvedenNav className="max-w-3xl" />

        <div className="space-y-20">
          <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
            <TextBlock className="max-w-none md:max-w-3xl">
              <p>
                В <strong>ООО «ЮКомплекс»</strong> <strong>стипендии и иные виды материальной поддержки</strong>{' '}
                обучающихся <strong>не предусмотрены</strong>. Образовательная деятельность
                осуществляется на <strong>платной основе</strong> в рамках реализации программ
                дополнительного профессионального образования и дополнительного
                образования взрослых, финансирование за счёт <strong>бюджетных ассигнований не осуществляется</strong>.
              </p>

              <p>
                Организация не предоставляет обучающимся меры социальной
                поддержки, в том числе:
              </p>
              <ul className="list-disc pl-5">
                <li>академические и социальные стипендии;</li>
                <li>материальную помощь;</li>
                <li>компенсацию расходов на проезд, питание или проживание.</li>
              </ul>

              <p>
                <strong>ООО «ЮКомплекс»</strong> <strong>не располагает общежитием, интернатом</strong> или иными
                жилыми помещениями, предназначенными для проживания обучающихся,
                и <strong>не осуществляет заселение</strong> обучающихся в жилые помещения.
              </p>

              <p>
                Обучение проводится с применением <strong>дистанционных образовательных</strong>
                технологий, необходимость в обеспечении обучающихся местами
                проживания <strong>отсутствует</strong>.
              </p>
            </TextBlock>
          </div>
        </div>
      </div>
    </SimpleLayout>
  )
}

