<template>
  <div>
    <mt-header fixed title="机关发文">
      <router-link to="/send-list" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <router-link to="" slot="right">
        <mt-button >修改</mt-button>
      </router-link>
    </mt-header>
    <div class="content-wrap">
      <mt-field label="盟厦号：" placeholder="请输入盟夏号" v-model="list[0].activityname"></mt-field>
      <mt-field label="缓急：" placeholder="请输入缓急程度" v-model="list[0].activityname"></mt-field>
      <mt-field label="发至级限：" placeholder="请输入发至级限" v-model="list[0].activityname"></mt-field>
      <mt-field label="内容描述：" placeholder="请输入内容描述" type="textarea" rows="4" v-model="introduction"></mt-field>
      <input id='start' type="text" class='form-control input-sm' readonly="" name='start' @click='openPicker()' v-model='pickerVisible'>
      <mt-datetime-picker
        v-model="pickerVisible"
        type="date"
        ref="picker"
        year-format="{value} 年"
        month-format="{value} 月"
        date-format="{value} 日"
        @confirm="handleConfirm"
        :startDate = 'startDate'
        :endDate = 'endDate'
        >
      </mt-datetime-picker>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { ajaxSendDetail } from '../../api/api.js'
export default {
  name: 'sendDetail',
  data () {
    return {
      msg: '发文详情',
      keyValue: '',
      introduction: '',
      pickerVisible: '',
      startDate: new Date(),
      endDate: new Date(),
      list: {}
    }
  },
  mounted: function () {
    let _this = this

    _this.init()
  },
  methods: {
    init: function () {
      let _this = this

      _this.keyValue = _this.$route.query.keyValue
      ajaxSendDetail(_this.keyValue, function (data) {
        _this.list = data
      })
    },
    openPicker () {
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

<style lang="scss" scoped>
  .content-wrap {
    padding-top:40px;
  }
</style>
