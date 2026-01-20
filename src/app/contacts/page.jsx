import { SimpleLayout } from '@/components/SimpleLayout'
import { TextBlock } from '@/components/TextBlock'

export const metadata = {
  title: 'Контакты',
  description: 'Контактная информация ООО «ЮКомплекс».',
}

export default function ContactsPage() {
  return (
    <SimpleLayout
      title="Контакты"
      intro="Если вы хотите обсудить проект, документы или обучение — напишите нам, и мы ответим."
    >
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <TextBlock className="max-w-none md:max-w-3xl">
          <p>
            <strong>Организация:</strong> <strong>ООО «ЮКомплекс»</strong>
          </p>
          <p>
            <strong>Телефон:</strong>{' '}
            <strong>
              <a href="tel:+79659588860">+7(965)9588860</a>
            </strong>
          </p>
          <p>
            <strong>E-mail:</strong>{' '}
            <strong>
              <a href="mailto:mail@ucomplex.org">mail@ucomplex.org</a>
            </strong>
          </p>
          <p>
            <strong>Адрес:</strong> 364014, г. Грозный, ул. Тверская, д. 48, кв.
            39
          </p>
        </TextBlock>
      </div>
    </SimpleLayout>
  )
}

