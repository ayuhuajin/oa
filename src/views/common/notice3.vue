<template>
  <div id="app1">
    <el-tree
      :data="data2"
      show-checkbox
      node-key="id"
      ref="tree"
      :default-expanded-keys="[2, 3]"
      :default-checked-keys="[5]"
      :props="defaultProps">
    </el-tree>
    <el-button @click="getCheckedNodes">通过 key 获取</el-button>
    <el-upload
      class="upload-demo"
      action="apis/PublicInfoManage/ResourceFile/MobileUploadifyFile/"
      >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <vueSignature ref="signature" :sigOption="option" :w="'100%'" :h="'200px'"></vueSignature>
    <img v-bind:src="png">
    <button @click="save">签名</button>
    <button @click="clear">清除</button>
    <button @click="clear">上传签名</button>

    <div class="nav">
      <mt-button size="small" @click.native.prevent="active = 'tab-container1'">tab 1</mt-button>
      <mt-button size="small" @click.native.prevent="active = 'tab-container2'">tab 2</mt-button>
      <mt-button size="small" @click.native.prevent="active = 'tab-container3'">tab 3</mt-button>
    </div>
    <div class="page-tab-container">
      <mt-tab-container class="page-tabbar-tab-container" v-model="active" swipeable>
        <mt-tab-container-item id="tab-container1">
          <mt-cell v-for="(n, index) in 3" title="tab-container 1" :key="n.index">{{index}}</mt-cell>
        </mt-tab-container-item>
        <mt-tab-container-item id="tab-container2">
          <mt-cell v-for="(n, index) in 5" title="tab-container 2" :key="n.index">{{index}}</mt-cell>
        </mt-tab-container-item>
        <mt-tab-container-item id="tab-container3">
          <mt-cell v-for="(n, index) in 6" title="tab-container 3" :key="n.index">{{index}}</mt-cell>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>

  </div>
</template>

<script>
// import Vue from 'vue'
import axios from 'axios'
// import {Tree, Button} from 'element-ui'
// Vue.use(Tree)
export default {
  name: 'app1',
  data () {
    return {
      data2: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      png: '',
      option: {
        penColor: 'rgb(0, 0, 0)'
      },
      active: 'tab-container1'
    }
  },
  created: function () {
    // var _this = this
    // var userid = localStorage.getItem('userid')
    axios.get('/Department/GetTreeListJsonMobile?userId=fdf0dbec-82d6-442c-b0e4-be8dcfcafe0c', {}).then((response) => {
      console.log('获取请求成功')
      var _this = this
      _this.data2 = _this.getJsonTree(response.data.rows, '0')
    }).catch((response) => {
      console.log('获取请求失败')
    })
  },

  methods: {
    // element tree 组件
    getCheckedNodes () {
      var arr = this.$refs.tree.getCheckedKeys()
      console.log(arr)
    },
    getJsonTree: function (data, pId) {
      var itemArr = []
      for (var i = 0; i < data.length; i++) {
        var node = data[i]
        // data.splice(i, 1)
        if (node.pId === pId) {
          var newNode = {children: this.getJsonTree(data, node.id), id: node.id, label: node.name}
          itemArr.push(newNode)
        }
      }
      return itemArr
    },
    // base64 上传组件
    save () {
      var _this = this
      setTimeout(function () {
        console.log('878978978')
        _this.png = _this.$refs.signature.save()
      }, 30)
      // var jpeg = _this.$refs.signature.save('image/jpeg')
      // var svg = _this.$refs.signature.save('image/svg+xml');
      console.log('6666')
      // console.log(jpeg)
      // console.log(svg)
    },
    clear () {
      var _this = this
      _this.$refs.signature.clear()
    }
  }

}
</script>
<style lang="scss" >
// element树形样式
  .el-icon-caret-right:before {
    font-size:18px;
  }
  .el-checkbox__inner{
    width: 20px;
    height: 20px;
    margin-top: 5px;
  }
  .el-checkbox__input {
    vertical-align: -webkit-baseline-middle;
  }
  .el-checkbox__inner::after{
    height: 8px;
    left: 7px;
    top: 3px;
  }
  .el-checkbox__input.is-indeterminate .el-checkbox__inner::before{
    top: 8px;
  }
  .el-tree-node__label {
    margin-top: 1px;
  }
// element 上传样式
  .el-upload-list__item-name{
    line-height: 40px;
    font-size: 16px;
  }
  .el-icon-circle-check:before,.el-icon-close:before {
    font-size: 18px;
  }
  .el-upload-list__item-status-label,.el-upload-list__item .el-icon-close{
    top: 10px;
  }
  .el-upload-list__item{
    border-top:1px solid #ddd;
    border-bottom:1px solid #ddd;
  }
  .el-upload-list__item .el-progress{
    top:30px;
  }
  .el-progress-bar__inner{
    margin-top: 0;
  }
  .el-upload-list__item .el-icon-upload-success{
     top:20px;
  }
  .el-upload-list__item:hover .el-icon-close{

  }
  .nav{
    margin-top: 30px;
  }
  .page-tab-container{
    margin-top: 5px;
  }
</style>
