<template>
  <div id="#sendDetail">
    <mt-header fixed title="审批">
      <router-link to="/send-list" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <router-link to="" slot="right">
        <mt-button @click="approve" >{{edit}}</mt-button>
      </router-link>
    </mt-header>
    <div class="content-wrap">
      <mt-field label="盟厦号：" placeholder="请输入盟夏号" v-model="list[0].documentnumber" :disabled="disabled"></mt-field>
      <mt-field label="缓急：" placeholder="请输入缓急程度" v-model="list[0].urgency" :disabled="disabled"></mt-field>
      <mt-field label="发至级限：" placeholder="请输入发至级限" v-model="list[0].limit" :disabled="disabled"></mt-field>
      <mt-field label="内容描述：" placeholder="请输入内容描述" type="textarea" rows="4" v-model="list[0].content" :disabled="disabled"></mt-field>
      <div class="inputPicker">
        <span>日期:</span>
        <input type="text" readonly="" placeholder="请输入日期" @click='openPicker()' v-model='list[0].documentdate' :disabled="disabled">
      </div>
      <mt-field label="密级：" placeholder="请输入密级" v-model="list[0].security" :disabled="disabled"></mt-field>
      <mt-field label="保密期限：" placeholder="请输入保密期限" v-model="list[0].deadline" :disabled="disabled"></mt-field>
      <mt-field label="定密依据：" placeholder="请输入定密依据" v-model="list[0].according" :disabled="disabled"></mt-field>
      <div class="inputPicker">
        <span>校对:</span>
        <input type="text" readonly="" placeholder="请输入校对日期" @click='openPicker()' v-model='list[0].proofdate' :disabled="disabled">
      </div>
      <div class="inputPicker">
        <span>打字:</span>
        <input type="text" readonly="" placeholder="请输入打字日期" @click='openPicker()' v-model='list[0].typedate' :disabled="disabled">
      </div>
      <mt-field label="存档份数：" placeholder="请输入存档份数" v-model="list[0].filenumber" :disabled="disabled"></mt-field>
      <mt-field label="共印份数：" placeholder="请输入共印份数" v-model="list[0].printednumber" :disabled="disabled"></mt-field>
      <mt-field label="标题：" placeholder="请输入标题" v-model="list[0].title" :disabled="disabled"></mt-field>
      <mt-field label="主送：" placeholder="请输入主送" v-model="list[0].mainsending" :disabled="disabled"></mt-field>
      <mt-field label="主送份数：" placeholder="请输入主送份数" v-model="list[0].mainnumber" :disabled="disabled"></mt-field>
      <mt-field label="抄送：" placeholder="请输入抄送份数" v-model="list[0].copy" :disabled="disabled"></mt-field>
    </div>
    <div class="download">
      <p>附件下载:</p>
      <a v-for="(url, index) in downloadUrl" :href="'/apis/PublicInfoManage/ResourceFile/MobileDownloadFile?keyValue='+ url.FileId" :key="url.FileId">
        {{index + 1}} . {{url.FileName}}
      </a>
    </div>
    <mt-button size="small" type="primary" @click="sign(1)">签批</mt-button>
    <mt-button size="small" type="danger"  @click="sign(2)">不同意</mt-button>
    <mt-button size="small" type="default"  @click="sign(3)">驳回</mt-button>

    <!-- 签名组件 -->
    <vueSignature ref="signature" :sigOption="option" :w="'100%'" :h="'200px'"></vueSignature>
    <img v-bind:src="png">
    <button @click="save">签名</button>
    <button @click="clear">清除</button>
    <button @click="uploadSignature">上传签名</button>
  </div>
</template>

<script>
import moment from 'moment'
import { ajaxApprovedDetail, ajaxSendDownload, ajaxApporvedUpload } from '../../api/api.js'
export default {
  name: 'sendDetail',
  data () {
    return {
      msg: '发文详情',
      edit: '签批',
      keyValue: '',
      pickerVisible: '',
      startDate: new Date('1970-01-01'),
      endDate: new Date('2080-12-30'),
      disabled: true,
      downloadUrl: [],
      approvedType: '',
      png: '',
      option: {
        penColor: 'rgb(0, 0, 0)'
      },
      verificationData: '',
      Createusername: '',
      Description: '55',
      processid: '',
      VerificationUser: '',
      NodeRejectStep: '',
      suggest: '11',
      VerificationFinally: '',
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

      _this.list[0].documentdate = moment(data).format('YYYY-MM-DD')
    }
  },
  methods: {
    init: function () {
      let _this = this

      _this.pickerVisible = moment(new Date()).format('YYYY-MM-DD')
      _this.keyValue = _this.$route.query.keyValue
      _this.VerificationUser = localStorage.getItem('username')

      ajaxApprovedDetail(_this.keyValue, function (data) {
        _this.list = data
        _this.Createusername = data[0].createusername
        _this.Description = data[0].description
        _this.processid = data[0].processid
      })
      ajaxSendDownload(_this.keyValue, function (data) {
        if (data.length === 0) {
          _this.downloadUrl = [{FileName: '暂无附件可下载'}]
        } else {
          _this.downloadUrl = data
        }
      })
    },
    sign: function (index) {
      let _this = this

      _this.VerificationFinally = index
    },
    approve: function () {
      let _this = this
      _this.verificationData = JSON.stringify({
        'Createusername': '' + _this.Createusername + '',
        'Description': '' + _this.Description + '',
        'VerificationUser': '' + _this.VerificationUser + '',
        'NodeRejectStep': '',
        'VerificationOpinion': '' + _this.suggest + '',
        'VerificationFinally': '' + _this.VerificationFinally + ''
      })

      _this.png = btoa('' + _this.png + '')
      ajaxApporvedUpload(_this.keyValue, _this.processid, _this.verificationData, _this.png, function (data) {
        console.log(data)
      })
    },
    // base64 上传组件
    save () {
      var _this = this
      setTimeout(function () {
        console.log('878978978')
        _this.png = _this.$refs.signature.save()
      }, 30)
      // var jpeg = _this.$refs.signature.save('image/jpeg')
      // var svg = _this.$refs.signature.save('image/svg+xml');
      // console.log(jpeg)
      // console.log(svg)
    },
    clear () {
      var _this = this
      _this.$refs.signature.clear()
    },
    uploadSignature () {
      let _this = this

      _this.png = btoa('' + _this.png + '')
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
  .download{
    padding:5px 10px;
    border-top:1px solid #eee;
  }
</style>
