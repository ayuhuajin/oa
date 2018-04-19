<template>
  <div>
    <div style="width:100%;height:40px;"></div>
    <mt-header fixed title="短信">
      <router-link to="/message-list" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <router-link to="/message" slot="right">
        <mt-button >创建</mt-button>
      </router-link>
    </mt-header>
    <div>
      <h3>短信群发</h3>
      <textarea placeholder="请输入短信内容" v-model="messageContent"></textarea>
    </div>
  </div>
</template>

<script>
import { ajaxMessageGetTreeList } from '../../api/api.js'
export default {
  data () {
    return {
      messageContent: '',
      userid: ''
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
    }
  }
}
</script>

<style scoped>
  h3{font-size: 16px;margin-top: 30px;margin-left: 5%;margin-bottom: 5px;}
  textarea{width: 96%;height:200px;margin-left: 2%;padding:10px 0 0 10px}
</style>
