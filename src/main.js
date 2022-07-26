import { createApp } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import vClickOutsideUmd from 'click-outside-vue3'
import Notifications from '@kyvg/vue3-notification'
import { createI18n } from 'vue-i18n'

import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(router)
app.use(vClickOutsideUmd)
app.use(Notifications)

const messages = {
  en: {
    login: 'Login',
    dontHaveAnAccount: `Don't have an account`,
    signup: 'Sign up',
    email: 'Email',
    password: 'Password',
    firstName: 'First name',
    lastName: 'Last name',
    alreadyHaveAnAccount: 'Already have an account',
  },
  uk: {
    login: 'Увійти',
    dontHaveAnAccount: `Не маєте акаунта`,
    signup: 'Зареєструватись',
    email: 'Email',
    password: 'Пароль',
    firstName: `Ім'я`,
    lastName: 'Прізвище',
    alreadyHaveAnAccount: 'Вже маєте акаунт',
  }
}




const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages,
})

app.use(i18n)

library.add(faMagnifyingGlass)
library.add(faEllipsisVertical)
library.add(faXmark)

app.component('FontAwesomeIcon', FontAwesomeIcon)

app.mount('#app')
