<template>
  <div>
      <div class="logo">
          <img src="../assets/images/logo.jpg">
      </div>
      <div class="login">
        <template v-if="loginType === 'username'">
          <input id="text" class="text" type="text" placeholder="请输入您的账号" v-model="params.username" >
          <input id="password" class="password" type="password" placeholder="请输入您的密码" v-model="params.password">
        </template>
        <template v-else>
          <input id="phone" type="text" placeholder="请输入您的手机号" v-model="params.phone">
          <div class="code-wrap">
            <input id="code" type="text" placeholder="请输入您验证码" v-model="params.code">
            <button class="access" :disabled="disabled" @click="access">{{codeValue}}</button>
          </div>
        </template>
        <div class="switch-mode" @click="change">{{toggleValue}}</div>
        <div class="load" @click="login">登录</div>
      </div>
  </div>
</template>

<script>
import md5 from 'js-md5'
import store from '@/store/store'
import { ajaxLogin, ajaxVertifitionCode } from '../api/api.js'
export default {
  name: 'login',
  data () {
    return {
      msg: '登陆页',
      params: {
        openid: '',
        username: '',
        password: '',
        phone: '',
        code: ''
      },
      userName: '',
      password: '',
      openid: '',
      loginType: 'username',
      codeValue: '获取验证码',
      toggleValue: '验证码登录',
      disabled: false,
      num: 60,
      clock: {}
    }
  },
  created: function () {
    //
  },
  mounted: function () {
    //
  },
  methods: {
    change: function () {
      let _this = this
      if (_this.loginType === 'username') {
        _this.loginType = ''
        _this.toggleValue = '密码登录'
      } else {
        _this.loginType = 'username'
        _this.toggleValue = '验证码登录'
      }
    },
    access: function () {
      let _this = this

      _this.disabled = true
      _this.codeValue = _this.num + 'S后可重新获取'
      _this.clock = setInterval(function () {
        _this.countDown()
      }, 1000)

      ajaxVertifitionCode(_this.params.phone, function () {
        console.log('成功')
      })
    },
    countDown: function () {
      let _this = this
      _this.num--
      if (_this.num > 0) {
        _this.codeValue = _this.num + 'S后可重新获取'
      } else {
        clearInterval(_this.clock)
        _this.disabled = false
        _this.num = 60
        _this.codeValue = '获取验证码'
      }
    },

    login: function () {
      let _this = this

      _this.params.openid = _this.GetQueryString(name)
      _this.params.password = md5(_this.params.password)
      ajaxLogin(_this.params, function (data) {
        if (data.type === 1) {
          var userid = JSON.parse(data.resultdata.Content).userid
          var username = JSON.parse(data.resultdata.Content).username
          localStorage.setItem('userid', userid)
          localStorage.setItem('username', username)
          store.state.token = userid
          console.log(userid)
          console.log('登陆成功')
          // 全局路由使用方法
          _this.$router.push({path: '/'})
          // this.$router.push({path: '/index', query: { plan: 'private' }})
        } else {
          alert(data.message)
        }
      })
      // var _this = this
      // _this.params.openid = _this.GetQueryString(name)
      // _this.params.password = md5(_this.params.password)
      // axios.post('/Login/MobileCheckLogin', qs.stringify({
      //   username: _this.params.username,
      //   password: _this.params.password,
      //   openid: _this.params.openid,
      //   phone: _this.params.phone,
      //   code: _this.params.code
      // }), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((response) => {
      //   if (response.data.type === 1) {
      //     var userid = JSON.parse(response.data.resultdata.Content).userid
      //     localStorage.setItem('username', userid)
      //     store.state.token = userid
      //     console.log(userid)
      //     alert('登陆成功')
      //     // 全局路由使用方法
      //     this.$router.push({path: '/'})
      //     // this.$router.push({path: '/index', query: { plan: 'private' }})
      //   } else {
      //     alert(response.data.message)
      //   }
      // }).catch((response) => {
      //   alert(222)
      // })
    },
    GetQueryString: function (name) {
      var reg = new RegExp('(^|&)' + name + ' = ([^&]*)(&|$)', 'i')
      var r = window.location.search.substr(1).match(reg)
      var context = ''
      if (r != null) {
        context = r[2]
        reg = null
        r = null
        return context === null || context === '' || context === 'undefined' ? '' : context
      }
    }
  }
}
</script>

<style scoped>
.logo{
    width:40%;
    margin:10% auto;
    border-radius:50%;
    overflow: hidden;
}
.login input{
    display: block;
    width:80%;
    margin:10px auto 0;
    padding-left:35px;
    border:1px solid #eee;
    border-radius: 5px;
    line-height: 40px;
}
.load:active{
    background: #0295ff;
}
.switch-mode{
  width: 80%;
  margin:5px auto;
  text-align: right;
}
.code-wrap{
  position: relative;
}
.access{
  position: absolute;
  top:10px;
  right: 14%;
  padding:2px 4px;
  border:none;
  border-radius:3px;
  font-size: 10px;
  color:white;
  background: #1790e8;
}
.active{background:red;}
input[type=text]{
    background: url("../assets/images/account.png") no-repeat 5px center;
    background-size:25px 25px;
}
input[type=password]{
    background: url("../assets/images/password.png") no-repeat 5px center;
    background-size:25px 25px;
}
.load{
    display: block;
    width:80%;
    margin:20px auto 0;
    border-radius: 5px;
    text-align: center;
    line-height: 45px;
    color:white;
    background: #1790e8;
}
</style>
