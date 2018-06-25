//index.js
//获取应用实例
const app = getApp()
var util = require('../../utils/util.js');
Page({
  data: {
    isBind: false,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },


  onLoad: function() {
    var that = this
    if (app.globalData.userInfo == null) {
      app.userInfoCallback = data => {
        that.setData({
          userInfo: data,
          hasUserInfo: true,
        })
        
      };
    } else {
      that.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
      })
    };
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
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
                  // url: '../login/login',
                })
              } else {
                wx.redirectTo({
                  url: '../login/login',
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

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    });
  }
})