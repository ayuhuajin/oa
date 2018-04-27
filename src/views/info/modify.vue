<template>
  <div>
    <mt-header fixed title="密码修改">
      <router-link to="/my" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="content">
      <input type="password" v-model="modify.oldPassword" placeholder="请输入原始密码"/>
      <input type="password" v-model="modify.newPassword" placeholder="请输入新密码"/>
      <div class="choose">
        <span @click="comfirm">确认</span>
        <span>取消</span>
      </div>
    </div>
  </div>
</template>

<script>
import md5 from 'js-md5'
import { ajaxModifyPassword } from '../../api/api.js'
export default {
  name: 'app',
  data () {
    return {
      msg: '密码修改',
      modify: {
        oldPassword: '',
        newPassword: ''
      }
    }
  },
  methods: {
    comfirm: function () {
      let _this = this
      _this.modify.oldPassword = md5(_this.modify.oldPassword)
      _this.modify.newPassword = md5(_this.modify.newPassword)
      ajaxModifyPassword(_this.modify, function (data) {
        _this.$router.push({path: '/my'})
      })
    }
  }
}
</script>

<style scoped>
  .content{
    margin-top: 30px;
    padding:40px 0 55px;
    text-align: center;
  }
  input{
    width:90%;
    padding-left: 10px;
    border:1px solid #eee;
    border-radius: 5px;
    line-height: 35px;
  }
  input[type=password]{
    margin-top:10px;
  }
  .choose{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top:10px;
    padding:5px 6%;
  }
</style>
