<template>
  <div>
      <h2>{{msg}}</h2>
      <tab></tab>
  </div>
</template>

<script>
import tab from './tab.vue'
export default {
  name: 'my',
  data () {
    return {
      msg: '我的'
    }
  },
  components: {
    'tab': tab
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
