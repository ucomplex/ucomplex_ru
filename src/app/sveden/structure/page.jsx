import { SimpleLayout } from '@/components/SimpleLayout'
import { SvedenNav } from '@/components/SvedenNav'
import { TextBlock } from '@/components/TextBlock'
import { DataTable } from '@/components/DataTable'

export const metadata = {
  title: 'Структура и органы управления',
  description:
    'Сведения о структуре организации, руководстве и органах управления.',
}

const structureRows = [
  {
    id: 'director',
    unit: 'Директор',
    name: 'Идигов Адам Исаевич',
    role: 'Общее руководство организацией',
  },
  {
    id: 'education-unit',
    unit: 'Образовательное подразделение',
    name: '—',
    role: 'Будет сформировано перед началом обучения',
  },
]

export default function SvedenStructurePage() {
  return (
    <SimpleLayout
      title="Структура и органы управления"
      intro="Раздел содержит информацию о структуре организации и порядке управления."
    >
      <div className="space-y-10">
        <SvedenNav className="max-w-3xl" />

        <div className="space-y-20">
          <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
            <TextBlock className="max-w-none md:max-w-3xl">
              <p>
                <strong>Руководитель:</strong> <strong>Идигов Адам Исаевич</strong>{' '}
                (директор)
              </p>
              <p>
                <strong>Форма управления:</strong>{' '}
                <strong>единоличный исполнительный орган</strong>
              </p>
              <p>
                <strong>Органы коллегиального управления:</strong>{' '}
                <strong>отсутствуют</strong>
              </p>
              <p>
                <strong>Филиалы и представительства:</strong>{' '}
                <strong>отсутствуют</strong>
              </p>

              <p>
                <strong>Структура (схема)</strong>
              </p>
              <div className="mt-4">
                <DataTable
                  columns={[
                    {
                      key: 'unit',
                      label: 'Подразделение / должность',
                      render: (r) => <strong>{r.unit}</strong>,
                    },
                    { key: 'name', label: 'ФИО', render: (r) => r.name },
                    { key: 'role', label: 'Функции', render: (r) => r.role },
                  ]}
                  rows={structureRows}
                  rowKey={(r) => r.id}
                />
              </div>
            </TextBlock>
          </div>
        </div>
      </div>
    </SimpleLayout>
  )
}

