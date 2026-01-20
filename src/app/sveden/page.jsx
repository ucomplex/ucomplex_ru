import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { SvedenNav } from '@/components/SvedenNav'
import { SVEDEN_SECTIONS } from '@/lib/sveden'

export const metadata = {
  title: 'Сведения об образовательной организации',
  description:
    'Раздел, сформированный в соответствии с федеральными требованиями к официальным сайтам образовательных организаций.',
}

export default function SvedenIndex() {
  return (
    <SimpleLayout
      title="Сведения об образовательной организации"
      intro="Структура раздела приведена в соответствии с приказом Минобрнауки РФ № 785 и требованиями к оформлению официальных сайтов образовательных организаций."
    >
      <div className="space-y-10">
        <SvedenNav className="max-w-3xl" />
        <ul
          role="list"
          className="grid grid-cols-1 gap-x-12 gap-y-12 sm:grid-cols-2"
        >
          {SVEDEN_SECTIONS.map((item) => (
            <Card as="li" key={item.key}>
              <Card.Eyebrow decorate>
                <span className="font-mono">{item.href}/</span>
              </Card.Eyebrow>
              <Card.Title as="h2" href={item.href}>
                {item.title}
              </Card.Title>
              <Card.Description>{item.description}</Card.Description>
              <Card.Cta>Открыть</Card.Cta>
            </Card>
          ))}
        </ul>
      </div>
    </SimpleLayout>
  )
}

