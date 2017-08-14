import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Multilights from '@/components/Multilights'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/home',
      component: Multilights
    }
  ]
})
