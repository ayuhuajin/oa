<template>
  <div>
      <mt-header fixed title="信息列表">
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
            <mt-cell v-bind:index="index" v-bind:title="item.SmsContent">{{index}}</mt-cell>
          </li>
        </ul>
      </mt-loadmore>
  </div>
</template>

<script>
// import { Loadmore } from 'mint-ui'
import axios from 'axios'
// Vue.component(Loadmore.name, Loadmore)
export default {
  data () {
    return {
      msg: 'hello',
      list: '',
      keyValue: '',
      allLoaded: false,
      limit: 5
    }
  },
  created: function () {
    var _this = this
    this.keyValue = localStorage.getItem('username')
    axios.get('/apis/BaseManage/User/MobileGetFormJson?keyValue=' + this.keyValue + '', {}).then((response) => {
      console.log('授权信息请求成功')
    }).catch((response) => {
      console.log('授权信息请求失败')
    })
    axios.get('/apis/PublicInfoManage/Sms/MobileGetPageListJson?rows=30&page=1&sidx=CreateDate&sord=desc', {}).then((response) => {
      console.log('信息列表请求成功')
      _this.list = response.data.rows
    }).catch((response) => {
      console.log('信息列表请求失败')
    })
  },
  methods: {
    loadTop () {
      // 加载更多数据
      this.$refs.loadmore.onTopLoaded()
    },
    loadBottom () {
      this.limit = this.limit + 2
      // 加载更多数据
      console.log(this.$refs)
      if (this.limit > (this.list.length - 1)) {
        this.allLoaded = true // 若数据已全部获取完毕
        this.$refs.loadmore.onBottomLoaded()
      }
    },
    loadMore () {
      this.loading = true
      setTimeout(() => {
        let last = this.list[this.list.length - 1]
        for (let i = 1; i <= 10; i++) {
          this.list.push(last + i)
          console.log(1111)
        }
        this.loading = false
      }, 300)
    }
  }
}
</script>
<style >
.mint-cell{
}
</style>
