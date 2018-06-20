//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
  },
  globalData: {
    userInfo: null,
    server: 'http://localhost:5678/pweb/',
    interviewerId: '',
    interviewerName: '',
    openId: '',
    isBind: false
  },
  data: {
    isBind: false
  }
})