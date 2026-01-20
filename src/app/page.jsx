import Image from 'next/image'
import clsx from 'clsx'

import { Button } from '@/components/Button'
import { Card } from '@/components/Card'
import { Container } from '@/components/Container'
import { TextBlock } from '@/components/TextBlock'
import image1 from '@/images/photos/image-8.jpg'
import image2 from '@/images/photos/image-2.jpg'
import image3 from '@/images/photos/image-3.jpg'
import image4 from '@/images/photos/image-7.jpg'
import image6 from '@/images/photos/image-6.jpg'

function Photos() {
  let rotations = ['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2']

  return (
    <div className="mt-16 sm:mt-20">
      <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
        {[image1, image2, image3, image4, image6].map((image, imageIndex) => (
          <div
            key={image.src}
            className={clsx(
              'relative aspect-9/10 w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 sm:w-72 sm:rounded-2xl dark:bg-zinc-800',
              rotations[imageIndex % rotations.length],
            )}
          >
            <Image
              src={image}
              alt=""
              sizes="(min-width: 640px) 18rem, 11rem"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

const services = [
  {
    title: 'Разработка веб‑сайтов и цифровых платформ',
    description:
      'Создаём надёжные ресурсы — от визиток до сложных информационных систем.',
  },
  {
    title: 'IT‑аутсорсинг и техническая поддержка',
    description: 'Обслуживаем и сопровождаем инфраструктуру организаций под ключ.',
  },
  {
    title: 'Системная интеграция',
    description:
      'Подбираем, поставляем и внедряем оборудование и ПО, адаптированное под задачи клиента.',
  },
  {
    title: 'Электронные библиотечные и справочные системы',
    description: 'Внедряем современные решения для цифровой среды учреждений.',
  },
]

export default function Home() {
  return (
    <>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
         ООО «ЮКомплекс» <br />
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            Поставщик решений и сервисов в области цифровой трансформации и
            информационной безопасности
          </p>
        </div>
      </Container>

      <Photos />

      <Container className="mt-16 sm:mt-20">
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <TextBlock className="max-w-2xl text-left">
            <p>
              <strong>Мы — команда специалистов</strong>, объединённых опытом,
              гибкостью и технологическим подходом. Мы создаём и внедряем решения в сфере
              информационных технологий, цифровизации и системной интеграции.
            </p>
            <p>
              С <strong>2013 года</strong> мы реализуем проекты для государственных, образовательных и
              коммерческих организаций, обеспечивая техническое сопровождение, проектирование и
              цифровую трансформацию.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button href="/contacts" variant="primary">
                Связаться
              </Button>
            </div>
          </TextBlock>
        </div>
      </Container>

      <Container className="mt-16 sm:mt-20">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
            Что мы делаем
          </h2>
        </div>

        <ul
          role="list"
          className="mt-10 grid grid-cols-1 gap-x-12 gap-y-12 sm:grid-cols-2"
        >
          {services.map((item) => (
            <Card as="li" key={item.title}>
              <Card.Title as="h3">{item.title}</Card.Title>
              <Card.Description>{item.description}</Card.Description>
            </Card>
          ))}
        </ul>
      </Container>

    </>
  )
}

