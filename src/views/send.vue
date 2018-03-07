<template>
  <div>
      <mt-loadmore  :top-method="loadTop"
                    :bottom-method="loadBottom"
                    :bottom-all-loaded="allLoaded"
                    :auto-fill="true"
                    ref="loadmore">
        <ul>
          <router-link tag="li" :to="{name:'noticeDetail', params:{keyValue:item.NewsId}}" v-for="(item, index) in list" v-bind:key="index">
            <div class="noticewrap">
              <div>
                <div class="title">{{item.FullHead}}</div>
                <div>{{item.NewsContent}}</div>
              </div>
              <div>{{item.ReleaseTime}}</div>
            </div>
          </router-link>
        </ul>
      </mt-loadmore>
  </div>
</template>

<script>
import axios from 'axios'
import { Indicator } from 'mint-ui'
export default {
  name: 'addressList',
  data () {
    return {
      msg: '通讯录',
      list: [],
      keyValue: '',
      allLoaded: false,
      pageNum: 1
    }
  },
  created: function () {
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      var _this = this
      axios.get('/PublicInfoManage/Notice/GetPageListJson?rows=9&page=' + _this.pageNum + '&sidx=CreateDate&sord=desc', {}).then((response) => {
        console.log('信息列表请求成功')
        _this.list = response.data.rows
      }).catch((response) => {
        Indicator.close()
        console.log('信息列表请求失败')
      })
    },
    loadTop () {
      // 刷新数据
      this.pageNum = 1
      this.init()
      this.$refs.loadmore.onTopLoaded()
    },
    loadBottom () {
      console.log(this.list.length)
    }
  }
}
</script>
<style>
  .mint-cell-allow-right::after{
    width: 12px;
    height: 12px;
  }
</style>
<style scoped>
  .noticewrap{
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    color: #8f8f94;
    line-height:50px;
    border-bottom: 1px solid #f5f5f5;
  }
  .title{
    font-size: 18px;
    color:#333;
  }
</style>
