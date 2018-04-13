<template>
  <div>
    <mt-header fixed title="审批">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <router-link to="/approved" slot="right">
        <mt-button >创建</mt-button>
      </router-link>
    </mt-header>
    <div class="nav">
      <router-link tag="a" to="/send-list">机关发文</router-link>
      <router-link class="green" tag="a" to="/approved-list">审批</router-link>
    </div>
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
                <div class="title">{{item.title}}</div>
                <div>拟稿人:{{item.createusername}}</div>
              </div>
              <div>{{item.content}}</div>
              <div>{{item.createdate}}</div>
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
      axios.get('/DocumentManage/Document/MobileToMeGetPageListJson?rows=10&page=' + _this.pageNum + '&sidx=CreateDate&sord=desc', {}).then((response) => {
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

<style>
  .mint-loadmore-content{
    padding-top: 80px;
  }
</style>

<style scoped>
  ul{
      padding:0px 0 0;
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
  .mint-navbar {
    margin-top: 40px;
    border-bottom: 1px solid #eee;
  }
  /* .nav{
    position: fixed;
    z-index: 1;
    width: 100%;
    top: 0;
    margin-top: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background: white;
  } */
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
