<template>
  <div>
      <mt-header fixed title="盟讯邮寄列表">
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
          <li v-for="(item, index) in filerlist" @click="toggle(index)" v-bind:key="item.id" v-if="index < limit">
            <div class="wrap">
              <div class="wrap-inner">
                <div class="title">
                  <span>{{item.UserName}}</span>
                  <img class="angle" v-bind:class="{'toggle-angle':item.iconClass}" src="../../assets/images/angle.png">
                </div>
                <div class="info" v-if="item.iconClass">
                  <div>名字 : {{(item.UserName == null) ? '暂无' :item.UserName}}</div>
                  <div>部门 : {{(item.DepartmentName == null ? '暂无' :item.DepartmentName)}}</div>
                  <div>电话 : {{(item.Mobile == null ? '暂无' :item.Mobile)}}</div>
                  <div>邮编 : {{(item.Postcode == null ? '暂无' :item.Postcode)}}</div>
                  <div>地址 : {{(item.Address == null ? '暂无' :item.Address)}}</div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </mt-loadmore>
  </div>
</template>

<script>
import { ajaxMailList } from '../../api/api.js'
export default {
  name: 'addressList',
  data () {
    return {
      phone: '暂无',
      searchString: '',
      list: {},
      keyValue: '',
      allLoaded: false,
      limit: 30,
      userid: '',
      arr: ''
    }
  },
  created: function () {
  },
  computed: {
    filerlist: function () {
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
  mounted: function () {
    let _this = this
    _this.userid = localStorage.getItem('userid')
    // axios.get('/BaseManage/User/MobileEmailUserList?UserId=' + _this.userid + '', {}).then((response) => {
    //   console.log('信息列表请求成功')
    //   _this.list = this.geList(response.data)
    // }).catch((response) => {
    //   Indicator.close()
    //   console.log('信息列表请求失败')
    // })

    ajaxMailList(_this.userid, function (data) {
      console.log(data)
      _this.list = _this.geList(data)
    })
  },
  methods: {
    geList (data) {
      var mapLIst = data.map(function (item) {
        item.iconClass = false
        return item
      })
      console.log(mapLIst)
      return mapLIst
    },
    toggle: function (index) {
      console.log(this.arr[index].iconClass)
      // this.list[index].iconClass = !this.list[index].iconClass
      this.$set(this.arr[index], 'iconClass', !(this.arr[index].iconClass))
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
    padding:10px 0 55px;
  }
  .wrap{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  color: #8f8f94;
  border-bottom: 1px solid #f5f5f5;
  }
  .title{
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    color:#333;
  }
  .wrap-inner{
    width: 100%;
  }
  .info div{
    line-height: 20px;
    font-size: 14px;
  }
  .angle{
  transform: rotate(90deg);
  width: 7px;
  height: 18px;
  }
  .toggle-angle{
    transform: rotate(-90deg);
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
