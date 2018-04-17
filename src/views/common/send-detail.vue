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
      <mt-field label="盟厦号" placeholder="请输入盟夏号" v-model="list[0].activityname"></mt-field>
      <mt-field label="盟厦号" placeholder="请输入盟夏号" v-model="list[0].activityname"></mt-field>
      <mt-field label="盟厦号" placeholder="请输入盟夏号" v-model="list[0].activityname"></mt-field>
      <mt-field label="盟厦号" placeholder="请输入盟夏号" v-model="list[0].activityname"></mt-field>
      <mt-field label="盟厦号" placeholder="请输入盟夏号" v-model="list[0].activityname"></mt-field>
      <mt-field label="盟厦号" placeholder="请输入盟夏号" v-model="list[0].activityname"></mt-field>
      <mt-field label="盟厦号" placeholder="请输入盟夏号" v-model="list[0].activityname"></mt-field>
    </div>
  </div>
</template>

<script>
import { ajaxSendDetail } from '../../api/api.js'
export default {
  name: 'sendDetail',
  data () {
    return {
      msg: '发文详情',
      keyValue: '',
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
    }
  }
}
</script>

<style lang="scss" scoped>
  .content-wrap {
    padding-top:40px;
  }
</style>
