<template>
  <div id="#sendDetail">
    <mt-header fixed title="活动会议组织">
      <router-link to="/meeting-list" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <router-link to="" slot="right">
        <mt-button @click="modify" >{{edit}}</mt-button>
      </router-link>
    </mt-header>
    <div class="content-wrap">
      <mt-field label="主题：" placeholder="请输入主题" v-model="list.Title" :disabled="disabled"></mt-field>
      <mt-field label="内容描述：" placeholder="请输入内容描述" type="textarea" rows="4" v-model="list.MeetingContent" :disabled="disabled"></mt-field>
      <mt-field label="发起人：" placeholder="请输入发起人" v-model="list.Initiator" :disabled="disabled"></mt-field>
      <div class="inputPicker">
        <span>截止时间:</span>
        <input type="text" readonly="" placeholder="请输入校对日期" @click='openPicker' v-model='list.ClosingDate' :disabled="disabled">
      </div>
      <!-- <div class="custom-wrap">
        <span>自定义：</span>
        <input class="Custom" type="text" placeholder="请输入自定义内容" v-for="(item, index) in customList" v-model="customList[index]" :disabled="disabled" v-bind:key="index"/>
      </div> -->
      <!-- <mt-checklist
        title="checkbox list"
        v-model="customList"
        :options="['optionA', 'optionB', 'optionC']">
      </mt-checklist> -->
      <mt-checklist
        title="选择列表"
        v-model="customList"
        :options="temp"
        @click="showCustomList"
      >
      </mt-checklist>
      <div class="statistics">
        <mt-button size="small" type="primary" @click="participantUser">参与者</mt-button>
        <span class="total-count">参与人数:{{count}}</span>
        <div>{{participant}}</div>
        <div v-for="(item, index) in customParticipant" :key="item.index">{{item.name}}:{{item.users.length}}人 {{item.users}}</div>
      </div>
      <mt-datetime-picker
        v-model="pickerVisible"
        type="date"
        ref="picker"
        year-format="{value} 年"
        month-format="{value} 月"
        date-format="{value} 日"
        :startDate = 'startDate'
        :endDate = 'endDate'
        @confirm="handleConfirm"
        >
      </mt-datetime-picker>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { ajaxMeetingDetail, ajaxMeetingEdit, ajaxMeetingParticipantUser, ajaxMeetingParticipantCustomCount, ajaxMeetingParticipantCustomUser, ajaxMeetingParticipantCount } from '../../api/api.js'
export default {
  name: 'sendDetail',
  data () {
    return {
      msg: '发文详情',
      edit: '编辑',
      participant: '',
      customParticipant: [],
      temp: [],
      count: '',
      keyValue: '',
      pickerVisible: '',
      startDate: new Date('1970-01-01'),
      endDate: new Date('2080-12-30'),
      disabled: false,
      downloadUrl: [],
      chooseDate: '',
      customList: [],
      params: {
        keyValue: '',
        IsAttended: true
      },
      list: {
        keyValue: '',
        Title: '',
        Initiator: '',
        ClosingDate: '',
        MeetingContent: '',
        Custom: '',
        Participant: ''
      }
    }
  },
  mounted: function () {
    let _this = this

    _this.init()
  },
  watch: {
    pickerVisible: function (data) {
      let _this = this

      _this.list.ClosingDate = moment(data).format('YYYY-MM-DD')
    },
    list: function (newl, oldl) {
      console.log(newl, oldl)
    }
  },
  methods: {
    init: function () {
      let _this = this
      _this.meetingParticipantCount()
      _this.pickerVisible = moment(new Date()).format('YYYY-MM-DD')
      _this.keyValue = _this.$route.query.keyValue
      _this.list.keyValue = _this.$route.query.keyValue
      _this.params.keyValue = _this.$route.query.keyValue
      ajaxMeetingDetail(_this.keyValue, function (data) {
        _this.list = data
        _this.customList = data.Custom.split(',')
        _this.list.Custom = data.Custom
        console.log(_this.customList)
        _this.temp = JSON.parse(JSON.stringify(_this.customList))
        _this.list.ClosingDate = moment(_this.list.ClosingDate).format('YYYY-MM-DD')
        _this.meetingParticipantCustomCount()
        _this.meetingParticipantCustomUser()
      })
    },
    modify () {
      let _this = this

      if (_this.edit === '编辑') {
        _this.disabled = false
        _this.edit = '提交'
      } else {
        ajaxMeetingEdit(_this.keyValue, _this.list, function (data) {
          console.log(data)
          _this.$router.push({path: '/meeting-list'})
        })
        _this.disabled = true
        _this.edit = '编辑'
      }
    },
    openPicker (data) {
      this.$refs.picker.open()
    },
    handleConfirm (data) {
      let date = moment(data).format('YYYY-MM-DD')
      console.log(date)
      this.pickerVisible = date
    },
    showCustomList () {
      alert(111)
      let _this = this
      console.log(_this.customList)
    },
    participantUser () {
      let _this = this
      _this.participant = ''
      ajaxMeetingParticipantUser(_this.params, function (data) {
        console.log(data)
        for (var i = 0; i < data.length; i++) {
          if (data[i].IsAttended === true) {
            _this.participant += data[i].RealName + ','
          }
        }
        if (_this.participant === '') {
          _this.participant = '暂时无人参加'
        }
      })
    },
    meetingParticipantCustomCount () {
      let _this = this

      ajaxMeetingParticipantCustomCount(_this.list, function (data) {
        console.log('ajaxMeetingParticipantCustomCount')
        console.log(data)
      })
    },
    meetingParticipantCustomUser () {
      let _this = this
      ajaxMeetingParticipantCustomUser(_this.list, function (data) {
        console.log('ajaxMeetingParticipantCustomUser')
        _this.customParticipant = data
      })
    },
    meetingParticipantCount () {
      let _this = this
      _this.params.keyValue = _this.$route.query.keyValue
      ajaxMeetingParticipantCount(_this.params, function (data) {
        console.log('ajaxMeetingParticipantCustomUser')
        console.log(data)
        _this.count = data.count
      })
    }
  }
}
</script>
<style lang="scss">
  .mint-field-core{
    background: white;
  }
</style>

<style lang="scss" scoped>
  .content-wrap {
    padding-top:40px;
    padding-bottom:10px;
  }
  .inputPicker{
    padding: 0 10px;
    line-height: 40px;
    border:1px solid #eee;
    span{
      width: 105px;
      text-align: left;
    }
    input{
      border:none;
      background:white;
    }
  }
  .customize{
    border-radius: 50%;
    background: #4a8dfc;
    height: 30px;
    width: 30px;
    text-align: center;
    line-height: 30px;
    box-sizing: border-box;
    color: white;
  }
  .total-count{
    margin-left:5px;
  }
  .custom-wrap{
    padding:2% 3%;
  }
  .statistics{
    padding:10px 15px;
  }
  .Custom{
    width:98%;
    margin-top:5px;
    padding-left:5px;
    border:1px solid #eee;
    outline:none;
    line-height:40px;
  }
</style>
