<template>
  <div>
      <h2>{{msg}}</h2>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      msg: '首页'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    *{
        padding: 0;
        margin: 0;
    }
</style>
