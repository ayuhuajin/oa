<template>
  <div>
    <mt-header fixed title="待办">
      <!-- <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <router-link to="" slot="right">
        <mt-button @click="modify" >{{edit}}</mt-button>
      </router-link> -->
    </mt-header>
    <div style="height:100vh;overflow: scroll;">
      <mt-loadmore  :top-method="loadTop"
                    :bottom-method="loadBottom"
                    :bottom-all-loaded="allLoaded"
                    :auto-fill="false"
                    ref="loadmore">
        <ul>
          <router-link tag="li" :to="{name:'meetingDetail', query:{keyValue:item.ConferenceId}}" v-for="(item, index) in list" v-bind:key="index">
            <div class="wrap">
              <div>
                <div class="title">{{item.Title}}</div>
                <div>{{item.MeetingContent}}</div>
              </div>
              <div>{{item.Initiator}}</div>
            </div>
          </router-link>
        </ul>
      </mt-loadmore>
    </div>
    <tab></tab>
  </div>
</template>

<script>
import tab from './tab.vue'
import { ajaxToDoList } from '../api/api.js'
export default {
  name: 'toDo',
  data () {
    return {
      msg: '待办',
      params: {
        page: 1,
        rows: 20,
        sidx: 'BackLogId',
        sord: 'desc',
        queryJson: {}
      },
      allLoaded: false,
      list: []
    }
  },
  mounted: function () {
    let _this = this
    ajaxToDoList(_this.params, function (data) {
      _this.list = data.rows
    })
  },
  methods: {
    loadTop () {
      // 刷新数据
      const _this = this
      _this.params.page = 1

      ajaxToDoList(_this.params, function (data) {
        console.log(data)
        _this.list = data.rows
      })
      this.$refs.loadmore.onTopLoaded()
    },
    loadBottom () {
      const _this = this
      setTimeout(() => {
        _this.params.page = _this.params.page + 1
        ajaxToDoList(_this.params, function (data) {
          console.log(data)
          _this.list = _this.list.concat(data.rows)
        })
        _this.$refs.loadmore.onBottomLoaded()
      }, 1000)
    }
  },
  components: {
    'tab': tab
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  ul{
    padding:40px 0 50px;
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
