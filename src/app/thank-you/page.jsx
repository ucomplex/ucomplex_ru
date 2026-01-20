import { SimpleLayout } from '@/components/SimpleLayout'

export const metadata = {
  title: 'Вы подписались',
  description: 'Спасибо за подписку на мою рассылку.',
}

export default function ThankYou() {
  return (
    <SimpleLayout
      title="Спасибо за подписку."
      intro="Я буду отправлять вам письмо каждый раз, когда опубликую новую статью в блоге, выпущу новый проект или у меня будет что-то интересное, чем можно поделиться, и что, как я думаю, вы хотели бы услышать. Вы можете отписаться в любое время, без обид."
    />
  )
}