//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 登录得到code并后续得到openId
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if(res.code) {
          wx.request({
            url: this.globalData.server + 'getOpenId',
            data: {
              jsCode: res.code
            },
            success: function(e) {
              wx.setStorageSync("openId", e.data.openId);
              if(e.data && e.data.is_bind) {
                this.setData({
                  isBind: true
                })
              } else {
                
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    server: 'http://localhost:5678/pweb/'
  },
  data: {
    isBind: false
  }
})