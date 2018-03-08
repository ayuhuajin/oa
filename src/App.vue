<template>
  <div id="app">
    <!-- <img src="./assets/images/QQ图片20171226182923.jpg"> -->
    <!-- <tab></tab> -->
    <router-view></router-view>
  </div>
</template>

<script>
import tab from './views/tab.vue'
export default {
  name: 'App',
  components: {
    'tab': tab
  }
}
</script>

<style>
.icon {
  width: 1.8em; height: 1.8em;
  margin: 0 auto;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  color: #409EFF;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: #fff;
  height: 100%;
}
</style>
