<template>
  <div>
      <mt-header fixed title="盟员信息管理">
        <router-link to="/" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
      </mt-header>
      <div>
        <input type="text" class="search" v-model="searchString" placeholder="请输入姓名进行搜索" style="margin-top:60px;"/>
      </div>
      <mt-loadmore  v-infinite-scroll="loadMore"
                    infinite-scroll-disabled="loading"
                    infinite-scroll-distance="9"
                    :top-method="loadTop"
                    :bottom-method="loadBottom"
                    :bottom-all-loaded="allLoaded"
                    :auto-fill="true"
                    ref="loadmore">
        <ul>
          <router-link tag="li" :to="{name: 'allyDetail',params:{keyValue:item.UserID}}" v-for="(item, index) in filterlist" v-bind:key="item.id" v-if="index < limit">
            <!-- <mt-cell v-bind:index="index" v-bind:title="item.UserName">{{index}}</mt-cell> -->
            <div class="wrap">
              <div>
                <div class="title">{{item.UserName}}</div>
                <div v-if="item.Mobile">{{item.Mobile}}</div>
                <div v-else>{{phone}}</div>
                <!-- <p v-if="">
                  <span style="color: green">{{item.Mobile}}</span>
                </p>
                <div>{{(item.Mobile == null) ? (item.Mobile) : msg }}</div> -->
              </div>
              <div>{{item.DepartmentName}}</div>
            </div>
          </router-link>
        </ul>
      </mt-loadmore>
  </div>
</template>

<script>
import { ajaxAllyInfoManage } from '../../api/api.js'
export default {
  data () {
    return {
      phone: '暂无',
      searchString: '',
      list: '',
      keyValue: '',
      allLoaded: false,
      limit: 30
    }
  },
  created: function () {
    const _this = this

    ajaxAllyInfoManage(function (data) {
      console.log(data)
      _this.list = data
    })
  },
  computed: {
    filterlist: function () {
      let _this = this
      let filterArray = _this.list
      let searchString = _this.searchString

      if (!searchString) {
        _this.arr = filterArray
        return filterArray
      }
      searchString = searchString.trim()

      filterArray = filterArray.filter(function (item) {
        if (item.UserName.indexOf(searchString) !== -1) {
          return item
        }
      })
      _this.arr = filterArray
      return filterArray
    }
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  ul{
    padding:10px 0 55px;
  }
  .wrap{
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 10px 15px;
  color: #8f8f94;
  border-bottom: 1px solid #f5f5f5;
  }
  .title{
    font-size: 16px;
    color:#333;
  }
  .search{
    width: 90%;
    margin-left: 5%;
    margin-top: 15px;
    margin-bottom: 10px;
    padding-left: 10px;
    border: 1px solid #eee;
    border-radius: 5px;
    line-height: 35px;
  }
</style>
