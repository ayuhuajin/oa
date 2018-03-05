<template>
  <div>
    <mt-header fixed title="盟员信息管理">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <router-link to="" slot="right">
        <mt-button v-if="modify" @click="up1">修改</mt-button>
        <mt-button v-if="centain" @click="up">提交</mt-button>
      </router-link>

    </mt-header>
    <ul v-bind:class="{ 'color-active':isA}">
        <li class="base">
            <p><span class="vm">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.RealName" v-bind:disabled="isable"></p>
            <p><span class="vm">工作单位:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.Company" v-bind:disabled="isable"></p>
            <p><span class="vm">职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;务:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.Mrpost" v-bind:disabled="isable"></p>
            <p><span class="vm">联系地址:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.Address" v-bind:disabled="isable"></p>
            <p><span class="vm">邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;编:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.Postcode" v-bind:disabled="isable"></p>
            <p><span class="vm">联系电话:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.Telephone" v-bind:disabled="isable"></p>
            <p><span class="vm">手&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;机:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.Mobile" v-bind:disabled="isable"></p>
            <p><span class="vm">邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.Email" v-bind:disabled="isable"></p>
        </li>
        <li class="">
            <a class="more" href="javascript:;" @click="toggle">更多信息 <img class="angle" v-bind:class="{'togglec':togglec}" src="../../assets/images/angle.png"></a>
            <div class="content" v-show="isShow">
                <p><span class="vm">社会职务:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.Societypost" v-bind:disabled="isable"></p>
                <p><span class="vm">支部:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.Branch" v-bind:disabled="isable"></p>
                <p><span class="vm">退休:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.Retire" v-bind:disabled="isable"></p>
                <p><span class="vm">年龄段:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.Age" v-bind:disabled="isable"></p>
                <p><span class="vm">入盟年段:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.Addpostage" v-bind:disabled="isable"></p>
                <p><span class="vm">党派关系:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.Party" v-bind:disabled="isable"></p>
                <p><span class="vm">转入:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.Turn" v-bind:disabled="isable"></p>
                <p><span class="vm">登录账户:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.Account" v-bind:disabled="isable"></p>
                <p><span class="vm">呢称:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.NickName" v-bind:disabled="isable"></p>
                <p><span class="vm">QQ号:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.OICQ" v-bind:disabled="isable"></p>
                <p><span class="vm">微信号:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.WeChat" v-bind:disabled="isable"></p>
                <p><span class="vm">MSN:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.MSN" v-bind:disabled="isable"></p>
                <p><span class="vm">主管:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.Manager" v-bind:disabled="isable"></p>
                <p><span class="vm">岗位名称:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.DutyName" v-bind:disabled="isable"></p>
                <p><span class="vm">职位名称:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.PostName" v-bind:disabled="isable"></p>
                <p><span class="vm">积分:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.Score" v-bind:disabled="isable"></p>
                <p><span class="vm">积分项目:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.ScoreItem" v-bind:disabled="isable"></p>
                <p><span class="vm">身份证号:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.IdCard" v-bind:disabled="isable"></p>
                <p><span class="vm">地方组织:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.Local" v-bind:disabled="isable"></p>
                <p><span class="vm">基层组织:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.Substratum" v-bind:disabled="isable"></p>
                <p><span class="vm">性别:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.Gender" v-bind:disabled="isable"></p>
                <p><span class="vm">民族:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.Nation" v-bind:disabled="isable"></p>
                <p><span class="vm">生日:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.Birthday" v-bind:disabled="isable"></p>
                <p><span class="vm">学历:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.Education" v-bind:disabled="isable"></p>
                <p><span class="vm">入盟时间:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.AddpostDate" v-bind:disabled="isable"></p>
                <p><span class="vm">工作单位:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.Company" v-bind:disabled="isable"></p>
                <p><span class="vm">职称段:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.Postage " v-bind:disabled="isable"></p>
                <p><span class="vm">参加工作时间:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.AddDate" v-bind:disabled="isable"></p>
                <p><span class="vm">用户籍贯:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.Origin" v-bind:disabled="isable"></p>
                <p><span class="vm">职位级别:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.PostLevel " v-bind:disabled="isable"></p>
                <p><span class="vm">职位类别:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.PostType" v-bind:disabled="isable"></p>
                <p><span class="vm">是否博导:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.Doktorvater" v-bind:disabled="isable"></p>
                <p><span class="vm">是否离退休:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.IsRetire " v-bind:disabled="isable"></p>
                <p><span class="vm">退休时间:</span><input class="vm" type="text" name="" v-model="list.RetireDate" v-bind:disabled="isable"></p>
                <p><span class="vm">所学专业类别:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.SpecialtyType" v-bind:disabled="isable"></p>
                <p><span class="vm">从事专业:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.Specialty" v-bind:disabled="isable"></p>
                <p><span class="vm">外语语种:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.Language" v-bind:disabled="isable"></p>
                <p><span class="vm">口译水平:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.Interpreting" v-bind:disabled="isable"></p>
                <p><span class="vm">笔译水平:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.Translation" v-bind:disabled="isable"></p>
                <p><span class="vm">校院长:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.President " v-bind:disabled="isable"></p>
                <p><span class="vm">备注:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.Description" v-bind:disabled="isable"></p>
                <p><span class="vm">加入其他党派时间:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.PartyTime" v-bind:disabled="isable"></p>
                <p><span class="vm">学部:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.Division" v-bind:disabled="isable"></p>
                <p><span class="vm">学部担任时间:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.DivisionDate" v-bind:disabled="isable"></p>
                <p><span class="vm">盟内职务类别:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.MPostType" v-bind:disabled="isable"></p>
                <p><span class="vm">盟内职务届数:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.MPostNumber" v-bind:disabled="isable"></p>
                <p><span class="vm">盟内统计时间:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.MPostCountDate" v-bind:disabled="isable"></p>
                <p><span class="vm">盟内职务排名:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.MPostSort" v-bind:disabled="isable"></p>
                <p><span class="vm">其他党派:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.OtherParty" v-bind:disabled="isable"></p>
                <p><span class="vm">人大职务类别:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.NPCType" v-bind:disabled="isable"></p>
                <p><span class="vm">人大职务届数:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.NPCNumber" v-bind:disabled="isable"></p>
                <p><span class="vm">人大职务统计时间:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.NPCCountDate" v-bind:disabled="isable"></p>
                <p><span class="vm">人大专委会职务类型:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.SpecialType " v-bind:disabled="isable"></p>
                <p><span class="vm">人大选区:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.Specialdistrict " v-bind:disabled="isable"></p>
                <p><span class="vm">政协职务类别:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.ConferenceType " v-bind:disabled="isable"></p>
                <p><span class="vm">政协职务届数:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.ConferenceNumber " v-bind:disabled="isable"></p>
                <p><span class="vm">政协职务统计时间:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.ConferenceCountDate " v-bind:disabled="isable"></p>
                <p><span class="vm">政协界别:</span><input class="vm" v-bind:class="{ 'color-active':isA}" type="text" name="" v-model="list.ConferenceCircles " v-bind:disabled="isable"></p>
                <p><span class="vm"> 政协专委会职务类型:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.CommitteeType " v-bind:disabled="isable"></p>
                <p><span class="vm">盟员职务类别:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.MYPosition " v-bind:disabled="isable"></p>
                <p><span class="vm"> 盟员职务信息统计时间:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.MYPositionCountDate " v-bind:disabled="isable"></p>
                <p><span class="vm">专委会界数:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.CommitteeNumber " v-bind:disabled="isable"></p>
                <p><span class="vm">专门委员会名称:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.CommitteeName " v-bind:disabled="isable"></p>
                <p><span class="vm">专门委员会课题:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.CommitteeTask " v-bind:disabled="isable"></p>
                <p><span class="vm">专门委员会:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.Committee  " v-bind:disabled="isable"></p>
                <p><span class="vm">专门委员会级别:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.CommitteeLevel  " v-bind:disabled="isable"></p>
                <p><span class="vm">专门委员会专业分类:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.CommitteeSpecialtyType   " v-bind:disabled="isable"></p>
                <p><span class="vm">专门委员会起始时间:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.CommitteeStrTime  " v-bind:disabled="isable"></p>
                <p><span class="vm">专门委员会截止时间:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.CommitteeEndTime  " v-bind:disabled="isable"></p>
                <p><span class="vm">专门委员会采用情况:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.CommitteeUse  " v-bind:disabled="isable"></p>
                <p><span class="vm">特邀职务名称:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.PositionType   " v-bind:disabled="isable"></p>
                <p><span class="vm"> 特邀职务起始时间:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.PositionStrTime  " v-bind:disabled="isable"></p>
                <p><span class="vm">特邀职务截止时间:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.PositionEndTime  " v-bind:disabled="isable"></p>
                <p><span class="vm">培训名称:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.CultivateName  " v-bind:disabled="isable"></p>
                <p><span class="vm">培训类别:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.CultivateType  " v-bind:disabled="isable"></p>
                <p><span class="vm">培训期数:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.CultivateNumber  " v-bind:disabled="isable"></p>
                <p><span class="vm">培训地点:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.CultivateAddress  " v-bind:disabled="isable"></p>
                <p><span class="vm">培训主办单位:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.CultivateUnit  " v-bind:disabled="isable"></p>
                <p><span class="vm">培训起始时间:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.CultivateStrTime  " v-bind:disabled="isable"></p>
                <p><span class="vm">培训截止时间:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.CultivateEndTime  " v-bind:disabled="isable"></p>
                <p><span class="vm">获奖名称:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.WinningName  " v-bind:disabled="isable"></p>
                <p><span class="vm"> 授权机构:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.AccreditOrganization  " v-bind:disabled="isable"></p>
                <p><span class="vm">获奖届数:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.WinningNumber  " v-bind:disabled="isable"></p>
                <p><span class="vm">获奖分类:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.WinningType  " v-bind:disabled="isable"></p>
                <p><span class="vm">获奖级别:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.WinningLevel  " v-bind:disabled="isable"></p>
                <p><span class="vm"> 获奖年度:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.WinningAddYear  " v-bind:disabled="isable"></p>
                <p><span class="vm">获奖上报年度:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.WinningYear  " v-bind:disabled="isable"></p>
                <p><span class="vm">挂职级别:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.SecondmentLevle  " v-bind:disabled="isable"></p>
                <p><span class="vm">挂职起始时间:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.SecondmentStrTime  " v-bind:disabled="isable"></p>
                <p><span class="vm">挂职截止时间:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.SecondmentEndTime  " v-bind:disabled="isable"></p>
                <p><span class="vm">学术荣誉:</span><input v-bind:class="{ 'color-active':isA}" class="vm" type="text" name="" v-model="list.ScholasticHonor   " v-bind:disabled="isable"></p>
            </div>
        </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
// import qs from 'qs'
import { Indicator } from 'mint-ui'
export default {
  name: 'addressList',
  data () {
    return {
      msg: '通讯录',
      more: '更多信息',
      list: {},
      keyValue: '',
      allLoaded: false,
      modify: true,
      centain: false,
      btnShow: '修改',
      isA: false,
      isable: true,
      isShow: false,
      togglec: false
    }
  },
  created: function () {
    console.log(this.list)
    var _this = this
    axios.get('/BaseManage/User/GetFormJson?keyValue=' + this.$route.params.keyValue + '', {}).then((response) => {
      console.log('信息列表请求成功')
      _this.list = response.data
    }).catch((response) => {
      Indicator.close()
      console.log('信息列表请求失败')
    })
  },
  methods: {
    toggle: function () {
      this.isShow = !this.isShow
      this.togglec = !this.togglec
    },
    up: function () {
      this.centain = !this.centain
      this.modify = !this.modify
      this.isable = !this.isable
      this.isA = !this.isA
      // this.list = JSON.stringify(this.list)
      console.log(this.list)
      axios.post('/BaseManage/User/MobileSaveForm?keyValue=' + this.$route.params.keyValue + '', '', {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((response) => {
        console.log(1111)
      }).catch((response) => {
        alert(222)
      })
    },
    up1: function () {
      this.centain = !this.centain
      this.modify = !this.modify
      this.isable = !this.isable
      this.isA = !this.isA
    }
  }
}
</script>

<style scoped>
  ul{
    padding:40px 0 0px;
  }
  .mui-table-view-cell>a:not(.mui-btn){
      background: #eee;
      color: #555;
  }
  .send-info li {
      padding: 0 4%;
      border-bottom: 1px solid #eee;
      line-height: 40px;
  }
  .upload a{display: block;color:#007aff;}
  .handle{margin-top: 20px;background: white;}
  .handle li {
      padding: 0 4%;
      border-bottom: 1px solid #eee;
      line-height: 40px;
  }
  .base input[type=text]{margin-bottom: 0;width: 77%;margin-left: 5px;}
    .base {background: white;padding: 10px 0;}
  .base p{padding:0 3%;margin: 5px 0;margin-top: 3px}
  .send-head{
      position: fixed;
      width: 100%;
      z-index: 111;
  }
  .head-blank{height: 42px;width: 100%;}
  .base p span {
      width: 20%;
  }
  input[type=text]{
    line-height: 21px;
    width: 100%;
    height: 40px;
    margin-bottom: 15px;
    padding: 10px 15px;
    -webkit-user-select: text;
    border: 1px solid rgba(0,0,0,.2);
    border-radius: 3px;
    outline: 0;
    background-color: #fff;
    -webkit-appearance: none;
}
.content {
    position: relative;
    overflow: hidden;
    padding: 8px 3%;
    background: #fff;
}
.more{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 15px;
  width:100%;
  line-height: 40px;
  padding-left: 3%;
  background: #f5f5f5;
}
.angle{
  transform: rotate(90deg);
  width: 7px;
  height: 18px;
}
.togglec{
  transform: rotate(-90deg);
}
</style>
