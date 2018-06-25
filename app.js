App({
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    console.log('this is on launch!')
    var that = this
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
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              console.log('this is in function')
              console.log(res.userInfo.nickName)
              var that = getApp()
              that.globalData.userInfo = res.userInfo;

              if (that.userInfoCallback) {
                that.userInfoCallback(res.userInfo);
              }
            }
          })
        };
          
        }
      })
  }
})