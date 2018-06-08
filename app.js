//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

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
              if(e.data && e.data.is_bind) {
                this.setData({
                  isBind: true
                })
                wx.showToast({
                  title: '已经绑定了',
                })
              } else {
                console.log('unbind')
                wx.showToast({
                  title: '没有绑定',
                })
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