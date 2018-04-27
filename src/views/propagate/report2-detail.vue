<template>
  <div class="content-wrap">
    <mt-header fixed title="宣传报送">
      <router-link to="/report2-list" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <router-link to="" slot="right">
        <mt-button @click="modify">{{edit}}</mt-button>
      </router-link>
    </mt-header>
    <mt-field label="主题：" placeholder="请输入主题" v-model="list.Theme" :disabled="disabled"></mt-field>
    <mt-field label="内容描述：" placeholder="请输入内容描述" type="textarea" rows="4" v-model="list.Description" :disabled="disabled"></mt-field>
    <div class="download">
      <p>附件下载:</p>
      <a v-for="(url, index) in downloadUrl" :href="'/apis/PublicInfoManage/ResourceFile/MobileDownloadFile?keyValue='+ url.FileId" :key="url.FileId">
        {{index + 1}} . {{url.FileName}}
      </a>
    </div>
  </div>
</template>

<script>
import {ajaxReportDetail, ajaxReportDownload, ajaxReportEdit} from '../../api/api.js'
export default {
  name: 'app',
  // 点击之后，会把传过来的keyvalue 消掉，所以 用一个keyvalue 存keyvalue值
  data () {
    return {
      msg: '宣传报送',
      edit: '编辑',
      disabled: true,
      fileList: [],
      keyValue: '',
      downloadUrl: [],
      list: {
        keyValue: '',
        Theme: '',
        Type: '2',
        Description: '',
        Enclosure: ''
      }
    }
  },
  mounted: function () {
    let _this = this
    _this.init()
  },
  methods: {
    init () {
      let _this = this
      _this.list.keyValue = _this.$route.query.keyValue
      _this.keyValue = _this.$route.query.keyValue

      ajaxReportDetail(_this.list.keyValue, function (data) {
        _this.list = data
        _this.getDownload()
      })
    },
    getDownload () {
      let _this = this
      ajaxReportDownload(_this.list.Enclosure, function (data) {
        if (data.length === 0) {
          _this.downloadUrl = [{FileName: '暂无附件可下载'}]
        } else {
          _this.downloadUrl = data
        }
      })
    },
    modify () {
      let _this = this

      if (_this.edit === '编辑') {
        _this.disabled = false
        _this.edit = '提交'
      } else {
        ajaxReportEdit(_this.keyValue, _this.list, function (data) {
          console.log(data)
          _this.$router.push({path: '/report2-list'})
        })
        _this.disabled = true
        _this.edit = '编辑'
      }
    },
    submitUpload () {
      this.$refs.upload.submit()
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handleSuccess (response, file, fileList) {
      let _this = this
      console.log(response)
      for (var i = 0; i < fileList.length; i++) {
        if (i < fileList.length - 1) {
          _this.list.Enclosure = _this.list.Enclosure + response.fileid + ','
        } else {
          _this.list.Enclosure = _this.list.Enclosure + response.fileid
        }
      }
    },
    handlePreview (file) {
      console.log(file)
    }
  }
}
</script>
<style lang="scss" scoped>
  .content-wrap {
    padding-top:40px;
    padding-bottom:10px;
  }
  .download{
    padding:5px 10px;
    border-top:1px solid #eee;
  }
  .download a {
    display: block;
    margin-top:5px;
  }
</style>
