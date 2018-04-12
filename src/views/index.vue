<template>
  <div class="body">
    <section class="depart">
      <h3 class="title">通用功能</h3>
      <ul class="action-list">
        <router-link to="./send-list" tag="li">
          <img src="../assets/images/icon01.png">
          <p>机关发文</p>
        </router-link>
        <router-link to="./meeting-list" tag="li">
          <img src="../assets/images/icon01.png">
          <p>活动会议组织</p>
        </router-link>
        <router-link to="./notice-list" tag="li">
          <img src="../assets/images/icon01.png">
          <p>通知公告</p>
        </router-link>
        <router-link to="./message-list" tag="li">
          <img src="../assets/images/icon01.png">
          <p>短信群发</p>
        </router-link>
      </ul>
    </section>
    <section class="depart">
      <h3 class="title">组织部</h3>
      <ul class="action-list">
        <router-link to="./ally" tag="li">
          <img src="../assets/images/icon01.png">
          <p>盟员信息管理</p>
        </router-link>
      </ul>
    </section>
    <section class="depart">
      <h3 class="title">办公室</h3>
      <ul class="action-list">
        <router-link to="./notice3" tag="li">
          <img src="../assets/images/icon01.png">
          <p>办公室</p>
        </router-link>
      </ul>
    </section>
    <section class="depart">
      <h3 class="title">调研部</h3>
      <ul class="action-list">
        <router-link to="./research-list" tag="li">
          <img src="../assets/images/icon01.png">
          <p>调研课题</p>
        </router-link>
        <router-link to="./proposal-list" tag="li">
          <img src="../assets/images/icon01.png">
          <p>提案工作</p>
        </router-link>
      </ul>
    </section>
    <section class="depart">
      <h3 class="title">宣传部</h3>
      <ul class="action-list">
        <router-link to="./mail" tag="li">
          <img src="../assets/images/icon01.png">
          <p>盟讯邮寄列表</p>
        </router-link>
        <router-link to="./manuscripts-list" tag="li">
          <img src="../assets/images/icon01.png">
          <p>约稿</p>
        </router-link>
        <router-link to="./manuscripts-list" tag="li">
          <img src="../assets/images/icon01.png">
          <p>信息报送</p>
        </router-link>
        <router-link to="./manuscripts-list" tag="li">
          <img src="../assets/images/icon01.png">
          <p>宣传报送</p>
        </router-link>
        <router-link to="./score-list" tag="li">
          <img src="../assets/images/icon01.png">
          <p>评分系统</p>
        </router-link>
      </ul>
    </section>
    <tab></tab>
  </div>
</template>

<script>
import tab from './tab.vue'
import store from '@/store/store'
export default {
  name: 'index',
  data () {
    return {
      msg: '首页'
    }
  },
  components: {
    'tab': tab
  },
  store
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.body{
  padding-bottom: 35px;
  background: #f5f5f5;
}
.depart{background: white;margin-bottom: 20px;}
.title{padding-left: 20px;line-height:36px;border-bottom: 1px solid #ddd;border-top: 1px solid #ddd;color:#333;font-weight: bold;}
.action-list{
  display: flex;
  flex-direction: row;
  flex-wrap:wrap;
    li{
      justify-content: flex-start;
      align-items: center;
      flex: 0 1 25%;
      border-right: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
      padding: 10px 0;
      text-align: center;
      img{height: .9rem;}
      p{margin-top:5px;font-size: 12px;color:#409EFF;}
    }
}
</style>
