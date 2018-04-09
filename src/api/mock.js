import Mock from 'mockjs'

Mock.setup({
  // 表示响应时间介于 1000 和 3000 毫秒之间，默认值是'10-100'。
  timeout: '100-1000'
})

// 获取应用打开地址
Mock.mock(/(\/wsinghai\/test)/, {
  'msg': 'im msg',
  'msgCode': 200,
  'msgDesc': 'im msgDesc'
})
