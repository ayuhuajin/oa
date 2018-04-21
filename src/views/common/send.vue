<template>
  <div id="#sendDetail">
    <mt-header fixed title="机关发文">
      <router-link to="/send-list" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <router-link to="" slot="right">
        <mt-button @click="sendAdd">{{add}}</mt-button>
      </router-link>
    </mt-header>
    <div class="content-wrap">
      <mt-field label="盟厦号：" placeholder="请输入盟夏号" v-model="list[0].documentnumber"></mt-field>
      <mt-field label="缓急：" placeholder="请输入缓急程度" v-model="list[0].urgency"></mt-field>
      <mt-field label="发至级限：" placeholder="请输入发至级限" v-model="list[0].limit"></mt-field>
      <mt-field label="内容描述：" placeholder="请输入内容描述" type="textarea" rows="4" v-model="list[0].content"></mt-field>
      <div class="inputPicker">
        <span>日期:</span>
        <input type="text" readonly="" placeholder="请输入日期" @click='openPicker(1)' v-model='list[0].documentdate'>
      </div>
      <mt-field label="密级：" placeholder="请输入密级" v-model="list[0].security"></mt-field>
      <mt-field label="保密期限：" placeholder="请输入保密期限" v-model="list[0].deadline"></mt-field>
      <mt-field label="定密依据：" placeholder="请输入定密依据" v-model="list[0].according"></mt-field>
      <div class="inputPicker">
        <span>校对:</span>
        <input type="text" readonly="" placeholder="请输入校对日期" @click='openPicker(2)' v-model='list[0].proofdate'>
      </div>
      <div class="inputPicker">
        <span>打字:</span>
        <input type="text" readonly="" placeholder="请输入打字日期" @click='openPicker(3)' v-model='list[0].typedate'>
      </div>
      <mt-field label="存档份数：" placeholder="请输入存档份数" v-model="list[0].filenumber"></mt-field>
      <mt-field label="共印份数：" placeholder="请输入共印份数" v-model="list[0].printednumber"></mt-field>
      <mt-field label="标题：" placeholder="请输入标题" v-model="list[0].title"></mt-field>
      <mt-field label="主送：" placeholder="请输入主送" v-model="list[0].mainsending"></mt-field>
      <mt-field label="主送份数：" placeholder="请输入主送份数" v-model="list[0].mainnumber"></mt-field>
      <mt-field label="抄送：" placeholder="请输入抄送份数" v-model="list[0].copy"></mt-field>
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
      <div class="upload">
        <el-upload
          class="upload-demo"
          ref="upload"
          :auto-upload="false"
          :file-list="fileList"
          action="apis/PublicInfoManage/ResourceFile/MobileUploadifyFile/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
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
import moment from 'moment'
import { ajaxSendAdd } from '../../api/api.js'
export default {
  name: 'sendDetail',
  data () {
    return {
      msg: '发文详情',
      add: '创建',
      keyValue: '',
      pickerVisible: '',
      startDate: new Date('1970-01-01'),
      endDate: new Date('2080-12-30'),
      disabled: true,
      FileIds: '',
      fileList: [],
      chooseDate: '',
      list: [{
        documentnumber: '',
        urgency: '',
        limit: '',
        content: '',
        documentdate: '',
        security: '',
        deadline: '',
        according: '',
        proofdate: '',
        typedate: '',
        filenumber: '',
        printednumber: '',
        title: '',
        mainsending: '',
        mainnumber: '',
        copy: ''
      }]
    }
  },
  mounted: function () {
    let _this = this

    _this.init()
  },
  watch: {
    pickerVisible: function (data) {
      let _this = this

      _this.list[0][_this.chooseDate] = moment(data).format('YYYY-MM-DD')
    }
  },
  methods: {
    init: function () {
      let _this = this

      _this.pickerVisible = moment(new Date()).format('YYYY-MM-DD')
      console.log(_this.pickerVisible)
      _this.list[0].documentdate = _this.pickerVisible
      _this.list[0].proofdate = _this.pickerVisible
      _this.list[0].typedate = _this.pickerVisible
    },
    sendAdd () {
      let _this = this

      ajaxSendAdd(_this.keyValue, _this.list[0], function (data) {
        _this.$router.push({path: '/send-list'})
      })
    },
    openPicker (data) {
      if (data === 1) {
        this.chooseDate = 'documentdate'
      } else if (data === 2) {
        this.chooseDate = 'proofdate'
      } else {
        this.chooseDate = 'typedate'
      }
      this.$refs.picker.open()
      console.log(this.chooseDate)
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
<style lang="scss">
  .mint-field-core{
    background: white;
  }
  .upload-demo{
    border-top:1px solid #eee;
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
    // input[type=text]:focus {
    //   border:1px solid red;
    // }
  }
</style>
