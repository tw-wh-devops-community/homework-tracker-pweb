App({
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    var that = this
    this.getUserInfo();
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
              console.log('here is app')
              wx.setStorageSync("openId", e.data.openId);
              that.globalData.openId = e.data.openId
              if (e.data && e.data.interviewerId) {
                wx.setStorageSync("interviewerId", e.data.interviewerId)
                wx.setStorageSync("interviewerName", e.data.interviewerName)
                that.globalData.isBind = true
              } else {
                that.globalData.isBind = false
              }
              if (that.openIdCallback) {
                that.openIdCallback(e.data)
              }
            }
          })
        }
      },
      fail: function(e) {
        wx.showToast({
          title: e.errMsg,
        })
      }
    })
  },

  globalData: {
    userInfo: null,
    server: 'http://192.168.1.106:5678/pweb/',
    interviewerId: '',
    interviewerName: '',
    openId: null,
    isBind: false,
    isAuthor: null,
  },

  getUserInfo: function() {
    wx.getSetting({
      success: function (res) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
        if (res.authSetting['scope.userInfo']) {
          var that = getApp()
          // that.globalData.isAuthor = true
          wx.getUserInfo({
            success: function (res) {
              console.log('this is in function')
              console.log(res.userInfo.nickName)
              
              that.globalData.userInfo = res.userInfo;
              
              if (that.userInfoCallback) {
                that.userInfoCallback(res.userInfo);
              }
            }
          })}
        // } else {
        //   that.globalData.isAuthor = false;
        // };
          
        }
      })
  },
  onShow: function() {
    // this.onLaunch();
  }
})