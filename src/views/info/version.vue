<template>
  <div>
    <mt-header fixed title="版本">
      <router-link to="/my" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="content">{{msg}}</div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: '当前版本:V3.16'
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
