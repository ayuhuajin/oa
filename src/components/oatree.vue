<template>
  <div class="oatree" v-show="showtree">
    <mt-header fixed title="人员选择">
      <router-link to="" slot="left">
        <mt-button icon="back" @click="back">返回</mt-button>
      </router-link>
      <router-link to="" slot="right">
        <mt-button @click="getCheckedNodes">创建</mt-button>
      </router-link>
    </mt-header>
    <el-input
      placeholder="输入关键字进行过滤"
      v-model="filterText">
    </el-input>
    <el-tree
      :data="data2"
      show-checkbox
      node-key="id"
      ref="tree"
      :filter-node-method="filterNode"
      :default-expanded-keys="[2, 3]"
      :default-checked-keys="[5]"
      :props="defaultProps">
    </el-tree>
    <!-- <el-button @click="getCheckedNodes">通过 key 获取</el-button> -->
  </div>
</template>
<script>
import axios from 'axios'
export default {
  props: {
    showtree: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // showTree: true,
      msg: '树形',
      filterText: '',
      data2: [],
      treeArr: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  created: function () {
    // var _this = this
    // var userid = localStorage.getItem('userid')
    axios.get('/Department/GetTreeListJsonMobile?userId=fdf0dbec-82d6-442c-b0e4-be8dcfcafe0c', {}).then((response) => {
      console.log('获取请求成功')
      let _this = this
      _this.data2 = _this.getJsonTree(response.data.rows, '0')
    }).catch((response) => {
      console.log('获取请求失败')
    })
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    }
  },
  methods: {
    getCheckedNodes () {
      let _this = this
      _this.treeArr = _this.$refs.tree.getCheckedKeys()
      console.log(_this.treeArr)
      _this.$emit('callback', _this.treeArr)
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
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    back () {
      let _this = this
      _this.treeArr = []
      _this.$emit('callback', _this.treeArr)
    }
  }
}
</script>

<style lang="scss" >
  .oatree{
    position: absolute;
    top: 45px;
    background: white;
    width: 100%;
    height: 100%;
    z-index:1;
  }
  .mint-header.is-fixed{
    z-index: 1;
  }
  .el-input__inner {
    width: 90%;
    margin-left: 5%;
    margin-top: 15px;
    margin-bottom: 10px;
  }
// element树形样式
  .el-tree-node__content {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    height: 35px;
    cursor: pointer;
  }
  .el-icon-caret-right:before {
    font-size:18px;
  }
  .el-checkbox__inner{
    width: 25px;
    height: 25px;
    margin-top: 5px;
  }
  .el-checkbox__input {
    vertical-align: -webkit-baseline-middle;
  }
  .el-checkbox__inner::after{
    height: 12px;
    left: 10px;
    top: 3px;
  }
  .el-checkbox__input.is-indeterminate .el-checkbox__inner::before{
    top: 10px;
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
  </style>
