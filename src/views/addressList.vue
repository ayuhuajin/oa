<template>
  <div>
      <mt-header fixed title="通讯录">
        <router-link to="/" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
        <router-link to="/message" slot="right">
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
          <li v-for="(item, index) in list" v-bind:key="item.id" v-if="index < limit">
            <mt-cell v-bind:index="index" v-bind:title="item.UserName">{{index}}</mt-cell>
          </li>
        </ul>
      </mt-loadmore>
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
      console.log('信息列表请求成功')
      _this.list = response.data
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
