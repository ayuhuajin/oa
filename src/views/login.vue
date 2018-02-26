<template>
  <div>
      <div class="logo">
          <img src="../assets/images/logo.jpg">
      </div>
      <div class="login">
          <input id="text" class="text" type="text" placeholder="请输入您的账号" v-model="userName" >
          <input id="password" class="password" type="password" placeholder="请输入您的密码" v-model="password">
          <div class="load" @click="login">登录</div>
          <!-- <div class="load" @click="getList">getList</div> -->
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
import md5 from 'js-md5'
import store from '@/store/store'
export default {
  name: 'login',
  data () {
    return {
      msg: '登陆页',
      userName: '',
      password: '',
      openid: ''
    }
  },
  methods: {
    login: function () {
      var _this = this
      _this.openid = _this.GetQueryString(name)
      _this.password = md5(_this.password)
      axios.post('/apis/Login/MobileCheckLogin', qs.stringify({
        username: _this.userName,
        password: _this.password,
        openid: _this.openid
      }), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((response) => {
        if (response.data.type === 1) {
          var userid = JSON.parse(response.data.resultdata.Content).userid
          localStorage.setItem('username', userid)
          store.state.token = userid
          console.log(userid)
          alert('登陆成功')
          // 全局路由使用方法
          this.$router.push({path: '/'})
          // this.$router.push({path: '/index', query: { plan: 'private' }})
        } else {
          alert(response.data.message)
        }
      }).catch((response) => {
        alert(222)
      })
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
    // getList1: function () {
    //   axios.post('/apis/Login/MobileCheckLogin', {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function () {
    //     alert('成功')
    //   }).catch(function () {
    //     alert('失败')
    //   })
    // },
    // getList: function () {
    //   axios.get('/apis/PublicInfoManage/Notice/GetPageListJson?rows=30&page=1&sidx=CreateDate&sord=desc').then(function () {
    //     alert('成功')
    //   }).catch(function () {
    //     alert('失败')
    //   })
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
    margin:30px auto 0;
    border-radius: 5px;
    text-align: center;
    line-height: 45px;
    color:white;
    background: #1790e8;
}
</style>
