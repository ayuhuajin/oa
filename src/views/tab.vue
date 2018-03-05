<template>
  <div>
    <div class="nav">
      <!-- <router-link to="/login">login</router-link> -->
      <mt-tabbar >
        <mt-tab-item id="首页">
            <router-link to="/" tag="li">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-home"></use>
              </svg>
              <p>首页</p>
            </router-link>
        </mt-tab-item>
        <mt-tab-item id="待办">
            <router-link to="/toDo" tag="li">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-daiban"></use>
              </svg>
              <p>待办</p>
            </router-link>
        </mt-tab-item>
        <mt-tab-item id="通讯录">
            <router-link to="/addressList" tag="li">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-tongxunlu"></use>
              </svg>
              <p>通讯录</p>
            </router-link>
        </mt-tab-item>
        <mt-tab-item id="我的">
            <router-link to="/my" tag="li">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-wode"></use>
              </svg>
              <p>我的</p>
            </router-link>
        </mt-tab-item>
      </mt-tabbar>
    </div>
    <router-view></router-view>
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
<style lang="scss">
.icon{display: block}
.nav{
    position: fixed;
    bottom: 0;
    width:100%;
    font-size: 12px;
    h1{
      font-size: 26px;
      span{
        font-size: 12px;
      }
    }
    p{line-height: 1.2;color: #409EFF;}
}
.mint-tab-item-label{
  font-size: 14px;
}
.mint-tab-item{
  padding:0;
  li{
    padding:5px 0;
  }
}
h1, h2 {
    font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  width: 100%;
}
a {
  color: #42b983;
}
</style>
