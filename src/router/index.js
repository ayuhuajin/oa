import Vue from 'vue'
import Router from 'vue-router'
import MintUI from 'mint-ui'
import HelloWorld from '@/components/HelloWorld'
import index from '@/views/index'
import toDo from '@/views/toDo'
import addressList from '@/views/addressList'
import my from '@/views/my'
import tab from '@/views/tab'
import 'mint-ui/lib/style.css'

Vue.use(Router)
Vue.use(MintUI)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/toDo',
      name: 'toDo',
      component: toDo
    },
    {
      path: '/addressList',
      name: 'addressList',
      component: addressList
    },
    {
      path: '/my',
      name: 'my',
      component: my
    },
    {
      path: '/tab',
      name: 'tab',
      component: tab
    }
  ]
})
