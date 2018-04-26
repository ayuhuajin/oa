<template>
  <div>
    <div style="width:100%;height:40px;"></div>
    <mt-header fixed title="通知公告">
      <router-link to="/notice-list" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <router-link to="" slot="right">
        <mt-button @click="submit">创建</mt-button>
      </router-link>
    </mt-header>
    <div class="wrap">
      <input class="title" v-model="title" placeholder="请输入公告标题"/>
      <textarea class="content" v-model="content" placeholder="请输入公告内容"></textarea>
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
        <!-- <div @click="submitUpload" style="margin-top:30px;"> shang1</div> -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
  data () {
    return {
      title: '',
      content: '',
      time: '2017-10-10',
      FileIds: '',
      fileList: []
    }
  },
  created: function () {
    console.log(111)
  },
  methods: {
    submit: function () {
      var _this = this
      axios.post('/PublicInfoManage/Notice/SaveForm/?keyValue=', qs.stringify({
        FullHead: _this.title,
        NewsContent: _this.content,
        FileIds: _this.FileIds,
        ReLeaseTime: _this.time
      }), {headers: {'X-Requested-With': 'XMLHttpRequest'}}).then((response) => {
        console.log('通知公告提交成功')
        this.$router.push({path: '/notice-list'})
      }).catch((resopnse) => {
        console.log('通知公告提交失败')
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
          _this.FileIds = _this.FileIds + response.fileid + ','
        } else {
          _this.FileIds = _this.FileIds + response.fileid
        }
      }
    },
    handlePreview (file) {
      console.log(file)
    }
  }
}
</script>
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

<style scoped>
.upload{
  margin-top:15px;
  background:white;
}
.wrap{
  padding:10px 0 20px;
  background: #f5f5f5;
}
.title{
  width: 100%;
  padding-left: 3%;
  line-height: 45px;
  background: white;
  border:none;
}
.content{
  width: 100%;
  min-height: 200px;
  margin-top: 20px;
  padding-left: 3%;
  padding-top: 3%;
  border:none;
}
</style>
