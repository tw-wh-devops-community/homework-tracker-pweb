//app.js
App({
  onLaunch: function (options) {
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var that = this;
        if (res.code) {
          wx.request({
            url: this.globalData.server + 'openId',
            data: {
              jsCode: res.code
            },
            success: function (e) {
              wx.setStorageSync("openId", e.data.openId);
              if (e.data && e.data.interviewerId) {
                wx.setStorageSync("interviewerId", e.data.interviewerId)
                wx.setStorageSync("interviewerName", e.data.interviewerName)
                wx.reLaunch({
                  url: '/pages/main/main',
                })
              } else {
                wx.reLaunch({
                  url: '/pages/login/login',
                })
              }
            },
            fail: function (e) {
              wx.showToast({
                title: e.errMsg,
              })
            }
          })
        }
      }
    })
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