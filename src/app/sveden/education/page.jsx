import { SimpleLayout } from '@/components/SimpleLayout'
import { SvedenNav } from '@/components/SvedenNav'
import { TextBlock } from '@/components/TextBlock'
import { DataTable } from '@/components/DataTable'

export const metadata = {
  title: 'Образование',
  description:
    'Сведения о реализуемых программах, формах обучения, сроках, языке и учебных материалах.',
}

const programs = [
  {
    id: 1,
    name: 'Основы цифровой трансформации в сфере образования',
    hours: '72 часа',
  },
  {
    id: 2,
    name: 'Цифровые инструменты преподавателя и правовая грамотность',
    hours: '72 часа',
  },
]

export default function SvedenEducationPage() {
  return (
    <SimpleLayout
      title="Образование"
      intro="Раздел содержит информацию о реализуемых образовательных программах и ключевых параметрах обучения."
    >
      <div className="space-y-10">
        <SvedenNav className="max-w-3xl" />

        <div className="space-y-20">
          <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
            <TextBlock className="max-w-none md:max-w-3xl">
              <p>
                Дополнительное профессиональное образование осуществляется в
                Образовательном центре <strong>ООО «ЮКомплекс»</strong> путём реализации
                дополнительных профессиональных программ повышения квалификации
                в соответствии с <strong>действующим законодательством Российской Федерации</strong>.
              </p>

              <p>
                Обучение проводится на <strong>русском языке</strong> в <strong>очной</strong>,{' '}
                <strong>очно-заочной</strong> и <strong>заочной</strong> формах. В рамках реализации
                программ могут применяться <strong>электронное обучение</strong> и{' '}
                <strong>дистанционные образовательные технологии</strong>, включая обучение на
                платформе <strong>Deshar (LMS)</strong>, что обеспечивает гибкий формат
                взаимодействия с обучающимися.
              </p>

              <p>
                Нормативный срок освоения каждой программы определяется
                утверждённым учебным планом и составляет <strong>от 16 до 72 академических часов</strong>, в зависимости от содержания и целей программы.
              </p>

              <p>
                <strong>ООО «ЮКомплекс»</strong> не осуществляет образовательную деятельность по
                адаптированным основным общеобразовательным программам для
                инвалидов и лиц с ограниченными возможностями здоровья. Вместе с
                тем, при реализации программ ДПО с применением <strong>дистанционных</strong>
                технологий создаются условия для доступа к обучению обучающихся
                с <strong>ОВЗ</strong>, включая адаптацию среды в рамках возможностей платформы.
              </p>

              <p>
                <strong>Лицензия на осуществление образовательной деятельности</strong>
              </p>
              <ul className="list-disc pl-5">
                <li>
                  <strong>Серия 20Л02 № 0001555</strong>, регистрационный номер: <strong>3174</strong>
                </li>
                <li>
                  Дата выдачи: <strong>27 сентября 2019 года</strong>
                </li>
                <li>
                  Лицензирующий орган: <strong>Министерство образования и науки Чеченской Республики</strong>
                </li>
                <li>
                  Срок действия: <strong>бессрочно</strong>
                </li>
              </ul>

              <p>
                <strong>Перечень программ повышения квалификации, утверждённых к запуску</strong>
              </p>
              <div className="mt-4">
                <DataTable
                  columns={[
                    { key: 'id', label: '№', render: (r) => r.id },
                    { key: 'name', label: 'Наименование программы', render: (r) => r.name },
                    { key: 'hours', label: 'Нормативный срок', render: (r) => <strong>{r.hours}</strong> },
                  ]}
                  rows={programs}
                  rowKey={(r) => r.id}
                />
              </div>

              <p>
                В 2025 году образовательная деятельность по дополнительным
                профессиональным программам в <strong>ООО «ЮКомплекс»</strong> <strong>не осуществлялась</strong>.
              </p>
            </TextBlock>
          </div>
        </div>
      </div>
    </SimpleLayout>
  )
}

