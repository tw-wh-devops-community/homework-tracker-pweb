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
    // 登录得到code并后续得到openId
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var that = this;
        if (res.code) {
          wx.request({
            url: app.globalData.server + 'openId',
            data: {
              jsCode: res.code
            },
            success: function (e) {
              wx.setStorageSync("openId", e.data.openId);
              if (e.data && e.data.interviewerId) {
                wx.setStorageSync("interviewerId", e.data.interviewerId)
                wx.setStorageSync("interviewerName", e.data.interviewerName)
                wx.redirectTo({
                  url: '../main/main',
                })
              } else {
                wx.redirectTo({
                  url: '../login/login',
                })
              }
            }
          })
        }
      }
    })
  }
})
