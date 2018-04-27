<template>
  <div>
    <mt-header fixed title="关于我们">
      <router-link to="/my" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div style="margin-top:80px;text-align:center;margin-bottom:60px;">厦门民盟OA</div>
    <div class="content">{{msg}}</div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: '技术支持：福州信诺通信息技术有限公司'
    }
  }
}
</script>

<style scoped>
  .content{
    margin-top: 50px;
    padding:40px 0 55px;
    text-align: center;
  }
</style>
