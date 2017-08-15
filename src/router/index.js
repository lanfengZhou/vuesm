import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Index from '@/components/Index'
import Menu from '@/components/Menu'
import Multilights from '@/components/Multilights'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/menu',
      component: Menu,
      children :[{
      	path : '/home',
      	component : resolve =>require(['@/components/Home.vue',resolve])
      }]
    }
  ]
})
