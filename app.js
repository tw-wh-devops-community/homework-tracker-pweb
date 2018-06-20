App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var that = this;
    // 登录
    wx.login({
      success: res => {
        if (res.code) {
          console.log('code:' + res.code)
          wx.request({
            url: 'http://localhost:5678/pweb/openId',
            data: {
              jsCode: res.code
            },
            method: 'GET',
            success: function (res) {
              that.globalData.openId = res.data.openId

              if (res.data.interviewerName) {
                that.globalData.interviewerName = res.data.interviewerName;
                that.globalData.interviewerId = res.data.interviewerId
              }

              if (that.openIdCallback) {
                that.openIdCallback(res.data)
              }
              console.log('openId: ' + that.globalData.openId)
            }

          })
        } else {
          console.log('登陆失败： ' + res.errMsg)
        }
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              console.log('here is userInfo:' + res.userInfo)
              that.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }

              console.log('userInfo:' + that.globalData.userInfo)
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    interviewerName: null,
    interviewerId: null,
    openId: null,
  }
})