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
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg1: ''
    }
  },
  created: function () {
    console.log(111)
  }
}
</script>

<style scoped>
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
</style>
