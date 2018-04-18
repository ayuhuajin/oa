<template>
  <div class="send">
    <mt-header fixed title="机关发文">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <router-link to="/send" slot="right">
        <mt-button >新增</mt-button>
      </router-link>
    </mt-header>
    <div class="nav">
      <router-link class="green" tag="a" to="/send-list">机关发文</router-link>
      <router-link tag="a" to="/approved-list">审批</router-link>
    </div>
    <div style="height:100vh;overflow: scroll;">
      <mt-loadmore  :top-method="loadTop"
                    :bottom-method="loadBottom"
                    :bottom-all-loaded="allLoaded"
                    :auto-fill="false"
                    ref="loadmore">
        <ul>
          <router-link tag="li" :to="{name:'sendDetail', query:{keyValue:item.DocumentId}}" v-for="(item, index) in list" v-bind:key="index">
            <div class="wrap">
              <div>
                <div class="title">{{item.Title}}</div>
                <div>拟稿人: {{item.CreateUserName}}</div>
                <div>{{item.Content}}</div>
              </div>
              <div>{{item.CreateDate}}</div>
            </div>
          </router-link>
        </ul>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>
import { ajaxSendList } from '../../api/api.js'
export default {
  name: 'sendList',
  data () {
    return {
      msg: '发文列表',
      params: {
        page: 1,
        rows: 10,
        sidx: 'DocumentId',
        sord: 'desc',
        queryJson: {}
      },
      list: [],
      keyValue: '',
      allLoaded: false,
      pageNum: 1
    }
  },
  created: function () {
  },
  mounted () {
    // this.init()
    const _this = this

    ajaxSendList(this.params, function (data) {
      console.log(data)
      _this.list = _this.list.concat(data.rows)
    })
  },
  methods: {
    loadTop () {
      const _this = this
      _this.params.page = 1

      ajaxSendList(_this.params, function (data) {
        console.log(data)
        _this.list = data.rows
      })
      this.$refs.loadmore.onTopLoaded()
    },
    loadBottom () {
      const _this = this
      setTimeout(() => {
        _this.params.page = _this.params.page + 1
        ajaxSendList(_this.params, function (data) {
          console.log(data)
          _this.list = _this.list.concat(data.rows)
        })
        _this.$refs.loadmore.onBottomLoaded()
      }, 1000)
    }
  }
}
</script>

<style lang="scss">
  .send{
    .mint-loadmore-content{
      padding-top: 80px;
    }
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
