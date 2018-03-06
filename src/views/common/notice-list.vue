<template>
  <div>
      <mt-header fixed title="通知公告">
        <router-link to="/" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
        <router-link to="/notice" slot="right">
          <mt-button >创建</mt-button>
        </router-link>
      </mt-header>
      <mt-loadmore  v-infinite-scroll="loadMore"
                    infinite-scroll-disabled="loading"
                    infinite-scroll-distance="9"
                    :top-method="loadTop"
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
      list: '',
      keyValue: '',
      allLoaded: false,
      limit: 30
    }
  },
  created: function () {
    var _this = this
    var pageNum = 1
    axios.get('/PublicInfoManage/Notice/GetPageListJson?rows=30&page=' + pageNum + '&sidx=CreateDate&sord=desc', {}).then((response) => {
      console.log('信息列表请求成功')
      _this.list = response.data.rows
    }).catch((response) => {
      Indicator.close()
      console.log('信息列表请求失败')
    })
  },
  methods: {
    loadTop () {
      // 加载更多数据
      this.$refs.loadmore.onTopLoaded()
    },
    loadBottom () {
      this.limit = this.limit + 30
      // 加载更多数据
      console.log(this.$refs)
      if (this.limit > (this.list.length - 1)) {
        this.allLoaded = true // 若数据已全部获取完毕
        this.$refs.loadmore.onBottomLoaded()
      }
      this.$refs.loadmore.onBottomLoaded()
    },
    loadMore () {
      this.loading = true
      setTimeout(() => {
        this.loadBottom()
        this.loading = false
      }, 30)
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
  ul{
    padding:40px 0 55px;
  }
  .noticewrap{
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 10px 10px;
    color: #8f8f94;
    border-bottom: 1px solid #f5f5f5;
  }
  .title{
    font-size: 18px;
    color:#333;
  }
</style>
