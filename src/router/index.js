import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Index from '@/components/Index'
import Menu from '@/components/Menu'

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
      	component : resolve => require(['@/components/Home.vue'],resolve)
      },
      {
      	path : '/device',
      	component : resolve => require(['@/components/Device.vue'],resolve),
      	children :[{
      		path:'/ledctrl',
      		component : resolve => require(['@/components/devices/Lights.vue'],resolve) 
      	},
        // {
        //   path:'/mledctrl',
        //   component : resolve => require(['@/components/devices/Multilights.vue'],resolve) 
        // },
      	{
      		path:'/curctrl',
      		component : resolve => require(['@/components/devices/Curtain.vue'],resolve) 
      	},
      	{
      		path:'/videoctrl',
      		component : resolve => require(['@/components/devices/Video.vue'],resolve) 
      	},
      	{
      		path:'/envctrl',
      		component : resolve => require(['@/components/devices/Env.vue'],resolve) 
      	}
      	]
      },
      {
      	path : '/device',
      	component : resolve => require(['@/components/Device.vue'],resolve)
      },
      {
      	path : '/env',
      	component : resolve => require(['@/components/Env.vue'],resolve)
      },
      {
      	path : '/protect',
      	component : resolve => require(['@/components/Protect.vue'],resolve)
      },
      {
      	path : '/power',
      	component : resolve => require(['@/components/Power.vue'],resolve)
      },
      {
      	path : '/contact',
      	component : resolve => require(['@/components/Contact.vue'],resolve)
      },
      {
      	path : '/scene',
      	component : resolve => require(['@/components/Scene.vue'],resolve)
      },
      ]
    }
  ]
})
