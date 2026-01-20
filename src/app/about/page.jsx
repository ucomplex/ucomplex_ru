import Image from 'next/image'

import { Container } from '@/components/Container'
import { TextBlock } from '@/components/TextBlock'
import image6 from '@/images/photos/image-6.jpg'

export const metadata = {
  title: 'О компании',
  description:
    'ООО «ЮКомплекс» — современная многофункциональная компания в сфере информационных технологий и цифровых решений.',
}

export default function About() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              src={image6}
              alt=""
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            О компании
          </h1>
          <TextBlock className="mt-6 text-left">
            <p>
              <strong>Общество с ограниченной ответственностью «ЮКомплекс»</strong> — современная
              многофункциональная компания, работающая в сфере информационных
              технологий, цифровых решений и технологического сопровождения
              проектов различного масштаба.
            </p>
            <p>
              Компания зарегистрирована в <strong>2013 году</strong> и с момента своего основания
              зарекомендовала себя как <strong>надёжный партнёр</strong> в реализации проектов,
              связанных с проектированием, развитием и обслуживанием 
              <strong> IT-инфраструктуры</strong>, разработкой программных продуктов и
              сопровождением внедрения цифровых решений.
            </p>
            <p>
              <strong>ООО «ЮКомплекс»</strong> специализируется на:
            </p>
            <ul className="list-disc pl-5">
              <li>разработке и поддержке веб-сайтов и цифровых платформ;</li>
              <li>внедрении электронных библиотечных и информационных систем;</li>
              <li>системной интеграции;</li>
              <li>
                сопровождении технических решений в организациях различного
                профиля;
              </li>
              <li>поставке оборудования и программного обеспечения;</li>
              <li>консалтинге в сфере цифровизации и автоматизации процессов.</li>
            </ul>
            <p>
              Работа компании ориентирована на современные требования рынка и
              нужды заказчиков. Команда специалистов «ЮКомплекс» обладает опытом
              участия в государственных и коммерческих проектах, в том числе в
              рамках конкурсных процедур и контрактных обязательств.
            </p>
            <p>
              Мы стремимся обеспечить клиентам надёжную техническую поддержку,
              адаптацию под специфические задачи, соблюдение сроков и высокое
              <strong>качество всех этапов</strong> реализации проектов.
            </p>
            <p>
              <strong>Наши принципы работы:</strong>
            </p>
            <ul className="list-disc pl-5">
              <li>
                <strong>профессиональный подход</strong>,
              </li>
              <li>
                <strong>прозрачность и ответственность</strong>,
              </li>
              <li>
                <strong>гибкость решений</strong> под задачи заказчика,
              </li>
              <li>
                <strong>внимание к деталям</strong> и <strong>долгосрочное сотрудничество</strong>.
              </li>
            </ul>
            <p>
              <strong>ООО «ЮКомплекс»</strong> — это команда, объединённая стремлением внедрять
              современные технологии, упрощать процессы и создавать эффективные
              решения.
            </p>
          </TextBlock>
        </div>
      </div>
    </Container>
  )
}