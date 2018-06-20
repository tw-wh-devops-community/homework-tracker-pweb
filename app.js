//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    this.getUserInfo();
  },
  globalData: {
    userInfo: null,
    server: 'http://localhost:5678/pweb/',
    interviewerId: '',
    interviewerName: '',
    openId: '',
  },
  getUserInfo: function() {
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              this.globalData.userInfo = res.userInfo;
            }
          })
        }
      }
    })
  }
})