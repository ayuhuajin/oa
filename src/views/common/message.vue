<template>
  <div>
    <div style="width:100%;height:40px;"></div>
    <mt-header fixed title="信息">
      <router-link to="/message-list" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <router-link to="/message" slot="right">
        <mt-button >提交</mt-button>
      </router-link>
    </mt-header>
    <div>
      <h3>短信群发</h3>
      <textarea placeholder="请输入短信内容" v-model="msg1"></textarea>
    </div>
    <Tree v-bind:data="sj" v-bind:checkbox="true">
    </Tree>
  </div>
</template>

<script>
import Tree from 'vt-tree'
import Vue from 'vue'
export default {
  data () {
    return {
      msg1: '',
      sj: [
          {
            id: 1,
            text: "一级1",
            children:
              [
                {id: 11,text: "一级11" ,children: [{id:21,text:'dfsdf'},{id:22,text: '46466'}]},
                {id: 12,text: "一级12" }
              ]
          },
          {  
            id: 2,
            name: "一级2"
          },
          {  
            id: 3,
            name: "一级3"
          }
      ]
    }
  },
  created:function () {
    console.log(Tree.name);
  },
  components:{
      "Tree":Tree
  }
}
</script>

<style >
  h3{font-size: 16px;margin-top: 30px;margin-left: 5%;}
  textarea{width: 90%;height:200px;margin-left: 5%;}
  .item {
    cursor: pointer;
}

.bold {
    font-weight: bold;
}
ul {
    padding-left: 1em;
    line-height: 1.5em;
    list-style-type: dot;
}
.tree__item--noChild {
    padding-left: 16px;
}
.tree__checkbox {
    width: 16px;
    height: 16px;
    position: relative;
    top: -1px;
    margin: 0;
}
.tree__opened--status {
    width: 17px;
    display: inline-block;
}
</style>
