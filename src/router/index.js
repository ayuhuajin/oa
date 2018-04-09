import Vue from 'vue'
import Router from 'vue-router'
import MintUI from 'mint-ui'
import HelloWorld from '@/components/HelloWorld'
import error from '@/components/error'
import index from '@/views/index'
// import toDo from '@/views/toDo'
// import addressList from '@/views/addressList'
import my from '@/views/my'
import tab from '@/views/tab'
import login from '@/views/login'

import approved from '@/views/common/approved'
import approvedList from '@/views/common/approved-list'
import approvedDetail from '@/views/common/approved-detail'
import send from '@/views/common/send'
import sendList from '@/views/common/send-list'
import sendDetail from '@/views/common/send-detail'
import meeting from '@/views/common/meeting'
import meetingList from '@/views/common/meeting-list'
import meetingDetail from '@/views/common/meeting-detail'
import notice from '@/views/common/notice'
import noticeList from '@/views/common/notice-list'
import noticeDetail from '@/views/common/notice-detail'
import notice3 from '@/views/common/notice3'
import message from '@/views/common/message'
import messageList from '@/views/common/message-list'
import messageDetail from '@/views/common/message-detail'

import ally from '@/views/organization/ally'
import allyDetail from '@/views/organization/ally-detail'

import research from '@/views/research/research'
import researchList from '@/views/research/research-list'
import researchDetail from '@/views/research/research-detail'
import proposal from '@/views/research/proposal'
import proposalList from '@/views/research/proposal-list'
import proposalDetail from '@/views/research/proposal-detail'

import mail from '@/views/propagate/mail'
import manuscripts from '@/views/propagate/manuscripts'
import manuscriptsList from '@/views/propagate/manuscripts-list'
import manuscriptsDetail from '@/views/propagate/manuscripts-detail'
import scoreList from '@/views/propagate/score-list'
import score from '@/views/propagate/score'

import myInfo from '@/views/info/my-info'
import modify from '@/views/info/modify'
import feedback from '@/views/info/feedback'
import about from '@/views/info/about'
import version from '@/views/info/version'
import 'mint-ui/lib/style.css'

Vue.use(Router)
Vue.use(MintUI)

const router = new Router({
  mode: 'history',
  // base: '/Mobilev2/dist/',
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
      component: resolve => require(['@/views/toDo'], resolve), // 路由中配置异步组件
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/addressList',
      name: 'addressList',
      component: resolve => require(['@/views/addressList'], resolve), // 路由中配置异步组件
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
      path: '/send-list',
      name: 'sendList',
      component: sendList,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/send-detail',
      name: 'sendDetail',
      component: sendDetail,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/approved',
      name: 'approved',
      component: approved,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/approved-list',
      name: 'approvedList',
      component: approvedList,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/approved-detail',
      name: 'approvedDetail',
      component: approvedDetail,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/meeting',
      name: 'meeting',
      component: meeting,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/meeting-list',
      name: 'meetingList',
      component: meetingList,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/meeting-detail',
      name: 'meetingDetail',
      component: meetingDetail,
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
      path: '/notice-list',
      name: 'noticeList',
      component: noticeList,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/notice-detail',
      name: 'noticeDetail',
      component: noticeDetail,
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
      path: '/notice3',
      name: 'notice3',
      component: notice3,
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
    },
    {
      path: '/research',
      name: 'research',
      component: research,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/research-list',
      name: 'researchList',
      component: researchList,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/research-detail',
      name: 'researchDetail',
      component: researchDetail,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/proposal',
      name: 'proposal',
      component: proposal,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/proposal-list',
      name: 'proposalList',
      component: proposalList,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/proposal-detail',
      name: 'proposalDetail',
      component: proposalDetail,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/mail',
      name: 'mail',
      component: mail,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/manuscripts',
      name: 'manuscripts',
      component: manuscripts,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/manuscripts-list',
      name: 'manuscriptsList',
      component: manuscriptsList,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/manuscripts-detail',
      name: 'manuscriptsDetail',
      component: manuscriptsDetail,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/score-list',
      name: 'scoreList',
      component: scoreList,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/score',
      name: 'score',
      component: score,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/my-info',
      name: 'myInfo',
      component: myInfo,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/modify',
      name: 'modify',
      component: modify,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/feedback',
      name: 'feedback',
      component: feedback,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/about',
      name: 'about',
      component: about,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/version',
      name: 'version',
      component: version,
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
