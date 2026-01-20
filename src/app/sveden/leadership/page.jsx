import { SimpleLayout } from '@/components/SimpleLayout'
import { SvedenNav } from '@/components/SvedenNav'
import { TextBlock } from '@/components/TextBlock'

export const metadata = {
  title: 'Руководство',
  description:
    'Сведения о руководителе организации: должность, образование, опыт и контакты.',
}

export default function SvedenLeadershipPage() {
  return (
    <SimpleLayout
      title="Руководство"
      intro="Раздел содержит информацию о руководителе организации и контактные данные."
    >
      <div className="space-y-10">
        <SvedenNav className="max-w-3xl" />

        <div className="space-y-20">
          <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
            <TextBlock className="max-w-none md:max-w-3xl">
              <p>
                <strong>Идигов Адам Исаевич</strong>
                <br />
                <strong>Директор</strong>
                <br />
                Образование: <strong>высшее</strong>
                <br />
                Опыт руководства: <strong>более 10 лет</strong>
                <br />
                Тел.:{' '}
                <strong>
                  <a href="tel:+79635988860">+7 (963) 598‑88‑60</a>
                </strong>
                , Email:{' '}
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

