// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import './assets/js/webupload/webuploader.js'
import Vue from 'vue'
import App from './App'
import router from './router'
// import './api/mock.js'
import './assets/css/reset.scss'
import './assets/css/public.css'
import './assets/js/rem.js'
import './assets/font/iconfont.css'
import './assets/font/iconfont.js'
// import axios from 'axios'
import Vuetree from 'vue-simple-tree'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import vueSignature from 'vue-signature'
// import store from '@/store/store'
// import { Indicator } from 'mint-ui'
Vue.use(vueSignature)
Vue.use(ElementUI)
Vue.use(Vuetree)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
