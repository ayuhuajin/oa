<template>
  <div>
      <mt-header fixed title="评分系统">
        <router-link to="/" slot="left">
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
          <!-- <li v-for="(item, index) in list" v-bind:key="item.id" v-if="index < limit">
            <mt-cell v-bind:index="index" v-bind:title="item.UserName">{{index}}</mt-cell>
          </li> -->
          <div class="nav">
            <router-link tag="a" to="/score-list">个人积分列表</router-link>
            <router-link class="green" tag="a" to="/organize-list">组织积分列表</router-link>
          </div>
          <div class="ranking title">
            <span>部门</span>
            <span>分数</span>
          </div>
          <router-link tag="li" to="" v-for="(item, index) in list" v-bind:key="index">
            <!-- <mt-cell v-bind:index="index" v-bind:title="item.UserName">{{index}}</mt-cell> -->
            <div class="ranking">
              <span>{{item.FullName}}</span>
              <span>{{item.Score}}</span>
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
  name: 'scoreList',
  data () {
    return {
      msg: '通讯录',
      list: [],
      keyValue: '',
      allLoaded: false,
      limit: 30
    }
  },
  created: function () {
    var _this = this
    var pageNum = 1
    axios.get('/ReservationManage/ReservationReportIntegra/GetDepartmentIntegralPageList?rows=30&page=' + pageNum + '&sidx=Score&sord=desc&queryJson={}', {}).then((response) => {
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
<style lang="scss" scoped>
  ul{
    padding:40px 0 55px;
  }
  .ranking{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    border-bottom: 1px solid #f5f5f5;
    line-height: 45px;
  }
  .title{
    color:#26a2ff;
    padding-top:40px;
  }
  .nav a {
    flex:1;
    line-height: 40px;
    border-bottom:1px solid #eee;
    text-align: center;
  }
  .nav{
    height: 40px;
    color: red;
    margin-top: 40px;
    width: 100%;
    display: flex;
    position: fixed;
    top: 0;
    z-index: 1;
    background: white;
    /* flex-direction: row; */
  }
  .green{
    color:#26a2ff;;
  }
</style>
