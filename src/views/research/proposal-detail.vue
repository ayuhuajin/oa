<template>
  <div>
    <mt-header fixed title="提案工作">
      <router-link to="/proposal-list" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <router-link to="" slot="right">
        <mt-button @click="modify" >{{edit}}</mt-button>
      </router-link>
    </mt-header>
    <div class="content-wrap">
      <mt-field label="主题：" placeholder="请输入主题" v-model="list.Theme" :disabled="disabled"></mt-field>
      <mt-field label="内容描述：" placeholder="请输入内容描述" type="textarea" rows="4" v-model="list.Description" :disabled="disabled"></mt-field>
      <div class="inputPicker">
        <span>截止时间:</span>
        <input type="text" readonly="" placeholder="请输入截止时间" @click='openPicker(1)' v-model='list.ClosingDate' :disabled="disabled">
      </div>
      <div class="inputPicker">
        <span>创建时间:</span>
        <input type="text" readonly="" placeholder="请输入创建时间" @click='openPicker(2)' v-model='list.CreateDate' :disabled="disabled">
      </div>
      <div class="download">
        <p>附件下载:</p>
        <a v-for="(url, index) in downloadUrl" :href="'/apis/PublicInfoManage/ResourceFile/MobileDownloadFile?keyValue='+ url.FileId" :key="url.FileId">
          {{index + 1}} . {{url.FileName}}
        </a>
      </div>
      <div class="download">
        <p>回复列表:</p>
        <a v-for="(replayurl, index) in replayList" :href="'/apis/PublicInfoManage/ResourceFile/MobileDownloadFile?keyValue='+ replayurl.FileId" :key="replayurl.index">
          {{index + 1}} . {{replayurl.FileName}}
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
  </div>
</template>

<script>
import moment from 'moment'
import {ajaxProposalDetail, ajaxProposalEdit, ajaxProposalDownload, ajaxProposalReplayUpload, ajaxProposalReplayListDownload, ajaxProposalReplayDownloadListShow} from '../../api/api.js'
export default {
  name: 'proposalDetail',
  data () {
    return {
      msg: '提案工作详情',
      edit: '编辑',
      disabled: true,
      downloadUrl: [],
      replayList: [],
      fileList: [],
      keyValue: '',
      Enclosure: '',
      chooseDate: '',
      pickerVisible: '',
      startDate: new Date('1970-01-01'),
      endDate: new Date('2080-12-30'),
      list: {
        keyValue: '',
        Theme: '',
        Description: '',
        ClosingDate: '',
        CreateDate: '',
        Enclosure: '',
        ProposalId: ''
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

      _this.list[_this.chooseDate] = moment(data).format('YYYY-MM-DD')
    }
  },
  methods: {
    init: function () {
      let _this = this
      _this.pickerVisible = moment(new Date()).format('YYYY-MM-DD')
      _this.keyValue = _this.$route.query.keyValue
      ajaxProposalDetail(_this.keyValue, function (data) {
        _this.list = data
        _this.list.ClosingDate = moment(_this.list.ClosingDate).format('YYYY-MM-DD')
        _this.list.CreateDate = moment(_this.list.CreateDate).format('YYYY-MM-DD')
        _this.getProposalDownload()
        _this.getProposalReplayListDownload()
      })
    },
    modify: function () {
      let _this = this

      if (_this.edit === '编辑') {
        _this.disabled = false
        _this.edit = '提交'
      } else {
        ajaxProposalEdit(_this.keyValue, _this.list, function (data) {
          console.log(data)
          _this.$router.push({path: '/proposal-list'})
        })
        _this.disabled = true
        _this.edit = '编辑'
      }
    },
    getProposalReplayListDownload: function () {
      let _this = this
      let ProposalId = ''
      let cUserId = ''
      if (_this.list.ParentId === null) {
        ProposalId = _this.list.ProposalId
      } else {
        ProposalId = _this.list.ParentId
      }
      let userid = localStorage.getItem('userid')
      if (userid === _this.list.CreateUserId) {
        cUserId = ''
      } else {
        cUserId = userid
      }
      let queryJson = JSON.stringify({'UserId': cUserId, 'ProposalId': ProposalId})
      ajaxProposalReplayListDownload(_this.list, queryJson, function (data) {
        for (let i = 0; i < data.rows.length; i++) {
          if (data.rows[i].Enclosure) {
            if (i < data.rows.length - 1) {
              _this.Enclosure += data.rows[i].Enclosure
            } else {
              _this.Enclosure += data.rows[i].Enclosure
            }
          }
        }
        _this.Enclosure = _this.Enclosure.substring(0, _this.Enclosure.length - 1)
        ajaxProposalReplayDownloadListShow(_this.Enclosure, function (data) {
          console.log('---_this.Enclosure--')
          _this.replayList = data
          console.log(data)
        })
      })
    },
    getProposalDownload: function () {
      let _this = this
      ajaxProposalDownload(_this.list.Enclosure, function (data) {
        if (data.length === 0) {
          _this.downloadUrl = [{FileName: '暂无附件可下载'}]
        } else {
          _this.downloadUrl = data
        }
      })
    },
    openPicker (data) {
      // 根据data 判断打开哪个picker
      if (data === 1) {
        this.chooseDate = 'ClosingDate'
      } else if (data === 2) {
        this.chooseDate = 'CreateDate'
      }
      this.$refs.picker.open()
    },
    uploadstart: function () {
      let _this = this
      ajaxProposalReplayUpload(_this.list.ProposalId, _this.Enclosure, function () {
        console.log('上传保存')
      })
    },
    handleConfirm: function (data) {
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
      // for (var i = 0; i < fileList.length; i++) {
      //   if (i < fileList.length - 1) {
      //     _this.Enclosure = _this.Enclosure + response.fileid + ','
      //   } else {
      //     _this.Enclosure = _this.Enclosure + response.fileid
      //   }
      // }
      _this.Enclosure = _this.Enclosure + response.fileid + ','
      _this.uploadstart()
    },
    handlePreview (file) {
      console.log(file)
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
  .download a {
    display: block;
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
