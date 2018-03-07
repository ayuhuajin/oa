<template>

 <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">

    <mt-loadmore  :bottom-method="loadBottom" :bottom-all-loaded="bottomAllLoaded" ref="loadmore" @bottom-status-change="handleBottomChange" :auto-fill="false">

 <div  v-for="item in topics">
       <h4> {{item.FullHead}}</h4>

 </div>

 
</mt-loadmore>
 </div>

</template>

<script>

import Vue from 'vue'

import axios from 'axios'

import qs from 'qs'

import { Loadmore } from 'mint-ui'

Vue.component(Loadmore.name, Loadmore);

export default {
  name: 'app',
  data () {
    return {
      searchKey: {
          page: 1,
          limit: 20,
          tab: 'all',
          mdrender: true,
          pageNum: 1
      },
      topics:[],
      bottomAllLoaded:false,
      wrapperHeight: 0
    }
  },
  methods:{
    handleBottomChange(status) {
        this.bottomStatus = status;
      },
    loadBottom() {
        setTimeout(() => {
          this.searchKey.page++;
          this.getTopics();
          this.$refs.loadmore.onBottomLoaded();
        }, 1000);
      },
      getTopics() {
          let params = qs.stringify(this.searchKey);
          var _this = this
          console.log("params",params);
          console.log(_this.pageNum)
          axios.get('/PublicInfoManage/Notice/GetPageListJson?rows=3&page=' + _this.page + '&sidx=CreateDate&sord=desc',{}).then(response => {
            console.log(response.data)
            _this.topics = _this.topics.concat(response.data.rows);
            if(response.data.rows.length<_this.searchKey.limit){
              _this.bottomAllLoaded=true;
            }
          }).catch(error => {
            console.log(error)
          })
        }
      },
      mounted:function(){
        this.getTopics();    
        this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
      }
    }


</script>

<style>
.page-loadmore-wrapper {
  overflow: scroll;
}
</style>