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
import qs from 'qs'

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
export function ajaxLogin (data, callback) {
  axios.post('/Login/MobileCheckLogin', qs.stringify({
    openid: data.openid,
    username: data.username,
    password: data.password,
    phone: data.phone,
    code: data.code
  }), {headers: {'X-Requested-With': 'XMLHttpRequest'}}).then((response) => {
    console.log('登录请求成功')
    callback(response.data)
  }).catch((response) => {
    Indicator.close()
    console.log('登录请求失败')
  })
}

/**
 * 获取验证码
 * @param {object} loginUser - 登录用户信息LOGINUSER = loginUser;
 * @param {userNumber} accNbr - 子管理员帐号
 */
export function ajaxVertifitionCode (data, callback) {
  axios.post('/Login/MobileLoginSms', qs.stringify({
    mobile: data
  }), {headers: {'X-Requested-With': 'XMLHttpRequest'}}).then((response) => {
    console.log('获取验证码请求成功')
  }).catch((response) => {
    console.log('获取验证码请求失败')
  })
}
/**
 * 发文列表
 * @param {object} loginUser - 登录用户信息LOGINUSER = loginUser;
 * @param {userNumber} accNbr - 子管理员帐号
 */
export function ajaxSendList (data, callback) {
  let params = {
    page: data.page,
    rows: data.rows,
    sidx: data.sidx,
    sord: data.sord,
    queryJson: data.queryJson
  }

  axios.get('/DocumentManage/Document/MobileGetPageListJson', {
    params: params
  }).then((response) => {
    console.log('发文列表请求成功')
    callback(response.data)
  }).catch((response) => {
    Indicator.close()
    console.log('发文列表请求失败')
  })
}

/**
 * 新建发文
 * @param {object} loginUser - 登录用户信息LOGINUSER = loginUser;
 * @param {userNumber} accNbr - 子管理员帐号
 */
export function ajaxSendAdd (keyValue, params, callback) {
  axios.post('/DocumentManage/Document/MobileSaveForm', qs.stringify({
    keyValue: keyValue,
    DocumentNumber: params.documentnumber,
    Urgency: params.urgency,
    Limit: params.limit,
    Content: params.content,
    DocumentDate: params.documentdate,
    Security: params.security,
    Deadline: params.deadline,
    According: params.according,
    ProofDate: params.proofdate,
    TypeDate: params.typedate,
    FileNumber: params.filenumber,
    PrintedNumber: params.printednumber,
    Title: params.title,
    MainSending: params.mainsending,
    MainNumber: params.mainnumber,
    Copy: params.copy
  }), {headers: {'X-Requested-With': 'XMLHttpRequest'}}).then((response) => {
    console.log('新建发文请求成功')
    callback(response.data)
  }).catch((response) => {
    Indicator.close()
    console.log('新建发文请求失败')
  })
}

/**
 * 发文详情
 * @param {object} loginUser - 登录用户信息LOGINUSER = loginUser;
 * @param {userNumber} accNbr - 子管理员帐号
 */
export function ajaxSendDetail (data, callback) {
  let params = {
    keyValue: data
  }

  axios.get('/DocumentManage/Document/MobileGetFormJson', {
    params: params
  }).then((response) => {
    console.log('发文详情请求成功')
    callback(response.data)
  }).catch((response) => {
    Indicator.close()
    console.log('发文详情请求失败')
  })
}

/**
 * 发文编辑
 * @param {object} loginUser - 登录用户信息LOGINUSER = loginUser;
 * @param {userNumber} accNbr - 子管理员帐号
 */
export function ajaxSendEdit (keyValue, params, callback) {
  axios.post('/DocumentManage/Document/MobileSaveForm', qs.stringify({
    keyValue: keyValue,
    DocumentNumber: params.documentnumber,
    Urgency: params.urgency,
    Limit: params.limit,
    Content: params.content,
    DocumentDate: params.documentdate,
    Security: params.security,
    Deadline: params.deadline,
    According: params.according,
    ProofDate: params.proofdate,
    TypeDate: params.typedate,
    FileNumber: params.filenumber,
    PrintedNumber: params.printednumber,
    Title: params.title,
    MainSending: params.mainsending,
    MainNumber: params.mainnumber,
    Copy: params.copy
  }), {headers: {'X-Requested-With': 'XMLHttpRequest'}}).then((response) => {
    console.log('发文编辑请求成功')
    callback(response.data)
  }).catch((response) => {
    Indicator.close()
    console.log('发文编辑请求失败')
  })
}

/**
 * 发文附件下载
 * @param {object} loginUser - 登录用户信息LOGINUSER = loginUser;
 * @param {userNumber} accNbr - 子管理员帐号
 */
export function ajaxSendDownload (data, callback) {
  let params = {
    keyValue: data
  }

  axios.get('/DocumentManage/Document/MobileGetDocumentFile', {
    params: params
  }).then((response) => {
    console.log('发文附件下载请求成功')
    callback(response.data)
  }).catch((response) => {
    Indicator.close()
    console.log('发文附件下载请求失败')
  })
}

// /**
//  * 发文签批进度节点
//  * @param {object} loginUser - 登录用户信息LOGINUSER = loginUser;
//  * @param {userNumber} accNbr - 子管理员帐号
//  */
// export function ajaxSendProcess (data, callback) {
//   let params = {
//     keyValue: data
//   }

//   axios.get('/DocumentManage/Document/MobileGetVerificationInfo', {
//     params: params
//   }, {headers: {'X-Requested-With': 'XMLHttpRequest'}}).then((response) => {
//     console.log('发文签批进度节点请求成功')
//     callback(response.data)
//   }).catch((response) => {
//     Indicator.close()
//     console.log('发文签批进度节点请求失败')
//   })
// }

/**
 * 发文签批进度节点
 * @param {object} loginUser - 登录用户信息LOGINUSER = loginUser;
 * @param {userNumber} accNbr - 子管理员帐号
 */
export function ajaxSendProcess (data, callback) {
  let params = {
    keyValue: data
  }

  axios.get('/DocumentManage/Document/MobileGetVerificationInfo', {
    params: params
  }, {headers: {'X-Requested-With': 'XMLHttpRequest'}}).then((response) => {
    console.log('发文签批进度节点请求成功')
    callback(response.data)
  }).catch((response) => {
    Indicator.close()
    console.log('发文签批进度节点请求失败')
  })
}
/**
 * 发文审批列表
 * @param {object} loginUser - 登录用户信息LOGINUSER = loginUser;
 * @param {userNumber} accNbr - 子管理员帐号
 */
export function ajaxApprovedList (data, callback) {
  let params = {
    page: data.page,
    rows: data.rows,
    sidx: data.sidx,
    sord: data.sord,
    queryJson: data.queryJson
  }

  axios.get('/DocumentManage/Document/MobileToMeGetPageListJson', {
    params: params
  }).then((response) => {
    console.log('发文审批列表请求成功')
    callback(response.data)
  }).catch((response) => {
    Indicator.close()
    console.log('发文审批列表请求失败')
  })
}

/**
 * 发文审批详情
 * @param {object} loginUser - 登录用户信息LOGINUSER = loginUser;
 * @param {userNumber} accNbr - 子管理员帐号
 */
export function ajaxApprovedDetail (data, callback) {
  let params = {
    keyValue: data
  }

  axios.get('/DocumentManage/Document/MobileGetFormJson', {
    params: params
  }).then((response) => {
    console.log('发文审批详情请求成功')
    callback(response.data)
  }).catch((response) => {
    Indicator.close()
    console.log('发文审批详情请求失败')
  })
}

/**
 * 确认签批上传
 * @param {object} loginUser - 登录用户信息LOGINUSER = loginUser;
 * @param {userNumber} accNbr - 子管理员帐号
 */
export function ajaxApporvedUpload (keyValue, processid, verificationData, params, callback) {
  axios.post('/DocumentManage/Document/MobileVerification', qs.stringify({
    keyValue: keyValue,
    processId: processid,
    verificationData: verificationData,
    sign: params
  }), {headers: {'X-Requested-With': 'XMLHttpRequest'}}).then((response) => {
    console.log('签批上传请求成功')
    callback(response.data)
  }).catch((response) => {
    Indicator.close()
    console.log('签批上传请求失败')
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
 * 新建活动会议组织
 * @param {object} loginUser - 登录用户信息LOGINUSER = loginUser;
 * @param {userNumber} accNbr - 子管理员帐号
 */
export function ajaxMeetingAdd (params, callback) {
  axios.post('/PublicInfoManage/Conference/MobileSaveForm', qs.stringify({
    keyValue: params.keyValue,
    Title: params.Title,
    Initiator: params.Initiator,
    ClosingDate: params.ClosingDate,
    MeetingContent: params.MeetingContent,
    Custom: params.Custom,
    Participant: params.Participant
  }), {headers: {'X-Requested-With': 'XMLHttpRequest'}}).then((response) => {
    console.log('新建活动会议组织请求成功')
    callback(response.data)
  }).catch((response) => {
    Indicator.close()
    console.log('新建活动会议组织请求失败')
  })
}
/**
 * 活动会议组织详情
 * @param {object} loginUser - 登录用户信息LOGINUSER = loginUser;
 * @param {userNumber} accNbr - 子管理员帐号
 */
export function ajaxMeetingDetail (keyValue, callback) {
  let params = {
    keyValue: keyValue
  }

  axios.get('/PublicInfoManage/Conference/GetMobileFormJson', {
    params: params
  }).then((response) => {
    console.log('活动会议组织详情请求成功')
    callback(response.data)
  }).catch((response) => {
    Indicator.close()
    console.log('活动会议组织详情请求失败')
  })
}

/**
 * 编辑活动会议组织
 * @param {object} loginUser - 登录用户信息LOGINUSER = loginUser;
 * @param {userNumber} accNbr - 子管理员帐号
 */
export function ajaxMeetingEdit (keyValue, params, callback) {
  axios.post('/PublicInfoManage/Conference/MobileSaveForm', qs.stringify({
    keyValue: keyValue,
    Title: params.Title,
    Initiator: params.Initiator,
    ClosingDate: params.ClosingDate,
    MeetingContent: params.MeetingContent,
    Custom: params.Custom,
    Participant: params.Participant
  }), {headers: {'X-Requested-With': 'XMLHttpRequest'}}).then((response) => {
    console.log('新建活动会议组织请求成功')
    callback(response.data)
  }).catch((response) => {
    Indicator.close()
    console.log('新建活动会议组织请求失败')
  })
}
/**
 * 活动会议组织参与者
 * @param {object} loginUser - 登录用户信息LOGINUSER = loginUser;
 * @param {userNumber} accNbr - 子管理员帐号
 */
export function ajaxMeetingParticipantUser (data, callback) {
  let params = {
    keyValue: data.keyValue,
    IsAttended: data.IsAttended
  }

  axios.get('/PublicInfoManage/Conference/GetMobileUserListJson', {
    params: params
  }).then((response) => {
    console.log('活活动会议组织参与者请求成功')
    callback(response.data)
  }).catch((response) => {
    Indicator.close()
    console.log('活动会议组织参与者请求失败')
  })
}

/**
 * 活动会议组织参与人员数量统计
 * @param {object} loginUser - 登录用户信息LOGINUSER = loginUser;
 * @param {userNumber} accNbr - 子管理员帐号
 */
export function ajaxMeetingParticipantCount (data, callback) {
  let params = {
    keyValue: data.keyValue,
    IsAttended: data.IsAttended
  }

  axios.get('/PublicInfoManage/Conference/GetMobileUserListCount', {
    params: params
  }).then((response) => {
    console.log('活动会议组织参与人员数量统计请求成功')
    callback(response.data)
  }).catch((response) => {
    Indicator.close()
    console.log('活动会议组织参与人员数量统计请求失败')
  })
}

/**
 * 活动会议组织自定义内容统计
 * @param {object} loginUser - 登录用户信息LOGINUSER = loginUser;
 * @param {userNumber} accNbr - 子管理员帐号
 */
export function ajaxMeetingParticipantCustomCount (data, callback) {
  let params = {
    keyValue: data.ConferenceId,
    custom: data.Custom
  }

  axios.get('/PublicInfoManage/Conference/GetMobileCustomListCount', {
    params: params
  }).then((response) => {
    console.log('活动会议组织自定义内容统计请求成功')
    callback(response.data)
  }).catch((response) => {
    Indicator.close()
    console.log('活动会议组织自定义内容统计请求失败')
  })
}

/**
 * 活动会议组织自定义内容用户名单
 * @param {object} loginUser - 登录用户信息LOGINUSER = loginUser;
 * @param {userNumber} accNbr - 子管理员帐号
 */
export function ajaxMeetingParticipantCustomUser (data, callback) {
  let params = {
    keyValue: data.ConferenceId,
    custom: data.Custom
  }

  axios.get('/PublicInfoManage/Conference/GetMobileCustomList', {
    params: params
  }).then((response) => {
    console.log('活动会议组织自定义内容用户名单请求成功')
    callback(response.data)
  }).catch((response) => {
    Indicator.close()
    console.log('活动会议组织自定义内容用户名单请求失败')
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
 * 通知公告附件下载
 * @param {object} loginUser - 登录用户信息LOGINUSER = loginUser;
 * @param {userNumber} accNbr - 子管理员帐号
 */
export function ajaxNoticeDownload (data, callback) {
  let params = {
    keyValue: data
  }

  axios.get('/PublicInfoManage/Notice/MobileGetNoticeFile', {
    params: params
  }).then((response) => {
    console.log('通知公告附件下载请求成功')
    callback(response.data)
  }).catch((response) => {
    Indicator.close()
    console.log('通知公告附件下载请求失败')
  })
}

/**
 * 通知公告编辑
 * @param {object} loginUser - 登录用户信息LOGINUSER = loginUser;
 * @param {userNumber} accNbr - 子管理员帐号
 */
export function ajaxNoticeEdit (keyValue, NewsContent, callback) {
  axios.post('/PublicInfoManage/Notice/SaveForm', qs.stringify({
    keyValue: keyValue,
    NewsContent: NewsContent
  }), {headers: {'X-Requested-With': 'XMLHttpRequest'}}).then((response) => {
    console.log('通知公告编辑请求成功')
    callback(response.data)
  }).catch((response) => {
    Indicator.close()
    console.log('通知公告编辑请求失败')
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

/**
 * 短信群发获取树形结构
 * @param {object} loginUser - 登录用户信息LOGINUSER = loginUser;
 * @param {userNumber} accNbr - 子管理员帐号
 */
export function ajaxMessageGetTreeList (userId, callback) {
  let params = {
    userId: userId
  }

  axios.get('/Department/GetTreeListJsonMobile', {
    params: params
  }).then((response) => {
    console.log('短信群发获取树形结构请求成功')
    callback(response.data)
  }).catch((response) => {
    Indicator.close()
    console.log('短信群发获取树形结构请求失败')
  })
}

/**
 * 新增信息
 * @param {object} loginUser - 登录用户信息LOGINUSER = loginUser;
 * @param {userNumber} accNbr - 子管理员帐号
 */
export function ajaxAddMessage (data, callback) {
  axios.post('/PublicInfoManage/Sms/MobileSaveForm?keyValue=', qs.stringify({
    SmsContent: data.SmsContent,
    UserList: data.UserList
  }), {headers: {'X-Requested-With': 'XMLHttpRequest'}}).then((response) => {
    console.log('登录请求成功')
    callback(response.data)
  }).catch((response) => {
    Indicator.close()
    console.log('登录请求失败')
  })
}

// ===============================【通用功能相关接口∧】===============================

// ===============================【组织部相关接口∨】===============================
/**
 * 盟员信息管理列表
 * @param {object} loginUser - 登录用户信息LOGINUSER = loginUser;
 * @param {userNumber} accNbr - 子管理员帐号
 */
export function ajaxAllyInfoManage (callback) {
  axios.get('/BaseManage/User/UserListMobile').then((response) => {
    console.log('盟员信息管理列表请求成功')
    callback(response.data)
  }).catch((response) => {
    Indicator.close()
    console.log('盟员信息管理列表请求失败')
  })
}
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
 * 调研课题创建
 * @param {object} loginUser - 登录用户信息LOGINUSER = loginUser;
 * @param {userNumber} accNbr - 子管理员帐号
 */
export function ajaxResearchAdd (data, callback) {
  axios.post('/SubjectManage/Subject/MobileSaveForm', qs.stringify({
    keyValue: data.keyValue,
    Theme: data.Theme,
    Description: data.Description,
    Enclosure: data.Enclosure,
    ClosingDate: data.ClosingDate,
    SubmissionDeadline: data.SubmissionDeadline,
    NotifyObject: data.NotifyObject
  }), {headers: {'X-Requested-With': 'XMLHttpRequest'}}).then((response) => {
    console.log('调研课题创建请求成功')
    callback(response.data)
  }).catch((response) => {
    Indicator.close()
    console.log('调研课题创建请求失败')
  })
}
/**
 * 调研课题详情
 * @param {object} loginUser - 登录用户信息LOGINUSER = loginUser;
 * @param {userNumber} accNbr - 子管理员帐号
 */
export function ajaxSearchDetail (data, callback) {
  let params = {
    keyValue: data
  }

  axios.get('/SubjectManage/Subject/GetMobileFormJson', {
    params: params
  }).then((response) => {
    console.log('调研课题详情请求成功')
    callback(response.data)
  }).catch((response) => {
    Indicator.close()
    console.log('调研课题详情请求失败')
  })
}

/**
 * 调研课题编辑
 * @param {object} loginUser - 登录用户信息LOGINUSER = loginUser;
 * @param {userNumber} accNbr - 子管理员帐号
 */
export function ajaxSearchEdit (keyValue, data, callback) {
  axios.post('/SubjectManage/Subject/MobileSaveForm', qs.stringify({
    keyValue: keyValue,
    Theme: data.Theme,
    Description: data.Description,
    ClosingDate: data.ClosingDate,
    SubmissionDeadline: data.SubmissionDeadline
  }), {headers: {'X-Requested-With': 'XMLHttpRequest'}}).then((response) => {
    console.log('调研课题编辑请求成功')
    callback(response.data)
  }).catch((response) => {
    Indicator.close()
    console.log('调研课题编辑请求失败')
  })
}
/**
 * 调研课题附件下载
 * @param {object} loginUser - 登录用户信息LOGINUSER = loginUser;
 * @param {userNumber} accNbr - 子管理员帐号
 */
export function ajaxResearchDownload (data, callback) {
  let params = {
    keyValues: data
  }

  axios.get('/PublicInfoManage/ResourceFile/MobileGetFileListFormJson', {
    params: params
  }).then((response) => {
    console.log('调研课题附件下载请求成功')
    callback(response.data)
  }).catch((response) => {
    Indicator.close()
    console.log('调研课题附件下载请求失败')
  })
}

/**
 * 调研课题附件回复上传
 * @param {object} loginUser - 登录用户信息LOGINUSER = loginUser;
 * @param {userNumber} accNbr - 子管理员帐号
 */
export function ajaxResearchReplayUpload (SubjectId, fileIds, callback) {
  axios.post('/SubjectManage/SubjectReport/MobileSaveForm?keyValue=', qs.stringify({
    SubjectId: SubjectId,
    Enclosure: fileIds
  }), {headers: {'X-Requested-With': 'XMLHttpRequest'}}).then((response) => {
    console.log('调研课题附件回复上传请求成功')
    callback(response.data)
  }).catch((response) => {
    Indicator.close()
    console.log('调研课题附件回复上传请求失败')
  })
}
/**
 * 调研课题附件回复列表下载
 * @param {object} loginUser - 登录用户信息LOGINUSER = loginUser;
 * @param {userNumber} accNbr - 子管理员帐号
 */
export function ajaxResearchReplayListDownload (data, queryJson, callback) {
  let params = {
    rows: data.rows || 10000,
    page: data.row || 1,
    sidx: 'SubjectId',
    sord: data.sord || 'desc',
    queryJson: queryJson
  }

  axios.get('/SubjectManage/SubjectReport/GetMobilePageListJson', {
    params: params
  }).then((response) => {
    console.log('调研课题附件回复列表下载请求成功')
    callback(response.data)
  }).catch((response) => {
    Indicator.close()
    console.log('调研课题附件回复列表下载请求失败')
  })
}

/**
 * 调研课题回复下载列表展示
 * @param {object} loginUser - 登录用户信息LOGINUSER = loginUser;
 * @param {userNumber} accNbr - 子管理员帐号
 */
export function ajaxResearchReplayDownloadListShow (data, callback) {
  let params = {
    keyValues: data
  }

  axios.get('/PublicInfoManage/ResourceFile/MobileGetFileListFormJson', {
    params: params
  }).then((response) => {
    console.log('调研课题回复下载列表请求成功')
    callback(response.data)
  }).catch((response) => {
    Indicator.close()
    console.log('调研课题回复下载列表请求失败')
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

/**
 * 提案工作详情
 * @param {object} loginUser - 登录用户信息LOGINUSER = loginUser;
 * @param {userNumber} accNbr - 子管理员帐号
 */
export function ajaxProposalDetail (data, callback) {
  let params = {
    keyValue: data
  }

  axios.get('/ProposalManage/Proposal/GetMobileFormJson', {
    params: params
  }).then((response) => {
    console.log('提案工作详情请求成功')
    callback(response.data)
  }).catch((response) => {
    Indicator.close()
    console.log('提案工作详情请求失败')
  })
}

/**
 * 提案工作编辑
 * @param {object} loginUser - 登录用户信息LOGINUSER = loginUser;
 * @param {userNumber} accNbr - 子管理员帐号
 */
export function ajaxProposalEdit (keyValue, data, callback) {
  axios.post('/ProposalManage/Proposal/MobileSaveForm', qs.stringify({
    keyValue: keyValue,
    Theme: data.Theme,
    Description: data.Description,
    ClosingDate: data.ClosingDate,
    SubmissionDeadline: data.SubmissionDeadline
  }), {headers: {'X-Requested-With': 'XMLHttpRequest'}}).then((response) => {
    console.log('提案工作编辑请求成功')
    callback(response.data)
  }).catch((response) => {
    Indicator.close()
    console.log('提案工作编辑请求失败')
  })
}

/**
 * 提案工作创建
 * @param {object} loginUser - 登录用户信息LOGINUSER = loginUser;
 * @param {userNumber} accNbr - 子管理员帐号
 */
export function ajaxProposalAdd (data, callback) {
  axios.post('/ProposalManage/Proposal/MobileSaveForm', qs.stringify({
    keyValue: data.keyValue,
    Theme: data.Theme,
    Description: data.Description,
    Enclosure: data.Enclosure,
    ClosingDate: data.ClosingDate,
    NotifyObject: data.NotifyObject
  }), {headers: {'X-Requested-With': 'XMLHttpRequest'}}).then((response) => {
    console.log('提案工作创建请求成功')
    callback(response.data)
  }).catch((response) => {
    Indicator.close()
    console.log('提案工作创建请求失败')
  })
}

/**
 * 提案工作附件下载
 * @param {object} loginUser - 登录用户信息LOGINUSER = loginUser;
 * @param {userNumber} accNbr - 子管理员帐号
 */
export function ajaxProposalDownload (data, callback) {
  let params = {
    keyValues: data
  }

  axios.get('/PublicInfoManage/ResourceFile/MobileGetFileListFormJson', {
    params: params
  }).then((response) => {
    console.log('提案工作附件下载请求成功')
    callback(response.data)
  }).catch((response) => {
    Indicator.close()
    console.log('提案工作附件下载请求失败')
  })
}

/**
 * 提案工作附件回复上传
 * @param {object} loginUser - 登录用户信息LOGINUSER = loginUser;
 * @param {userNumber} accNbr - 子管理员帐号
 */
export function ajaxProposalReplayUpload (ProposalId, fileIds, callback) {
  axios.post('/ProposalManage/ProposalFeedback/MobileSaveForm?keyValue=', qs.stringify({
    ProposalId: ProposalId,
    Enclosure: fileIds
  }), {headers: {'X-Requested-With': 'XMLHttpRequest'}}).then((response) => {
    console.log('提案工作附件回复上传请求成功')
    callback(response.data)
  }).catch((response) => {
    Indicator.close()
    console.log('提案工作附件回复上传请求失败')
  })
}

/**
 * 提案工作附件回复列表下载
 * @param {object} loginUser - 登录用户信息LOGINUSER = loginUser;
 * @param {userNumber} accNbr - 子管理员帐号
 */
export function ajaxProposalReplayListDownload (data, queryJson, callback) {
  let params = {
    rows: data.rows || 10000,
    page: data.row || 1,
    sidx: 'ProposalId',
    sord: data.sord || 'desc',
    queryJson: queryJson
  }

  axios.get('/ProposalManage/ProposalFeedback/GetMobilePageListJson', {
    params: params
  }).then((response) => {
    console.log('提案工作附件回复列表下载请求成功')
    callback(response.data)
  }).catch((response) => {
    Indicator.close()
    console.log('提案工作附件回复列表下载请求失败')
  })
}

/**
 * 提案工作回复下载列表展示
 * @param {object} loginUser - 登录用户信息LOGINUSER = loginUser;
 * @param {userNumber} accNbr - 子管理员帐号
 */
export function ajaxProposalReplayDownloadListShow (data, callback) {
  let params = {
    keyValues: data
  }

  axios.get('/PublicInfoManage/ResourceFile/MobileGetFileListFormJson', {
    params: params
  }).then((response) => {
    console.log('提案工作回复下载列表展示请求成功')
    callback(response.data)
  }).catch((response) => {
    Indicator.close()
    console.log('提案工作回复下载列表展示请求失败')
  })
}

// ===============================【调研部相关接口∨】===============================

// ===============================【宣传部相关接口∨】===============================
/**
 * 盟讯邮寄列表
 * @param {object} loginUser - 登录用户信息LOGINUSER = loginUser;
 * @param {userNumber} accNbr - 子管理员帐号
 */
export function ajaxMailList (data, callback) {
  let params = {
    UserId: data
  }

  axios.get('/BaseManage/User/MobileEmailUserList', {
    params: params
  }).then((response) => {
    console.log('盟讯邮寄列表请求成功')
    callback(response.data)
  }).catch((response) => {
    Indicator.close()
    console.log('盟讯邮寄列表请求失败')
  })
}

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
 * 约稿创建
 * @param {object} loginUser - 登录用户信息LOGINUSER = loginUser;
 * @param {userNumber} accNbr - 子管理员帐号
 */
export function ajaxManuscriptsAdd (data, callback) {
  axios.post('/ReservationManage/Reservation/MobileSaveForm', qs.stringify({
    keyValue: data.keyValue,
    Theme: data.Theme,
    Description: data.Description,
    Enclosure: data.Enclosure,
    CreateTime: data.CreateTime,
    ClosingDate: data.ClosingDate,
    NotifyObject: data.NotifyObject
  }), {headers: {'X-Requested-With': 'XMLHttpRequest'}}).then((response) => {
    console.log('约稿创建请求成功')
    callback(response.data)
  }).catch((response) => {
    Indicator.close()
    console.log('约稿创建请求失败')
  })
}

/**
 * 约稿编辑
 * @param {object} loginUser - 登录用户信息LOGINUSER = loginUser;
 * @param {userNumber} accNbr - 子管理员帐号
 */
export function ajaxManuscriptsEdit (keyValue, data, callback) {
  axios.post('/ReservationManage/Reservation/MobileSaveForm', qs.stringify({
    keyValue: keyValue,
    Theme: data.Theme,
    Description: data.Description,
    Enclosure: data.Enclosure,
    CreateTime: data.CreateDate,
    ClosingDate: data.ClosingDate,
    NotifyObject: data.NotifyObject
  }), {headers: {'X-Requested-With': 'XMLHttpRequest'}}).then((response) => {
    console.log('约稿编辑请求成功')
    callback(response.data)
  }).catch((response) => {
    Indicator.close()
    console.log('约稿编辑请求失败')
  })
}

/**
 * 约稿详情
 * @param {object} loginUser - 登录用户信息LOGINUSER = loginUser;
 * @param {userNumber} accNbr - 子管理员帐号
 */
export function ajaxManuscriptsDetail (data, callback) {
  let params = {
    keyValue: data
  }

  axios.get('/ReservationManage/Reservation/GetMobileFormJson', {
    params: params
  }).then((response) => {
    console.log('约稿详情请求成功')
    callback(response.data)
  }).catch((response) => {
    Indicator.close()
    console.log('约稿详情请求失败')
  })
}

/**
 * 约稿附件下载
 * @param {object} loginUser - 登录用户信息LOGINUSER = loginUser;
 * @param {userNumber} accNbr - 子管理员帐号
 */
export function ajaxManuscriptsDownload (data, callback) {
  let params = {
    keyValues: data
  }

  axios.get('/PublicInfoManage/ResourceFile/MobileGetFileListFormJson', {
    params: params
  }).then((response) => {
    console.log('约稿附件下载请求成功')
    callback(response.data)
  }).catch((response) => {
    Indicator.close()
    console.log('约稿附件下载请求失败')
  })
}

/**
 * 约稿附件回复上传
 * @param {object} loginUser - 登录用户信息LOGINUSER = loginUser;
 * @param {userNumber} accNbr - 子管理员帐号
 */
export function ajaxManuscriptsReplayUpload (ReservationId, fileIds, callback) {
  axios.post('/ReservationManage/ReservationReport/MobileSaveForm?keyValue=', qs.stringify({
    ReservationId: ReservationId,
    Enclosure: fileIds
  }), {headers: {'X-Requested-With': 'XMLHttpRequest'}}).then((response) => {
    console.log('约稿附件回复上传请求成功')
    callback(response.data)
  }).catch((response) => {
    Indicator.close()
    console.log('约稿附件回复上传请求失败')
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
    queryJson: data.queryJson,
    type: data.type
  }

  axios.get('/ReservationManage/ReservationReport/GetMobilePageListJson2', {
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
    queryJson: data.queryJson,
    type: data.type
  }

  axios.get('/ReservationManage/ReservationReport/GetMobilePageListJson2', {
    params: params
  }).then((response) => {
    console.log('宣传报送列表请求成功')
    callback(response.data)
  }).catch((response) => {
    Indicator.close()
    console.log('宣传报送列表请求失败')
  })
}

/**
 * 信息/宣传报送创建
 * @param {object} loginUser - 登录用户信息LOGINUSER = loginUser;
 * @param {userNumber} accNbr - 子管理员帐号
 */
export function ajaxReportAdd (data, callback) {
  axios.post('/ReservationManage/ReservationReport/MobileSaveForm', qs.stringify({
    keyValue: data.keyValue,
    Theme: data.Theme,
    Description: data.Description,
    Enclosure: data.Enclosure,
    Type: data.Type
  }), {headers: {'X-Requested-With': 'XMLHttpRequest'}}).then((response) => {
    console.log('信息/宣传报送创建请求成功')
    callback(response.data)
  }).catch((response) => {
    Indicator.close()
    console.log('信息/宣传报送创建请求失败')
  })
}

/**
 * 信息/宣传报送详情
 * @param {object} loginUser - 登录用户信息LOGINUSER = loginUser;
 * @param {userNumber} accNbr - 子管理员帐号
 */
export function ajaxReportDetail (keyValue, callback) {
  let params = {
    keyValue: keyValue
  }

  axios.get('/ReservationManage/ReservationReport/GetMobileFormJson', {
    params: params
  }).then((response) => {
    console.log('信息/宣传报送详情请求成功')
    callback(response.data)
  }).catch((response) => {
    Indicator.close()
    console.log('信息/宣传报送详情请求失败')
  })
}

/**
 * 信息报送附件下载
 * @param {object} loginUser - 登录用户信息LOGINUSER = loginUser;
 * @param {userNumber} accNbr - 子管理员帐号
 */
export function ajaxReportDownload (keyValues, callback) {
  let params = {
    keyValues: keyValues
  }

  axios.get('/PublicInfoManage/ResourceFile/MobileGetFileListFormJson', {
    params: params
  }).then((response) => {
    console.log('信息/宣传报送详情请求成功')
    callback(response.data)
  }).catch((response) => {
    Indicator.close()
    console.log('信息/宣传报送详情请求失败')
  })
}

/**
 * 编辑信息报告
 * @param {object} loginUser - 登录用户信息LOGINUSER = loginUser;
 * @param {userNumber} accNbr - 子管理员帐号
 */
export function ajaxReportEdit (keyValue, data, callback) {
  axios.post('/ReservationManage/ReservationReport/MobileSaveForm', qs.stringify({
    keyValue: keyValue,
    Theme: data.Theme,
    Description: data.Description,
    Enclosure: data.Enclosure,
    Type: data.Type
  }), {headers: {'X-Requested-With': 'XMLHttpRequest'}}).then((response) => {
    console.log('编辑信息报告请求成功')
    callback(response.data)
  }).catch((response) => {
    Indicator.close()
    console.log('编辑信息报告请求失败')
  })
}

/**
 * 个人积分列表
 * @param {object} loginUser - 登录用户信息LOGINUSER = loginUser;
 * @param {userNumber} accNbr - 子管理员帐号
 */
export function ajaxPersonScoreList (data, callback) {
  let params = {
    page: data.page,
    rows: data.rows,
    sidx: data.sidx,
    sord: data.sord,
    queryJson: data.queryJson
  }

  axios.get('/ReservationManage/ReservationReportIntegra/GetMobilePageListJson', {
    params: params
  }).then((response) => {
    console.log('个人积分列表请求成功')
    callback(response.data)
  }).catch((response) => {
    Indicator.close()
    console.log('个人积分列表请求失败')
  })
}
// ===============================【宣传部相关接口∨】===============================

/**
 * 权限设置
 * @param {object} loginUser - 登录用户信息LOGINUSER = loginUser;
 * @param {userNumber} accNbr - 子管理员帐号
 */
export function ajaxAuthority (keyValue, callback) {
  let params = {
    keyValue: keyValue
  }
  axios.get('/BaseManage/User/MobileGetFormJson', {
    params: params
  }).then((response) => {
    console.log('权限设置请求成功')
    callback(response.data)
  }).catch((response) => {
    Indicator.close()
    console.log('权限设置请求失败')
  })
}

/**
 * 退出登录
 * @param {object} loginUser - 登录用户信息LOGINUSER = loginUser;
 * @param {userNumber} accNbr - 子管理员帐号
 */
export function ajaxLoginOut (callback) {
  axios.post('/Login/MobileOutLogin', {}, {headers: {'X-Requested-With': 'XMLHttpRequest'}}).then((response) => {
    console.log('退出登录请求成功')
    callback(response.data)
  }).catch((response) => {
    Indicator.close()
    console.log('退出登录请求失败')
  })
}

/**
 * 修改密码
 * @param {object} loginUser - 登录用户信息LOGINUSER = loginUser;
 * @param {userNumber} accNbr - 子管理员帐号
 */
export function ajaxModifyPassword (data, callback) {
  axios.post('/PersonCenter/MobileResetPassword', {
    password: data.newPassword,
    oldPassword: data.oldPassword
  }, {headers: {'X-Requested-With': 'XMLHttpRequest'}}).then((response) => {
    console.log('修改密码请求成功')
    callback(response.data)
  }).catch((response) => {
    Indicator.close()
    console.log('修改密码请求失败')
  })
}

/**
 * 待办列表
 * @param {object} loginUser - 登录用户信息LOGINUSER = loginUser;
 * @param {userNumber} accNbr - 子管理员帐号
 */
export function ajaxToDoList (data, callback) {
  let params = {
    page: data.page,
    rows: data.rows,
    sidx: data.sidx,
    sord: data.sord,
    queryJson: data.queryJson
  }

  axios.get('/PublicInfoManage/BackLog/GetMobilePageListJson', {
    params: params
  }).then((response) => {
    console.log('待办列表请求成功')
    callback(response.data)
  }).catch((response) => {
    Indicator.close()
    console.log('待办列表请求失败')
  })
}
