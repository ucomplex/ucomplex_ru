import { SimpleLayout } from '@/components/SimpleLayout'
import { SvedenNav } from '@/components/SvedenNav'
import { TextBlock } from '@/components/TextBlock'

export const metadata = {
  title: 'Педагогический состав',
  description:
    'Сведения о педагогических работниках (при наличии) или информация об отсутствии деятельности.',
}

export default function SvedenEmployeesPage() {
  return (
    <SimpleLayout
      title="Педагогический состав"
      intro="Раздел содержит сведения о преподавателях и педагогических работниках."
    >
      <div className="space-y-10">
        <SvedenNav className="max-w-3xl" />

        <div className="space-y-20">
          <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
            <TextBlock className="max-w-none md:max-w-3xl">
              <p>
                В отчётный период преподавательская деятельность в ООО
                <strong>«ЮКомплекс»</strong> <strong>не осуществлялась</strong>. Образовательные программы{' '}
                <strong>не реализовывались</strong>, учебные группы <strong>не формировались</strong>, штат
                педагогических работников <strong>не привлекался</strong>.
              </p>
              <p>
                В связи с отсутствием образовательной деятельности в 2025 году,
                преподавательский и учебно-вспомогательный персонал в штатном и
                внештатном составе в отчётный период <strong>не числился</strong>, сведения о
                педагогических кадрах <strong>отсутствуют</strong>.
              </p>
            </TextBlock>
          </div>
        </div>
      </div>
    </SimpleLayout>
  )
}

