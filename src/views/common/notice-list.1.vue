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
    <div style="height:100vh;overflow: scroll;">
      <mt-loadmore  :top-method="loadTop"
                    :bottom-method="loadBottom"
                    :bottom-all-loaded="allLoaded"
                    :auto-fill="false"
                    ref="loadmore">
        <ul>
          <router-link tag="li" :to="{name:'noticeDetail', params:{keyValue:item.NewsId}}" v-for="(item, index) in list" v-bind:key="index">
            <div class="wrap">
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
  </div>
</template>

<script>
import axios from 'axios'
import { Indicator } from 'mint-ui'
import { ajaxNoticeList } from '../../api/api.js'
export default {
  name: 'noticeList',
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
      axios.get('/PublicInfoManage/Notice/GetPageListJson?rows=10&page=' + _this.pageNum + '&sidx=CreateDate&sord=desc', {}).then((response) => {
        console.log('信息列表请求成功')
        // _this.list = response.data.rows  // 纯分页 下拉后面没有push数据
        // 值得注意的是只有当实例被创建时 data 中存在的属性才是响应式的。
        _this.list = _this.list.concat(response.data.rows)// 添加在数据后面
        // if(response.data.rows.length < 7) {
        //   _this.allLoaded = true
        // }
      }).catch((response) => {
        Indicator.close()
        console.log('信息列表请求失败')
      })
    },
    loadTop () {
      // 刷新数据
      const _this = this
      _this.pageNum = 1
      axios.get('/PublicInfoManage/Notice/GetPageListJson?rows=10&page=' + _this.pageNum + '&sidx=CreateDate&sord=desc', {}).then((response) => {
        console.log('信息列表请求成功')
        _this.list = response.data.rows// 纯分页
      }).catch((response) => {
        Indicator.close()
        console.log('信息列表请求失败')
      })
      this.$refs.loadmore.onTopLoaded()
    },
    loadBottom () {
      console.log(this.list.length)
      var _this = this
      setTimeout(() => {
        _this.pageNum = _this.pageNum + 1
        _this.init()
        _this.$refs.loadmore.onBottomLoaded()
      }, 1000)
    }
  }
}
</script>

<style scoped>
  ul{
    padding:40px 0 0;
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
    margin-bottom: 2px;
    font-size: 18px;
    color:#333;
  }
</style>
