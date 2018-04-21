<template>
  <div>
    <div style="width:100%;height:40px;"></div>
    <mt-header fixed title="短信">
      <router-link to="/message-list" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <router-link to="/message" slot="right">
        <mt-button @click="add">创建</mt-button>
      </router-link>
    </mt-header>
    <div>
      <h3>短信群发</h3>
      <textarea placeholder="请输入短信内容" v-model="messageparams.SmsContent"></textarea>
    </div>
    <oatree :showtree="show" @callback="treeCallback"></oatree>
  </div>
</template>

<script>
import {ajaxMessageGetTreeList, ajaxAddMessage} from '../../api/api.js'
import oatree from '../../components/oatree'
export default {
  components: {
    oatree
  },
  data () {
    return {
      show: false,
      messageContent: '',
      userid: '',
      messageparams: {
        SmsContent: '',
        UserList: []
      }
    }
  },
  created: function () {
    let _this = this

    _this.init()
  },
  methods: {
    init () {
      let _this = this

      _this.userid = localStorage.getItem('userid')
      ajaxMessageGetTreeList(_this.userid, function (data) {
        console.log(data)
      })
    },
    add () {
      let _this = this
      if (_this.messageparams.UserList.length !== 0) {
        ajaxAddMessage(_this.messageparams, function (data) {
          console.log(data)
          _this.$router.push({path: '/message-list'})
          console.log(data)
        })
      } else {
        this.show = true
      }
    },
    treeCallback (data) {
      let _this = this
      _this.show = false
      _this.messageparams.UserList = data
    }
  }
}
</script>

<style scoped>
  h3{font-size: 16px;margin-top: 30px;margin-left: 5%;margin-bottom: 5px;}
  textarea{width: 96%;height:200px;margin-left: 2%;padding:10px 0 0 10px}
</style>
