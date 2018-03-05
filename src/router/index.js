import Vue from 'vue'
import Router from 'vue-router'
import MintUI from 'mint-ui'
import HelloWorld from '@/components/HelloWorld'
import error from '@/components/error'
import index from '@/views/index'
import toDo from '@/views/toDo'
import addressList from '@/views/addressList'
import my from '@/views/my'
import tab from '@/views/tab'
import login from '@/views/login'
import send from '@/views/send'
import messageList from '@/views/common/message-list'
import messageDetail from '@/views/common/message-detail'
import message from '@/views/common/message'
import notice from '@/views/common/notice'
import ally from '@/views/organization/ally'
import allyDetail from '@/views/organization/ally-detail'
import 'mint-ui/lib/style.css'

Vue.use(Router)
Vue.use(MintUI)

const router = new Router({
  mode: 'history',
  base: '/Mobilev2/dist/',
  routes: [
    {
      path: '*',
      component: error
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'index',
      component: index,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        title: '首页'
      }
    },
    {
      path: '/toDo',
      name: 'toDo',
      component: toDo,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/addressList',
      name: 'addressList',
      component: addressList,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/my',
      name: 'my',
      component: my,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/tab',
      name: 'tab',
      component: tab,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/send',
      name: 'send',
      component: send,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/message-list',
      name: 'message-list',
      component: messageList,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/message-detail',
      name: 'messageDetail',
      component: messageDetail,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/message',
      name: 'message',
      component: message,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/notice',
      name: 'notice',
      component: notice,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/ally-detail',
      name: 'allyDetail',
      component: allyDetail,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/ally',
      name: 'ally',
      component: ally,
      meta: {
        requireAuth: true
      }
    }
  ]
})
//  判断是否需要登录权限 以及是否登录
router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireAuth)) { // 判断是否需要登录权限
    if (localStorage.getItem('username')) { // 判断是否登录
      next()
    } else { // 没登录则跳转到登录界面
      next({
        path: '/login'
        // query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
})
export default router
