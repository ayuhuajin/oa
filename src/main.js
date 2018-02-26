// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/reset.scss'
import './assets/css/public.css'
import './assets/js/rem.js'
import './assets/font/iconfont.css'
import './assets/font/iconfont.js'
import axios from 'axios'
import Vuetree from 'vue-simple-tree'
// import store from '@/store/store'
import { Indicator } from 'mint-ui'
Vue.use(Vuetree)
// 请求拦截
axios.interceptors.request.use(function (config) {
  // 处理拦截
  // 设置记载状态
  // store.commit('setLoading', true)
  Indicator.open('Loading...')
  console.log(JSON.stringify(config))
  return config
}, function (error) {
  return Promise.reject(error)
})

// 响应拦截
axios.interceptors.response.use(function (response) {
  // 处理响应配置
  // 隐藏加载
  // store.commit('setLoading', false)
  Indicator.close()
  // const data = response.data
  // alert(JSON.stringify(data))
  return response
}, function (error) {
  // 响应失败处理
  return Promise.reject(error)
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
