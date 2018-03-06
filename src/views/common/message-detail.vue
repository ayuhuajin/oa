<template>
  <div>
    <div style="width:100%;height:40px;"></div>
    <mt-header fixed title="短信">
      <router-link to="/message-list" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div>
      <h3>短信详情</h3>
      <textarea readonly placeholder="请输入短信内容" v-model="content"></textarea>
    </div>
    <!-- <p>{{$route.messageDetail.id}}</p> -->
  </div>
</template>

<script>
import axios from 'axios'
import { Indicator } from 'mint-ui'
export default {
  name: 'messageDetail',
  data () {
    return {
      content: '',
      data: '1'
    }
  },
  created: function () {
    var _this = this
    axios.get('/PublicInfoManage/Sms/MobileGetFormJson?keyValue=' + this.$route.params.keyValue + '', {}).then((response) => {
      console.log('信息列表请求成功')
      _this.content = response.data.SmsContent
    }).catch((response) => {
      Indicator.close()
      console.log('信息列表请求失败')
    })
  }
}
</script>
<style scoped>
  h3{font-size: 16px;margin-top: 30px;margin-left: 5%;margin-bottom: 5px;}
  textarea{width: 96%;height:200px;margin-left: 2%;padding:10px 0 0 10px}
</style>
