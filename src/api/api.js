// export function apiBase() {
//     let hostname = window.location.hostname,
//       API_BASE_URL = 'http://test2api.dunizb.com';//默认环境
//     if(hostname === 'crm.dunizb.cn') {  //正式环境
//       API_BASE_URL = 'http://api.dunizb.cn';
//     } else if(hostname === 'admin.dunizb.com') {//公网测试环境
//       API_BASE_URL = 'http://testapi.dunizb.com';
//     } else if(hostname === 'manager.dunizb.com') {//内网测试环境
//       API_BASE_URL = 'http://test2api.dunizb.com';
//     }
//     return API_BASE_URL;
//   }

// import Vue from 'vue'
// import VueResource from 'vue-resource'
// import {Loading, Tip} from 'component-base-ui'
// import {lsgGetData, ssgGetData, ssgSaveData, ssgDeleteData} from '../../node_modules/web-framework/libs/js/util.js'

// let _this = Vue.use(VueResource)
// const URLORGAN = '/apiorgan'
// const URLDATA = '/apidata'
// const URLDESK = '/apidesk'
// // 本地缓存用户信息KEY，请与App.vue中的定义保持一致
// const LSTUSERKEY = 'portalUser'
// const TIMEOUT = 30000
// const ERRORSERVICE = '服务异常，请稍后再试！'
// const ERRORTIMEOUT = '连接超时，请稍后再试！'
// let LOGINUSER = ''

// // _this.http.options.emulateJSON = true;

// _this.http.interceptors.push(function (request, next) {
//   let token = LOGINUSER ? LOGINUSER.token : ''
//   // 设置超时
//   let timeout = setTimeout(function () {
//     request.abort()
//     window.EVENTBUS.$emit('alertTimeout', {'display': true})
//   }, TIMEOUT)

//   // 显示加载动画
//   window.EVENTBUS.$emit('changeLoading', {'display': true})
//   // 设置请求头
//   request.headers.set('Authorization', token)
//   // 拦截处理全局ajax回调
//   next(function (response) {
//     window.EVENTBUS.$emit('changeLoading', {'display': false})
//     if ((response.status === 400 && Object.keys(LOGINUSER).length === 0) || response.status === 401) {
//       // 未登录或者身份已失效
//       window.EVENTBUS.$emit('alertTokenError', {
//         'display': true
//       })
//     }
//     let body = response.body

//     if (typeof body === 'string' && body.indexOf('html') >= 0) {
//       window.EVENTBUS.$emit('changeTip', {'display': true, 'theme': 'error', 'content': ERRORSERVICE})
//     }
//     clearTimeout(timeout)
//     return response
//   })
// })

import axios from 'axios'
import { Indicator } from 'mint-ui'

axios.defaults.baseURL = '/apis'
// axios.defaults.baseURL = ''
// 请求拦截
axios.interceptors.request.use(function (config) {
  // 处理拦截
  // 设置记载状态
  // store.commit('setLoading', true)
  Indicator.open('Loading...')
  // console.log(JSON.stringify(config))
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

// ===============================【通用功能相关接口∨】===============================

/**
 * 登录模块
 * @param {object} loginUser - 登录用户信息LOGINUSER = loginUser;
 * @param {userNumber} accNbr - 子管理员帐号
 */
export function ajaxLogin (userNumber, callback) {
  axios.get('/BaseManage/User/UserListMobile', {}).then((response) => {
    console.log('通讯录请求成功')
    callback(response.data)
  }).catch((response) => {
    Indicator.close()
    console.log('通讯录请求失败')
  })
}

/**
 * 活动会议组织列表
 * @param {object} loginUser - 登录用户信息LOGINUSER = loginUser;
 * @param {userNumber} accNbr - 子管理员帐号
 */
export function ajaxMeetingList (data, callback) {
  let params = {
    page: data.page,
    rows: data.rows,
    sidx: data.sidx,
    sord: data.sord,
    queryJson: data.queryJson
  }

  axios.get('/PublicInfoManage/Conference/GetMobilePageListJson', {
    params: params
  }).then((response) => {
    console.log('活动会议组织列表请求成功')
    callback(response.data)
  }).catch((response) => {
    Indicator.close()
    console.log('活动会议组织列表请求失败')
  })
}

/**
 * 通知公告列表
 * @param {object} loginUser - ;
 * @param {userNumber} accNbr - ;
 */
export function ajaxNoticeList (data, callback) {
  let params = {
    page: data.page,
    rows: data.rows,
    sidx: data.sidx,
    sord: data.sord,
    queryJson: data.queryJson
  }

  axios.get('/PublicInfoManage/Notice/GetPageListJson', {
    params: params
  }).then((response) => {
    console.log('通知公告列表请求成功')
    callback(response.data)
  }).catch((response) => {
    Indicator.close()
    console.log('通知公告列表请求失败')
  })
}

/**
 * 短信群发列表
 * @param {object} loginUser - ;
 * @param {userNumber} accNbr - ;
 */
export function ajaxMessageList (data, callback) {
  let params = {
    page: data.page,
    rows: data.rows,
    sidx: data.sidx,
    sord: data.sord,
    queryJson: data.queryJson
  }

  axios.get('/PublicInfoManage/Sms/MobileGetPageListJson', {
    params: params
  }).then((response) => {
    console.log('短信群发列表请求成功')
    callback(response.data)
  }).catch((response) => {
    Indicator.close()
    console.log('短信群发列表请求失败')
  })
}

// ===============================【通用功能相关接口∧】===============================

// ===============================【组织部相关接口∨】===============================

// ===============================【组织部相关接口∧】===============================

// ===============================【调研部相关接口∨】===============================
/**
 * 调研课题列表
 * @param {object} loginUser - 登录用户信息LOGINUSER = loginUser;
 * @param {userNumber} accNbr - 子管理员帐号
 */
export function ajaxResearchList (data, callback) {
  let params = {
    page: data.page,
    rows: data.rows,
    sidx: data.sidx,
    sord: data.sord,
    queryJson: data.queryJson
  }

  axios.get('/SubjectManage/Subject/GetMobilePageListJson', {
    params: params
  }).then((response) => {
    console.log('调研课题列表请求成功')
    callback(response.data)
  }).catch((response) => {
    Indicator.close()
    console.log('调研课题列表请求失败')
  })
}

/**
 * 提案工作列表
 * @param {object} loginUser - 登录用户信息LOGINUSER = loginUser;
 * @param {userNumber} accNbr - 子管理员帐号
 */
export function ajaxProposalList (data, callback) {
  let params = {
    page: data.page,
    rows: data.rows,
    sidx: data.sidx,
    sord: data.sord,
    queryJson: data.queryJson
  }

  axios.get('/ProposalManage/Proposal/GetMobilePageListJson', {
    params: params
  }).then((response) => {
    console.log('提案工作列表请求成功')
    callback(response.data)
  }).catch((response) => {
    Indicator.close()
    console.log('提案工作列表请求失败')
  })
}

// ===============================【调研部相关接口∨】===============================

// ===============================【宣传部相关接口∨】===============================
/**
 * 约稿列表
 * @param {object} loginUser - 登录用户信息LOGINUSER = loginUser;
 * @param {userNumber} accNbr - 子管理员帐号
 */
export function ajaxManuscriptsList (data, callback) {
  let params = {
    page: data.page,
    rows: data.rows,
    sidx: data.sidx,
    sord: data.sord,
    queryJson: data.queryJson
  }

  axios.get('/ReservationManage/Reservation/GetMobilePageListJson', {
    params: params
  }).then((response) => {
    console.log('约稿列表请求成功')
    callback(response.data)
  }).catch((response) => {
    Indicator.close()
    console.log('约稿列表请求失败')
  })
}

/**
 * 信息报送列表
 * @param {object} loginUser - 登录用户信息LOGINUSER = loginUser;
 * @param {userNumber} accNbr - 子管理员帐号
 */
export function ajaxMessageReportList (data, callback) {
  let params = {
    page: data.page,
    rows: data.rows,
    sidx: data.sidx,
    sord: data.sord,
    queryJson: data.queryJson
  }

  axios.get('/ReservationManage/Reservation/GetMobilePageListJson', {
    params: params
  }).then((response) => {
    console.log('信息报送列表请求成功')
    callback(response.data)
  }).catch((response) => {
    Indicator.close()
    console.log('信息报送列表请求失败')
  })
}

/**
 * 宣传报送列表
 * @param {object} loginUser - 登录用户信息LOGINUSER = loginUser;
 * @param {userNumber} accNbr - 子管理员帐号
 */
export function ajaxPropagateReportList (data, callback) {
  let params = {
    page: data.page,
    rows: data.rows,
    sidx: data.sidx,
    sord: data.sord,
    queryJson: data.queryJson
  }

  axios.get('/ReservationManage/Reservation/GetMobilePageListJson', {
    params: params
  }).then((response) => {
    console.log('宣传报送列表请求成功')
    callback(response.data)
  }).catch((response) => {
    Indicator.close()
    console.log('宣传报送列表请求失败')
  })
}
// ===============================【宣传部相关接口∨】===============================
