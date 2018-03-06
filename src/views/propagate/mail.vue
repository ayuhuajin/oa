<template>
  <div>
      <mt-header fixed title="盟讯邮寄列表">
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
                <div class="title"  @click="toggle(index)">{{item.UserName}}
                  <img class="angle" v-bind:class="{'togglec':togglec}" src="../../assets/images/angle.png">
                </div>
                <div>
                  <div>{{item.Mobile}}</div>
                  <div>{{item.DepartmentName}}</div>
                </div>
              </div>
            </div>
          </li>
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
      phone: '暂无',
      list: '',
      keyValue: '',
      allLoaded: false,
      limit: 30,
      togglec: true
    }
  },
  created: function () {
    var _this = this
    var userid = localStorage.getItem('userid')
    axios.get('/BaseManage/User/MobileEmailUserList?UserId=' + userid + '', {}).then((response) => {
      console.log('信息列表请求成功')
      _this.list = response.data
    }).catch((response) => {
      Indicator.close()
      console.log('信息列表请求失败')
    })
  },
  methods: {
    toggle: function (index) {
      this.togglec = !this.togglec
    },
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
  .angle{
  transform: rotate(90deg);
  width: 7px;
  height: 18px;
}
.togglec{
  transform: rotate(-90deg);
}
</style>
