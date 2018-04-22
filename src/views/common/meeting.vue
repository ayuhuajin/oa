<template>
  <div id="#sendDetail">
    <mt-header fixed title="活动会议组织">
      <router-link to="/meeting-list" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <router-link to="" slot="right">
        <mt-button @click="meetingAdd" >{{add}}</mt-button>
      </router-link>
    </mt-header>
    <div class="content-wrap">
      <mt-field label="主题：" placeholder="请输入主题" v-model="list.Title"></mt-field>
      <mt-field label="内容描述：" placeholder="请输入内容描述" type="textarea" rows="4" v-model="list.MeetingContent"></mt-field>
      <mt-field label="发起人：" placeholder="请输入发起人" v-model="list.Initiator"></mt-field>
      <div class="inputPicker">
        <span>截止时间:</span>
        <input type="text" readonly="" placeholder="请输入校对日期" @click='openPicker()' v-model='list.ClosingDate'>
      </div>
      <div class="custom-wrap">
        <span>自定义：</span><span class="customize" @click="addCustom">+</span>
        <!-- <input class="q" id="Custom" type="text" name="" v-model="customize" placeholder="请输入自定义内容" list="cars"> -->
        <input class="Custom" type="text" placeholder="请输入自定义内容" v-model="item.value" v-for="(item, index) in customList" :key="index">
        <!-- <datalist id="cars">
            <option v-model="takecar">
            <option v-model="'用餐'">
            <option v-model="'住宿'">
        </datalist> -->
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
    <oatree :showtree="show" @callback="treeCallback"></oatree>
  </div>
</template>

<script>
import moment from 'moment'
import { ajaxMeetingAdd } from '../../api/api.js'
import oatree from '../../components/oatree'
export default {
  name: 'meeting',
  components: {
    oatree
  },
  data () {
    return {
      msg: '活动会议组织',
      add: '创建',
      takecar: '3525',
      show: false,
      customNum: 3,
      keyValue: '',
      pickerVisible: '',
      startDate: new Date('1970-01-01'),
      endDate: new Date('2080-12-30'),
      disabled: true,
      downloadUrl: [],
      chooseDate: '',
      customList: [
        {
          value: ''
        }
      ],
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
    }
  },
  methods: {
    init: function () {
      let _this = this

      _this.pickerVisible = moment(new Date()).format('YYYY-MM-DD')
      _this.keyValue = _this.$route.query.keyValue
      _this.list.ClosingDate = moment(_this.list.ClosingDate).format('YYYY-MM-DD')
    },
    meetingAdd () {
      // let _this = this

      // ajaxMeetingAdd(_this.list, function (data) {
      //   _this.$router.push({path: '/meeting-list'})
      // })
      let _this = this
      if (_this.list.Participant.length !== 0) {
        console.log(_this.customList)
        for (var i = 0; i < _this.customList.length; i++) {
          if (i < _this.customList.length - 1) {
            _this.list.Custom += _this.customList[i].value + ','
          } else {
            _this.list.Custom += _this.customList[i].value
          }
        }

        ajaxMeetingAdd(_this.list, function (data) {
          console.log(data)
          _this.$router.push({path: '/meeting-list'})
          console.log(data)
        })
      } else {
        this.show = true
      }
    },
    addCustom () {
      let _this = this
      let params = {
        value: ''
      }
      _this.customList.push(params)
    },
    openPicker (data) {
      this.$refs.picker.open()
    },
    handleConfirm (data) {
      let date = moment(data).format('YYYY-MM-DD')
      console.log(date)
      this.pickerVisible = date
    },
    treeCallback (data) {
      let _this = this
      _this.show = false
      for (var i = 0; i < data.length; i++) {
        if (i < data.length - 1) {
          _this.list.Participant += data[i] + ','
        } else {
          _this.list.Participant += data[i]
        }
      }
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
  .custom-wrap{
    padding:2% 3%;
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
