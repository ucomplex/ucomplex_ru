import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'

function SpeakingSection({ children, ...props }) {
  return (
    <Section {...props}>
      <div className="space-y-16">{children}</div>
    </Section>
  )
}

function Appearance({ title, description, event, cta, href }) {
  return (
    <Card as="article">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Eyebrow decorate>{event}</Card.Eyebrow>
      <Card.Description>{description}</Card.Description>
      <Card.Cta>{cta}</Card.Cta>
    </Card>
  )
}

export const metadata = {
  title: 'Выступления',
  description:
    'Я выступал на мероприятиях по всему миру и давал интервью для многих подкастов.',
}

export default function Speaking() {
  return (
    <SimpleLayout
      title="Я выступал на мероприятиях по всему миру и давал интервью для многих подкастов."
      intro="Один из моих любимых способов делиться идеями — это живые выступления на сцене, где гораздо больше возможностей для общения, чем в письменной форме, и я люблю интервью для подкастов, потому что они дают мне возможность отвечать на вопросы, а не просто излагать свои мнения."
    >
      <div className="space-y-20">
        <SpeakingSection title="Конференции">
          <Appearance
            href="#"
            title="В космосе никто не может смотреть ваш стрим — до сих пор"
            description="Технический глубокий анализ HelioStream, библиотеки потокового вещания в реальном времени, которую я написал для передачи живого видео обратно на Землю."
            event="SysConf 2021"
            cta="Смотреть видео"
          />
          <Appearance
            href="#"
            title="Уроки, извлеченные из нашего первого отзыва продукта"
            description="Говорят, что если вы не стесняетесь своей первой версии, значит, вы делаете что-то не так. Но когда вы продаете наборы космических шаттлов для самостоятельной сборки, оказывается, все немного сложнее."
            event="Business of Startups 2020"
            cta="Смотреть видео"
          />
        </SpeakingSection>
        <SpeakingSection title="Подкасты">
          <Appearance
            href="#"
            title="Использование дизайна как конкурентного преимущества"
            description="Как мы использовали визуальный дизайн мирового класса, чтобы привлечь отличную команду, завоевать клиентов и получить больше прессы для Planetaria."
            event="Encoding Design, июль 2022"
            cta="Слушать подкаст"
          />
          <Appearance
            href="#"
            title="Создание аэрокосмической компании с нуля до $17M ARR"
            description="История о том, как мы построили один из самых перспективных космических стартапов в мире, не привлекая капитал от инвесторов."
            event="The Escape Velocity Show, март 2022"
            cta="Слушать подкаст"
          />
          <Appearance
            href="#"
            title="Программирование операционной системы вашей компании"
            description="О важности создания систем и процессов для ведения бизнеса, чтобы каждый в команде знал, как принять правильное решение в любой ситуации."
            event="How They Work Radio, сентябрь 2021"
            cta="Слушать подкаст"
          />
        </SpeakingSection>
      </div>
    </SimpleLayout>
  )
}