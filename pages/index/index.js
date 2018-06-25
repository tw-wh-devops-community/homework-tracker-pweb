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
  
  }
})
