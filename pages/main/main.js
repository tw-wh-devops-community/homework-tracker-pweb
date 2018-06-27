//login.js
var util = require('../../utils/util.js');
const app = getApp();
Page({
  data: {
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    unfinishedHomework: [],
    finishNum: null,
    interviewerName: null,
    interviewerId: '',
    currentYear: null,
    hasUserInfo: false,
    hasHomework: false,
    isLoading: true,
    noAuthor: false,
    hidden: true
  },
  //事件处理函数
  bindViewTap: function () {

  },

  getHomeWorks: function (interviewerId, that) {
    // wx.showLoading({
    //   title: 'loading....',
    // })
    wx.request({
      url: app.globalData.server + 'assignment/' + interviewerId,
      success: function (res) {
        // wx.hideLoading()
        var unfinishedHomeworks = [];
        for (var i = 0; i < res.data.unfinished.length; i++) {
          var item = res.data.unfinished[i]
          var single_homework = {}
          single_homework.candidate_name = item.candidate_name
          single_homework.assigned_date = that.getDateString(item.assigned_date)
          single_homework.deadline_date = that.getDateString(item.deadline_date)
          single_homework.remain_hours = that.getRemainHours(item.deadline_date)
          single_homework.remain_time_str = that.getRemainTimeStr(item.deadline_date)
          unfinishedHomeworks[i] = single_homework
        }

        unfinishedHomeworks.sort(function (object1, object2) {
          var val_1 = object1.remain_hours;
          var val_2 = object2.remain_hours;

          if (val_1 < val_2) {
            return -1;
          }
          if (val_1 == val_2) {
            return 0;
          }
          if (val_1 > val_2) {
            return 1;
          }
        })
        that.setData({
          finishNum: res.data.numberOfFinished,
          unfinishedHomework: unfinishedHomeworks,
          hasHomework: true,
        })

        console.log('interviewer: ' + that.data.finishNum)
      }
    })
  },

  onLoad: function () {
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
    }

    if (app.globalData.openId == null || app.globalData.openId == '') {
      app.openIdCallback = function (data) {
        wx.setStorageSync("openId", data.openId);
        if (data && data.interviewerId) {
          wx.setStorageSync("interviewerId", data.interviewerId)
          wx.setStorageSync("interviewerName", data.interviewerName)
          app.globalData.isBind = true
          console.log('here is callback!')
          // that.loadHomeworkData()
        }
      }
    } else if (app.globalData.isBind) {
      // that.loadHomeworkData()
    }
    console.log('here is load!')
  },

  hideLoading: function () {
    wx.hideLoading()
  },

  onReady: function () {
    var that = this
  },

  onPullDownRefresh: function () {
    // wx.showNavigationBarLoading() //在标题栏中显示加载
    this.loadHomeworkData();
    wx.stopPullDownRefresh();
  },

  loadHomeworkData: function () {
    var that = this
    that.setData({
      currentYear: that.getCurrentYear()
    });
    var interviewerName = wx.getStorageSync('interviewerName');
    that.setData({
      interviewerName: interviewerName
    });
    var interviewerId = wx.getStorageSync('interviewerId');
    that.getHomeWorks(interviewerId, that)
  },

  getRemainHours: function (deadline_date) {
    var now = new Date();
    var deadline = new Date(deadline_date);
    var secs = deadline.getTime() - now.getTime();

    var hours = secs / (1000 * 3600);
    var result = Math.round(hours * 10) / 10;
    return result;
  },

  getRemainTimeStr: function (deadline_date) {
    var now = new Date();
    var deadline = new Date(deadline_date);
    var secs = deadline.getTime() - now.getTime();

    var hours = parseInt(secs / (1000 * 3600))
    var mins = Math.round((secs % (1000 * 3600)) / (1000 * 60))

    return hours.toString() + "hour " + mins.toString() + "min";
  },

  getDateString: function (raw_date_string) {
    var date = new Date(raw_date_string)
    var date_string = util.formatTime(date)
    return date_string
  },

  getCurrentYear: function () {
    var date = new Date()
    return date.getFullYear()
  },

  getUserInfo: function (e) {
    if (!app.globalData.isBind) {
      wx.redirectTo({
        url: '/pages/login/login',
      })
    } 
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    });
  },
  onShow: function () {
    var that = this;
    wx.request({
      url: app.globalData.server + 'queryOpenIdBind',
      data: {
        openId: wx.getStorageSync("openId")
      },
      success: function (e) {
        if (e.data.bind) {
          that.loadHomeworkData();
        } else {
          wx.redirectTo({
            url: '/pages/login/login',
          })
        }
      }
    })
  }
})
