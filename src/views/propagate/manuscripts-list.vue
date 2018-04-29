<template>
  <div>
    <mt-header fixed title="约稿">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <router-link to="/manuscripts" slot="right">
        <mt-button >新增</mt-button>
      </router-link>
    </mt-header>

    <div style="height:100vh;overflow: scroll;">
      <mt-loadmore  :top-method="loadTop"
                    :bottom-method="loadBottom"
                    :bottom-all-loaded="allLoaded"
                    :auto-fill="false"
                    ref="loadmore">
        <ul>
          <router-link tag="li" :to="{name:'manuscriptsDetail', query:{keyValue:item.ReservationId}}" v-for="(item, index) in list" v-bind:key="index">
            <div class="wrap">
              <div>
                <div class="title">{{item.Theme}}</div>
                <div>{{item.Description}}</div>
              </div>
              <div>{{item.CreateUserName}}</div>
            </div>
          </router-link>
        </ul>
      </mt-loadmore>
    </div>

  </div>
</template>

<script>
import { ajaxManuscriptsList } from '../../api/api.js'
export default {
  name: 'manuscriptsList',
  data () {
    return {
      msg: '约稿列表',
      params: {
        page: 1,
        rows: 10,
        sidx: 'ReservationId',
        sord: 'desc',
        queryJson: {}
      },
      list: [],
      allLoaded: false
    }
  },
  mounted () {
    const _this = this

    ajaxManuscriptsList(this.params, function (data) {
      console.log(data)
      _this.list = _this.list.concat(data.rows)
    })
  },
  methods: {
    loadTop () {
      // 刷新数据
      const _this = this
      _this.params.page = 1

      ajaxManuscriptsList(_this.params, function (data) {
        console.log(data)
        _this.list = data.rows
      })
      this.$refs.loadmore.onTopLoaded()
    },
    loadBottom () {
      const _this = this
      setTimeout(() => {
        _this.params.page = _this.params.page + 1
        ajaxManuscriptsList(_this.params, function (data) {
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
