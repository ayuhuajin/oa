<template>
  <div>
      <mt-header fixed title="评分系统">
        <router-link to="/score-list" slot="left">
          <mt-button icon="back">返回</mt-button>
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
          <li v-for="(item, index) in list" v-bind:key="item.id" v-if="index < limit">
            <!-- <mt-cell v-bind:index="index" v-bind:title="item.UserName">{{index}}</mt-cell> -->
            <div class="score">
              <div><span>题目：</span><span>{{item.Theme}}</span></div>
              <div><span>分数：</span><span>{{item.Score}}</span></div>
              <div><span>得分项：</span><span>{{item.UserName}}</span></div>
            </div>
          </li>
        </ul>
      </mt-loadmore>
  </div>
</template>

<script>
import axios from 'axios'
import { Indicator } from 'mint-ui'
// import qs from 'qs'
export default {
  name: 'score',
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
    // var userid = localStorage.getItem('userid')
    _this.keyValue = _this.$route.query.keyValue
    let params = {
      page: 1,
      rows: 30,
      sidx: 'Score',
      sord: 'desc',
      queryJson: {
        UserId: _this.keyValue
      }
    }
    axios.get('/ReservationManage/ReservationReportIntegra/GetMobileUserIntegralPageListJson', {
      params: params
    }).then((response) => {
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  ul{
    padding:40px 0 55px;
    background: #f5f5f5;
  }
  .score{
    margin-top:20px;
    padding:10px 15px;
    background: white;
  }
</style>
