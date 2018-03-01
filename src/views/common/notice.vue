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
    <el-button @click="getCheckedNodes">通过 node 获取</el-button>

    <el-upload
      class="upload-demo"
      action="http://192.168.1.88:9900/cloudstorage/storage/upload"
      :on-change="handleChange"
      :file-list="fileList3">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <vueSignature ref="signature" :sigOption="option" :w="'100%'" :h="'300px'"></vueSignature> 
		<button @click="save">保存</button>
		<button @click="clear">清除</button>
    <img v-bind:src="png">
  </div>
</template>

<script>
// import Vue from 'vue'
import axios from 'axios'
// import {Tree, Button} from 'element-ui'
// Vue.use(Tree)
  export default {
    name: 'app1',
    data() {
      return {
        data2:'',
        defaultProps: {
          children: 'children',
          label: 'label',
        },
        png: '',
        kkk:'',
        option:{
          penColor:"rgb(0, 0, 0)"
        }
      }
    },
    created:function() {
    var _this = this
    var userid = localStorage.getItem("userid")
    axios.get('/apis/Department/GetTreeListJsonMobile?userId=fdf0dbec-82d6-442c-b0e4-be8dcfcafe0c', {}).then((response) => {
      console.log('获取请求成功')
      var _this = this
      _this.data2 = _this.getJsonTree(response.data.rows, '0')
    }).catch((response) => {
      console.log('获取请求失败')
    })
  },

  methods: {
    getCheckedNodes() {
      var arr = this.$refs.tree.getCheckedKeys()
      console.log(arr)
    },
    getJsonTree: function(data, pId) {
      var itemArr=[];
      for(var i=0;i<data.length;i++){ 
        var node=data[i];
        //data.splice(i, 1)
        if(node.pId==pId){ 
          var newNode={children:this.getJsonTree(data,node.id),id:node.id,label:node.name,};
          itemArr.push(newNode);              
        } 
      }
      return itemArr;
    },
    save(){
      var _this = this;
      setTimeout(function () {
        console.log('878978978');
        _this.png  = _this.$refs.signature.save();
      },100);
			// var jpeg = _this.$refs.signature.save('image/jpeg')
			// var svg = _this.$refs.signature.save('image/svg+xml');
			console.log('6666');
			// console.log(jpeg)
			// console.log(svg)
		},
		clear(){
			var _this = this;
			_this.$refs.signature.clear();
		}
  }

  }
</script>
<style lang="scss" >
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
</style>



