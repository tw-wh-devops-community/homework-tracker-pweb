//login.js

const app = getApp()
Page({
  data: {
    username: '',
    password: '',
    isBind: false,
    show: false,
    selectData: [],
    datashow: false,
    isInputValid: false,
    passReset: false,
  },
  //事件处理函数
  bindViewTap: function() {
   
  },
  onLoad: function () {
    
  },
  selectTap: function() {
    // 发送查询interview信息的接口
    var that = this;
    wx.request({
      url: app.globalData.server + 'interviewer/unbind',
      data: {
        name: this.data.username
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          selectData: res.data,
          show: !that.data.show,
          datashow: !that.data.datashow
        })
      }
    });
  },
  optionTap: function(event) {
    this.setData({
      datashow: false,
      username: event.target.dataset.name.name
    });
    console.log(event.target.dataset.name)
    wx.setStorageSync("interviewerId", event.target.dataset.name._id)
    wx.setStorageSync("interviewerName", event.target.dataset.name.name)
    this.checkInputValid();
  },
  usernameInput: function(e) {
    this.setData({
      username: e.detail.value
    });
    this.checkInputValid();
  },
  passwordInput: function(e) {
    this.setData({
      password: e.detail.value
    });
    this.checkInputValid();
  },
  bindAndLogin: function(e) {
    wx.request({
      url: app.globalData.server + 'openId',
      method: 'POST',
      data: {
        openId: wx.getStorageSync("openId"),
        interviewerId: wx.getStorageSync("interviewerId"),
        code: this.data.password
      },
      success: function(res) {
        if (res.statusCode === 200) {
          app.globalData.isBind = true
          wx.redirectTo({
            url: '../main/main',
          })
        } else {
          wx.showToast({
            title: res.data.message,
          })
        }
      },
      fail: function(err) {
        wx.showToast({
          title: err.message,
        })
      }
    })
  },
  resetTap: function(event) {
    this.setData({
      password: "",
      passReset: !this.data.passReset
    });
    this.checkInputValid();
  },
  checkInputValid: function () {
    if (this.data.username && this.data.password) {
      this.setData({
        isInputValid: true
      });
    } else {
      this.setData({
        isInputValid: false
      });
    }
  }
})
