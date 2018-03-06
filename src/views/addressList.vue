<template>
  <div>
      <mt-header fixed title="通讯录">
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
          <li v-for="(item, index) in list" v-bind:key="item.id" v-if="index < limit">
            <!-- <mt-cell v-bind:index="index" v-bind:title="item.UserName">{{index}}</mt-cell> -->
            <div class="wrap">
              <div>
                <div class="title">{{item.UserName}}</div>
                <div v-if="item.Mobile">{{item.Mobile}}</div>
                <div v-else>{{msg}}</div>
                <!-- <p v-if="">
                  <span style="color: green">{{item.Mobile}}</span>
                </p>
                <div>{{(item.Mobile == null) ? (item.Mobile) : msg }}</div> -->
              </div>
              <div>{{item.DepartmentName}}</div>
            </div>
          </li>
        </ul>
      </mt-loadmore>
      <tab></tab>
  </div>
</template>

<script>
import tab from './tab.vue'
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
    axios.get('/BaseManage/User/UserListMobile', {}).then((response) => {
      console.log('通讯录请求成功')
      _this.list = response.data
    }).catch((response) => {
      Indicator.close()
      console.log('通讯录请求失败')
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
        // let last = this.list[this.list.length - 1]
        // for (let i = 1; i <= 10; i++) {
        //   this.list.push(this.limit + i)
        //   this.loadBottom()
        // }
        this.loadBottom()
        this.loading = false
      }, 30)
    }
  },
  components: {
    'tab': tab
  }
}
</script>

<style scoped>
  ul{
    padding:40px 0 55px;
  }
  .wrap{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px;
  color: #8f8f94;
  border-bottom: 1px solid #f5f5f5;
  }
  .title{
    font-size: 18px;
    color:#333;
  }
</style>
