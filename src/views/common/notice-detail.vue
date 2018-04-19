<template>
  <div>
    <div style="width:100%;height:40px;"></div>
    <mt-header fixed title="通知公告">
      <router-link to="/notice-list" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <router-link to="" slot="right">
        <mt-button >修改</mt-button>
      </router-link>
    </mt-header>
    <div>
      <h3>通知详情</h3>
      <textarea placeholder="请输入短信内容" v-model="content.NewsContent"></textarea>
    </div>
    <div class="download">
      <p>附件下载:</p>
      <a v-for="(url, index) in downloadUrl" :href="'/apis/PublicInfoManage/ResourceFile/MobileDownloadFile?keyValue='+ url.FileId" :key="url.FileId">
        {{index + 1}} . {{url.FileName}}
      </a>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { Indicator } from 'mint-ui'
import { ajaxNoticeDownload } from '../../api/api.js'
export default {
  name: 'noticeDetail',
  data () {
    return {
      content: '',
      keyValue: '',
      downloadUrl: []
    }
  },
  created: function () {
    var _this = this
    axios.get('/PublicInfoManage/Notice/GetFormJson?keyValue=' + this.$route.params.keyValue + '', {}).then((response) => {
      console.log('通知公告详情请求成功')
      console.log(response)
      _this.content = response.data
    }).catch((response) => {
      Indicator.close()
      console.log('通知公告详情请求失败')
    })

    _this.keyValue = _this.$route.params.keyValue
    ajaxNoticeDownload(_this.keyValue, function (data) {
      if (data.length === 0) {
        _this.downloadUrl = [{FileName: '暂无附件可下载'}]
      } else {
        _this.downloadUrl = data
      }
    })
  }
}
</script>
<style scoped>
  h3{font-size: 16px;margin: 30px 0 20px ;text-align: center;}
  textarea{width: 96%;min-height:200px;margin-left: 2%;padding-left: 15px;padding-top: 10px;}
  .download{
    padding:5px 10px;
    border-top:1px solid #eee;
  }
</style>
