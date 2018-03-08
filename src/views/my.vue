<template>
  <div>
    <mt-header fixed title="我的">
    </mt-header>
    <ul class="wrap">
      <li class="account">
        <div>{{list.Account}}</div>
        <div>{{(list.ConferenceType == null)? '暂无' : list.ConferenceType}}</div>
      </li>
      <router-link tag="li" to="/my-info">个人信息修改 <img class="angle" src="../assets/images/angle.png"></router-link>
      <router-link tag="li" to="/modify">修改密码  <img class="angle" src="../assets/images/angle.png"></router-link>
      <router-link tag="li" to="/feedback">反馈问题  <img class="angle" src="../assets/images/angle.png"></router-link>
      <router-link tag="li" to="/about">关于我们  <img class="angle" src="../assets/images/angle.png"></router-link>
      <router-link tag="li" to="/version">当前版本 <img class="angle" src="../assets/images/angle.png"></router-link>
      <router-link class="out" tag="li" to="/login">退出登录</router-link>
    </ul>
    <tab></tab>
  </div>
</template>

<script>
import axios from 'axios'
import { Indicator } from 'mint-ui'
import tab from './tab.vue'
export default {
  name: 'my',
  data () {
    return {
      msg: '我的',
      list: {}
    }
  },
  mounted: function () {
    var _this = this
    var userid = localStorage.getItem('username')
    axios.get('/BaseManage/User/MobileGetFormJson?keyValue=' + userid + '', {}).then((response) => {
      console.log('信息列表请求成功')
      _this.list = response.data
    }).catch((response) => {
      Indicator.close()
      console.log('信息列表请求失败')
    })
  },
  components: {
    'tab': tab
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  ul{
    padding:40px 0 55px;
  }
  li{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:0 15px;
    border-bottom:1px solid #f5f5f5;
    line-height: 45px;
  }
  .account{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
  .angle{
    height: 18px;
    width: 9px;
  }
  .out{
    display: flex;
    justify-content: center;
    margin-top:30px;
    border-top:1px solid #f5f5f5;
    color:#409EFF;
  }
</style>
