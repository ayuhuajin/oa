<template>
  <div id="#proposalDetail">
    <mt-header fixed title="提案工作">
      <router-link to="/proposal-list" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <router-link to="" slot="right">
        <mt-button @click="searchAdd">{{add}}</mt-button>
      </router-link>
    </mt-header>
    <div class="content-wrap">
      <mt-field label="主题：" placeholder="请输入主题" v-model="list.Theme"></mt-field>
      <mt-field label="内容描述：" placeholder="请输入内容描述" type="textarea" rows="4" v-model="list.Description"></mt-field>
      <div class="inputPicker">
        <span>截止时间:</span>
        <input type="text" readonly="" placeholder="请输入反馈截止时间" @click='openPicker' v-model='list.ClosingDate'>
      </div>
      <div class="download">
        <p>附件下载:</p>
        <a v-for="(url, index) in downloadUrl" :href="'/apis/PublicInfoManage/ResourceFile/MobileDownloadFile?keyValue='+ url.FileId" :key="url.FileId">
          {{index + 1}} . {{url.FileName}}
        </a>
      </div>
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
      <mt-datetime-picker
        v-model="pickerVisible"
        type="date"
        ref="picker"
        year-format="{value} 年"
        month-format="{value} 月"
        date-format="{value} 日"
        :startDate = 'startDate'
        :endDate = 'endDate'
        @confirm="handleConfirm"
        >
      </mt-datetime-picker>
    </div>
    <oatree :showtree="show" @callback="treeCallback"></oatree>
  </div>
</template>

<script>
import moment from 'moment'
import {ajaxProposalAdd} from '../../api/api.js'
import oatree from '../../components/oatree'
export default {
  name: 'research',
  components: {
    oatree
  },
  data () {
    return {
      msg: '调研课题',
      add: '创建',
      keyValue: '',
      show: false,
      pickerVisible: '',
      startDate: new Date('1970-01-01'),
      endDate: new Date('2080-12-30'),
      downloadUrl: [],
      FileIds: '',
      fileList: [],
      replayList: [],
      list: {
        keyValue: '',
        Theme: '',
        Description: '',
        ClosingDate: '',
        Enclosure: '',
        NotifyObject: ''
      }
    }
  },
  mounted: function () {
    let _this = this

    _this.init()
  },
  watch: {
    pickerVisible: function (data) {
      let _this = this

      _this.list.ClosingDate = moment(data).format('YYYY-MM-DD')
    }
  },
  methods: {
    init: function () {
      let _this = this
      _this.pickerVisible = moment(new Date()).format('YYYY-MM-DD')
      _this.list.keyValue = ''
      _this.list.ClosingDate = _this.pickerVisible
    },
    searchAdd () {
      let _this = this
      if (_this.list.NotifyObject.length !== 0) {
        ajaxProposalAdd(_this.list, function (data) {
          _this.$router.push({path: '/proposal-list'})
        })
      } else {
        this.show = true
      }
    },
    openPicker () {
      this.$refs.picker.open()
    },
    handleConfirm (data) {
      let date = moment(data).format('YYYY-MM-DD')
      console.log(date)
      this.pickerVisible = date
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
    },
    treeCallback (data) {
      let _this = this
      _this.show = false
      for (var i = 0; i < data.length; i++) {
        if (i < data.length - 1) {
          _this.list.NotifyObject += data[i] + ','
        } else {
          _this.list.NotifyObject += data[i]
        }
      }
    }
  }
}
</script>
<style lang="scss">
  .mint-field-core{
    background: white;
  }
</style>

<style lang="scss" scoped>
  .content-wrap {
    padding-top:40px;
    padding-bottom:10px;
  }
  .inputPicker{
    padding: 0 10px;
    line-height: 40px;
    border:1px solid #eee;
    span{
      width: 105px;
      text-align: left;
    }
    input{
      border:none;
      background:white;
    }
  }
  .customize{
    border-radius: 50%;
    background: #4a8dfc;
    height: 30px;
    width: 30px;
    text-align: center;
    line-height: 30px;
    box-sizing: border-box;
    color: white;
  }
  .custom-wrap{
    padding:2% 3%;
  }
  .Custom{
    width:98%;
    margin-top:5px;
    padding-left:5px;
    border:1px solid #eee;
    outline:none;
    line-height:40px;
  }
  .download{
    padding:5px 10px;
    border-top:1px solid #eee;
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
