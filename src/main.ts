import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import App from './App.vue'
import '~/composables/settings'

import './styles/main.css'
import 'uno.css'

const app = createApp(App)
const router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition)
      return savedPosition
    return { top: 0 }
  },
})
app.use(router)
app.mount('#app')
