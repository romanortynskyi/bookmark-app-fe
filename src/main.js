import { createApp } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import vClickOutsideUmd from 'click-outside-vue3'
import Notifications from '@kyvg/vue3-notification'
import { createI18n } from 'vue-i18n'
import { createStore } from 'vuex'

import {
  faMagnifyingGlass,
  faEllipsisVertical,
  faXmark,
  faSun,
  faMoon,
} from '@fortawesome/free-solid-svg-icons'

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

    addNewBookmark: 'Add new bookmark',
    signOut: 'Sign out',
    close: 'Close',
    title: 'Title',
    link: 'Link',
    searchBookmarks: 'Search bookmarks',

    edit: 'Edit',
    delete: 'Delete',
    copyLink: 'Copy link',
    openInNewTab: 'Open in new tab',
    openInNewWindow: 'Open in new window',
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

    addNewBookmark: 'Додати закладку',
    signOut: 'Вийти',
    close: 'Закрити',
    title: 'Назва',
    link: 'Посилання',
    searchBookmarks: 'Шукати закладки',

    edit: 'Редагувати',
    delete: 'Видалити',
    copyLink: 'Копіювати посилання',
    openInNewTab: 'Відкрити в новій вкладці',
    openInNewWindow: 'Відкрити в новому вікні',
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
library.add(faSun)
library.add(faMoon)

app.component('FontAwesomeIcon', FontAwesomeIcon)

const store = createStore({
  state() {
    return {
      isDarkMode: false,
    }
  },
  mutations: {
    toggleDarkMode(state) {
      state.isDarkMode = !state.isDarkMode
    },
  },
})

app.use(store)


app.mount('#app')
