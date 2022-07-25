import { createApp } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import vClickOutsideUmd from 'click-outside-vue3'

import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(router)
app.use(vClickOutsideUmd)

library.add(faMagnifyingGlass)
library.add(faEllipsisVertical)
library.add(faXmark)

app.component('FontAwesomeIcon', FontAwesomeIcon)

app.mount('#app')
