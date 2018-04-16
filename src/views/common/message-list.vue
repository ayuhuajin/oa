<template>
  <div>
    <mt-header fixed title="短信群发">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <router-link to="/message" slot="right">
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
          <router-link tag="li" :to="{name:'messageDetail', params:{keyValue:item.SmsId}}" v-for="(item, index) in list" v-bind:key="index">
            <div class="wrap">
              <div>
                <div class="title">{{item.SmsContent}}</div>
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
import { ajaxMessageList } from '../../api/api.js'
export default {
  name: 'messageList',
  data () {
    return {
      msg: '通知公告列表',
      params: {
        page: 1,
        rows: 10,
        sidx: 'CreateDate',
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
    const _this = this

    ajaxMessageList(this.params, function (data) {
      console.log(data)
      _this.list = _this.list.concat(data.rows)
    })
  },
  methods: {
    loadTop () {
      // 刷新数据
      const _this = this
      _this.params.page = 1

      ajaxMessageList(_this.params, function (data) {
        console.log(data)
        _this.list = data.rows
      })
      this.$refs.loadmore.onTopLoaded()
    },
    loadBottom () {
      const _this = this
      setTimeout(() => {
        _this.params.page = _this.params.page + 1
        ajaxMessageList(_this.params, function (data) {
          console.log(data)
          _this.list = _this.list.concat(data.rows)
        })
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
