<template>
  <div id="#sendDetail">
    <mt-header fixed title="机关发文">
      <router-link to="/send-list" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <router-link to="" slot="right">
        <mt-button @click="modify" >{{edit}}</mt-button>
      </router-link>
    </mt-header>
    <div class="content-wrap">
      <mt-field label="盟厦号：" placeholder="请输入盟夏号" v-model="list[0].documentnumber" :disabled="disabled"></mt-field>
      <mt-field label="缓急：" placeholder="请输入缓急程度" v-model="list[0].urgency" :disabled="disabled"></mt-field>
      <mt-field label="发至级限：" placeholder="请输入发至级限" v-model="list[0].limit" :disabled="disabled"></mt-field>
      <mt-field label="内容描述：" placeholder="请输入内容描述" type="textarea" rows="4" v-model="list[0].content" :disabled="disabled"></mt-field>
      <div class="inputPicker">
        <span>日期:</span>
        <input type="text" readonly="" placeholder="请输入日期" @click='openPicker(1)' v-model='list[0].documentdate' :disabled="disabled">
      </div>
      <mt-field label="密级：" placeholder="请输入密级" v-model="list[0].security" :disabled="disabled"></mt-field>
      <mt-field label="保密期限：" placeholder="请输入保密期限" v-model="list[0].deadline" :disabled="disabled"></mt-field>
      <mt-field label="定密依据：" placeholder="请输入定密依据" v-model="list[0].according" :disabled="disabled"></mt-field>
      <div class="inputPicker">
        <span>校对:</span>
        <input type="text" readonly="" placeholder="请输入校对日期" @click='openPicker(2)' v-model='list[0].proofdate' :disabled="disabled">
      </div>
      <div class="inputPicker">
        <span>打字:</span>
        <input type="text" readonly="" placeholder="请输入打字日期" @click='openPicker(3)' v-model='list[0].typedate' :disabled="disabled">
      </div>
      <mt-field label="存档份数：" placeholder="请输入存档份数" v-model="list[0].filenumber" :disabled="disabled"></mt-field>
      <mt-field label="共印份数：" placeholder="请输入共印份数" v-model="list[0].printednumber" :disabled="disabled"></mt-field>
      <mt-field label="标题：" placeholder="请输入标题" v-model="list[0].title" :disabled="disabled"></mt-field>
      <mt-field label="主送：" placeholder="请输入主送" v-model="list[0].mainsending" :disabled="disabled"></mt-field>
      <mt-field label="主送份数：" placeholder="请输入主送份数" v-model="list[0].mainnumber" :disabled="disabled"></mt-field>
      <mt-field label="抄送：" placeholder="请输入抄送份数" v-model="list[0].copy" :disabled="disabled"></mt-field>
      <div class="download">
        <p>附件下载:</p>
        <a v-for="(url, index) in downloadUrl" :href="'/apis/PublicInfoManage/ResourceFile/MobileDownloadFile?keyValue='+ url.FileId" :key="url.FileId">
          {{index + 1}} . {{url.FileName}}
        </a>
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
import { ajaxSendDetail, ajaxSendEdit, ajaxSendDownload } from '../../api/api.js'
export default {
  name: 'sendDetail',
  data () {
    return {
      msg: '发文详情',
      edit: '编辑',
      keyValue: '',
      pickerVisible: '',
      startDate: new Date('1970-01-01'),
      endDate: new Date('2080-12-30'),
      disabled: true,
      downloadUrl: [],
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
      _this.keyValue = _this.$route.query.keyValue
      ajaxSendDetail(_this.keyValue, function (data) {
        _this.list = data
        _this.list[0].documentdate = moment(data[0].documentdate).format('YYYY-MM-DD')
        _this.list[0].proofdate = moment(data[0].proofdate).format('YYYY-MM-DD')
        _this.list[0].typedate = moment(data[0].typedate).format('YYYY-MM-DD')
      })
      ajaxSendDownload(_this.keyValue, function (data) {
        if (data.length === 0) {
          _this.downloadUrl = [{FileName: '暂无附件可下载'}]
        } else {
          _this.downloadUrl = data
        }
      })
      // ajaxSendProcess(_this.keyValue, function (data) {
      //   console.log(data)
      // })
    },
    modify () {
      let _this = this

      if (_this.edit === '编辑') {
        _this.disabled = false
        _this.edit = '提交'
      } else {
        ajaxSendEdit(_this.keyValue, _this.list[0], function (data) {
          console.log(data)
          _this.$router.push({path: '/send-list'})
        })
        _this.disabled = true
        _this.edit = '编辑'
      }
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
    },
    handleConfirm (data) {
      let date = moment(data).format('YYYY-MM-DD')
      console.log(date)
      this.pickerVisible = date
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
    // input[type=text]:focus {
    //   border:1px solid red;
    // }
  }
  .download{
    padding:5px 10px;
    border-top:1px solid #eee;
  }
</style>
