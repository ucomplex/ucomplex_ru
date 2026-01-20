import { SimpleLayout } from '@/components/SimpleLayout'
import { SvedenNav } from '@/components/SvedenNav'
import { DataTable } from '@/components/DataTable'

export const metadata = {
  title: 'Основные сведения',
  description:
    'Полное и сокращённое наименование, адреса, контакты и сведения о лицензии.',
}

const commonRows = [
  {
    key: 'full_name',
    label: 'Полное наименование',
    value: 'Общество с ограниченной ответственностью «ЮКомплекс»',
  },
  { key: 'short_name', label: 'Сокращённое наименование', value: 'ООО «ЮКомплекс»' },
  { key: 'created_at', label: 'Дата создания', value: '30.04.2013' },
  {
    key: 'legal_address',
    label: 'Юридический адрес',
    value: '364014, г. Грозный, ул. Тверская, д. 48, кв. 39',
  },
  { key: 'founder', label: 'Учредитель', value: 'Идигов Адам Исаевич' },
  { key: 'phone', label: 'Телефон', value: 'tel:+79659588860' },
  { key: 'email', label: 'E-mail', value: 'mailto:mail@ucomplex.org' },
]

export default function SvedenCommonPage() {
  return (
    <SimpleLayout
      title="Основные сведения"
      intro="Раздел содержит базовую информацию об организации и реквизиты, предусмотренные федеральными требованиями к официальным сайтам образовательных организаций."
    >
      <div className="space-y-10">
        <SvedenNav className="max-w-3xl" />

        <div className="space-y-20">
          <div className="max-w-3xl">
            <DataTable
              showHeader={false}
              columns={[
                {
                  key: 'label',
                  label: 'Параметр',
                  render: (r) => r.label,
                },
                {
                  key: 'value',
                  label: 'Значение',
                  render: (r) => {
                    if (r.key === 'phone') {
                      return (
                        <a
                          href={r.value}
                          className="font-semibold text-teal-600 hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-300"
                        >
                          +7 (965) 958‑88‑60
                        </a>
                      )
                    }

                    if (r.key === 'email') {
                      return (
                        <a
                          href={r.value}
                          className="font-semibold text-teal-600 hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-300"
                        >
                          mail@ucomplex.org
                        </a>
                      )
                    }

                    return <strong>{r.value}</strong>
                  },
                },
              ]}
              rows={commonRows}
              rowKey={(r) => r.key}
            />
          </div>
        </div>
      </div>
    </SimpleLayout>
  )
}

