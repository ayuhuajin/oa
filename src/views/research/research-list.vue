<template>
  <div>
    <mt-header fixed title="调研课题">
      <router-link to='/' slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <router-link to='/research' slot="right">
        <mt-button>创建</mt-button>
      </router-link>
    </mt-header>
    <div style="height:100vh;overflow:scroll;">
      <mt-loadmore  :top-method="loadTop"
                    :bottom-method="loadBottom"
                    :bottom-all-loaded="allLoaded"
                    :auto-fill="false"
                    ref="loadmore">
        <ul>
          <router-link tag="li" :to="{name: 'researchDetail', params:{keyValue:item.SubjectId}}" v-for="(item, index) in list" v-bind:key="index">
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
import axios from 'axios'
import { Indicator } from 'mint-ui'
export default {
  name: 'researchList',
  data () {
    return {
      msg: '调研课题列表',
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
      const _this = this
      axios.get('/SubjectManage/Subject/GetMobilePageListJson?rows=10&page=' + _this.pageNum + '&sidx=SubjectId&sord=desc&queryJson={}', {}).then((response) => {
        console.log('调研课题列表成功')
        _this.list = _this.list.concat(response.data.rows)
      }).catch((response) => {
        Indicator.close()
        console.log('调研课题列表失败')
      })
    },
    loadTop () {
      const _this = this
      axios.get('/SubjectManage/Subject/GetMobilePageListJson?rows=10&page=1&sidx=SubjectId&sord=desc&queryJson={}', {}).then((response) => {
        console.log('调研课题列表成功')
        _this.list = response.data.rows// 纯分页
      }).catch((response) => {
        Indicator.close()
        console.log('调研课题列表失败')
      })
      this.$refs.loadmore.onTopLoaded()
    },
    loadBottom () {
      const _this = this
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
    font-size: 18px;
    color:#333;
  }
</style>
