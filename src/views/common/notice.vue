<template>
  <div id="app1">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <vue-tree
            :tree-data="treeData"
            v-model="ids"
            :options="options"
            @handle="handle"
          />
        </div>
        <!-- <div class="col-md-6">
          <p class="lead">设置</p>
          <div class="form-group">
            <div class="checkbox">
              <label>
                <input type="checkbox" v-model="options.checkbox"> 显示复选框
              </label>
            </div>
            <div class="checkbox">
              <label>
                <input type="checkbox" v-model="options.checkedOpen"> 已选择是否展开
              </label>
            </div>
            <div class="checkbox">
              <label>
                <input type="checkbox" v-model="options.folderBold"> 目录加粗
              </label>
            </div>
            <div class="checkbox">
              <label>
                <input type="checkbox" v-model="options.idsWithParent"> 复选是否包含目录
              </label>
            </div>
          </div>
          <div class="form-group">
              <label>初始展开层级</label>
              <input type="number" class="form-control" v-model="options.depthOpen" disabled>
          </div>
          <h3>Events</h3>
          <p>单击节点名称触发<code>handle</code>事件</p>
          <p v-for="item in message"><pre v-html="item"></pre></p>
          <h3>Checked ids</h3>
          <p>{{ids}}</p>
          <h3>Options</h3>
          <p>{{options}}</p>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'app1',
  data: function () {
    return {
      ids: [4],
      options: {
        label: 'label',
        checkbox: true,
        checkedOpen: false,
        folderBold: true,
        idsWithParent: true,
        depthOpen: 2,
        openIcon: 'fa fa-angle-right',
        closeIcon: 'fa fa-angle-down',
        halfCheckedIcon: 'fa fa-minus-square-o fa-fw text-primary',
        checkedIcon: 'fa fa-check-square-o fa-fw text-danger',
        uncheckedIcon: 'fa fa-square-o fa-fw'
      },
      sj: '',
      message: [],
      treeData: ''
    }
  },
  created:function() {
    var _this = this
    var userid = localStorage.getItem("userid")
    axios.get('/apis/Department/GetTreeListJsonMobile?userId=fdf0dbec-82d6-442c-b0e4-be8dcfcafe0c', {}).then((response) => {
      console.log('获取组织请求成功')
      var _this = this
      _this.treeData = _this.getJsonTree(response.data.rows, '0')
      console.log(_this.sj )
    }).catch((response) => {
      console.log('获取组织请求失败')
    })
  },

  methods: {
    handle (item) {
      this.message.push(`节点 ${JSON.stringify(item)} 作为事件参数传递`)
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
    }
  }
}

</script>


