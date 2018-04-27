<template>
  <div class="content-wrap">
    <mt-header fixed title="信息报送">
      <router-link to="/report-list" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <router-link to="" slot="right">
        <mt-button @click="reportAdd">{{add}}</mt-button>
      </router-link>
    </mt-header>
    <mt-field label="主题：" placeholder="请输入主题" v-model="list.Theme"></mt-field>
    <mt-field label="内容描述：" placeholder="请输入内容描述" type="textarea" rows="4" v-model="list.Description"></mt-field>
    <div class="upload">
      <el-upload
        class="upload-demo"
        ref="upload"
        :auto-upload="false"
        :file-list="fileList"
        action="apis/PublicInfoManage/ResourceFile/MobileUploadifyFile/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        >
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip"  @click="submitUpload">文件不能超过5MB</div>
      </el-upload>
    </div>
  </div>
</template>

<script>
import {ajaxReportAdd} from '../../api/api.js'
export default {
  name: 'app',
  data () {
    return {
      msg: '信息报送',
      add: '创建',
      list: {
        keyValue: '',
        Theme: '',
        Type: '1',
        Description: '',
        Enclosure: ''
      },
      FileIds: '',
      fileList: []
    }
  },
  methods: {
    reportAdd: function () {
      let _this = this

      ajaxReportAdd(_this.list, function (data) {
        _this.$router.push({path: '/report-list'})
      })
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
</style>

<style>
.el-upload-list {
  margin: 0;
  padding: 20px 0;
  list-style: none;
  background: white;
}
.el-upload__tip,.el-button{
  margin-left: 15px;
}
.el-button{
  margin-top: 15px;
}
.el-upload-list__item .el-icon-close{
  display: inline;
}
.el-upload-list__item.is-success .el-icon-close{
  display: none;
}
.el-upload-list__item-name{
  line-height: 40px;
  font-size: 16px;
}
.el-icon-circle-check:before,.el-icon-close:before {
  font-size: 18px;
}

.el-upload-list__item-status-label,.el-upload-list__item .el-icon-close{
  top: 10px;
}
.el-upload-list__item{
  border-top:1px solid #ddd;
  border-bottom:1px solid #ddd;
}
.el-upload-list__item .el-progress{
  top:30px;
}
.el-progress_text{
  color: red;
}
.el-upload-list__item .el-progress__text {
  position: absolute;
  right: 25px;
  top: -15px;
}
.el-progress-bar__inner{
  margin-top: 0;
}
.el-upload-list__item .el-icon-upload-success{
  top:20px;
}
.el-icon-close-tip{
  display: none;
}
</style>
