//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    isBind: false
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.setData({
      isBind: app.data.isBind
    })
    if (this.data.isBind) {
      wx.redirectTo({
        url: '../main/main',
      })
    } else {
      wx.redirectTo({
        url: '../login/login',
      })
    }
    
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
