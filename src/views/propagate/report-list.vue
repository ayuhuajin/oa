<template>
  <div>
    <mt-header fixed title="信息报送">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <router-link to="/meeting" slot="right">
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
          <router-link tag="li" :to="{name:'reportDetail', params:{keyValue:item.ReservationReportId}}" v-for="(item, index) in list" v-bind:key="index">
            <div class="wrap">
              <div>
                <div class="title">{{item.Theme}}</div>
                <div>{{item.CreateUserName}}</div>
              </div>
              <div>{{item.Description}}</div>
            </div>
          </router-link>
        </ul>
      </mt-loadmore>
    </div>

  </div>
</template>

<script>
import { ajaxMessageReportList } from '../../api/api.js'
export default {
  name: 'reportList',
  data () {
    return {
      msg: '信息报送列表',
      params: {
        page: 1,
        rows: 10,
        sidx: 'ReservationReportId',
        sord: 'desc',
        queryJson: {},
        type: 1
      },
      list: [],
      allLoaded: false
    }
  },
  mounted () {
    const _this = this

    ajaxMessageReportList(this.params, function (data) {
      console.log(data)
      _this.list = _this.list.concat(data.rows)
    })
  },
  methods: {
    loadTop () {
      // 刷新数据
      const _this = this
      _this.params.page = 1

      ajaxMessageReportList(_this.params, function (data) {
        console.log(data)
        _this.list = data.rows
      })
      this.$refs.loadmore.onTopLoaded()
    },
    loadBottom () {
      const _this = this
      setTimeout(() => {
        _this.params.page = _this.params.page + 1
        ajaxMessageReportList(_this.params, function (data) {
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
