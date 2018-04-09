<template>
  <div>{{msg}}</div>
</template>

<script>
import { ajaxLogin } from '../../api/api.js'
export default {
  name: 'app',
  data () {
    return {
      msg: '会议列表'
    }
  },
  mounted () {
    ajaxLogin()
  }
}
</script>
