//login.js

Page({
  data: {
    username: '',
    password: '',
    isBind: false,
    show: false,
    selectData: ['huhx dev', 'linux pm', 'chen ba', 'wangji qa', '胡红翔 dev', '胡红翔 dev', '胡红翔 dev'],
    datashow: false,
    isInputValid: false
  },
  //事件处理函数
  bindViewTap: function() {
   
  },
  onLoad: function () {
    
  },
  selectTap: function() {
    this.setData({
      show: !this.data.show,
      datashow: !this.data.datashow
    });
  },
  optionTap: function(event) {
    this.setData({
      datashow: false,
      username: event.target.dataset.name.split(' ')[0]
    });
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
    wx.showToast({
      title: 'login in ',
    })
    wx.redirectTo({
      url: '../main/main',
    })
  },
  resetTap: function(event) {
    this.setData({
      password: ""
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
