//index.js
//获取应用实例
const app = getApp()
var util = require('../../utils/util.js');
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    unfinishedHomework: [],
    finishNum: 0,
    openId: '',
    interviewerName: '',
    interviewerId: '',
    currentYear: null,
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  getHomeWorks: function (interviewerId, that) {
    wx.request({
      url: 'http://localhost:5678/pweb/assignment/' + interviewerId,
      success: function (res) {
        console.log(res)
        console.log('response:' + res.data.numberOfFinished);
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
        })
        console.log('interviewer: ' + that.data.finishNum)
      }
    })
  },

  onLoad: function () {
    var that = this

    that.setData({
      currentYear: that.getCurrentYear()
    });

    if (app.globalData.openId && app.globalData.openId != '') {
      that.setData({
        openId: app.globalData.openId,
        interviewerName: app.globalData.interviewerName,
        interviewerId: app.globalData.interviewerId,
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      });
      that.getHomeWorks(that.data.interviewerId, that)
    } else if (app.globalData.openId == null || app.globalData.openId == '') {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      // app.UserInfoReadyCallback = res => {
      //   that.setData({
      //     userInfo: res.userInfo,
      //     hasUserInfo: true
      //   })
      // }

      app.openIdCallback = data => {
        console.log('openidcallback:' + data)
        that.setData({
          openId: data.openId,
          interviewerName: data.interviewerName,
          interviewerId: data.interviewerId,
        });
        that.getHomeWorks(that.data.interviewerId, that)
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          that.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    console.log('id:' + this.data.interviewerId)
  },

  getUserInfo: function (e) {
    console.log('getUserInfo:' + e.detail.userInfo)
    app.globalData.userInfo = e.detail.userInfo

    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    console.log('userInfo: ' + this.data.userInfo.nickName)

  },
  getInterviewInfo: function (openId) {
    wx.request({
      url: 'localhost:5678/',
    })
  },
  isOutOfTime: function (finishTime) {
    var now = util.formatTime(new Date());
    return now < finishTime
  },

  getRemainHours: function (deadline_date) {
    var now = new Date();
    var deadline = new Date(deadline_date);
    var secs = deadline.getTime() - now.getTime();

    var hours = secs/(1000*3600);
    var result = Math.round(hours * 10)/10;
    return result;
  },

  getRemainTimeStr: function(deadline_date) {
    var now = new Date();
    var deadline = new Date(deadline_date);
    var secs = deadline.getTime() - now.getTime();

    var hours = parseInt(secs/(1000*3600))
    var mins = Math.round((secs%(1000*3600))/(1000*60))

    return hours.toString() + "hour " + mins.toString() + "min"; 
  },

  getDateString: function(raw_date_string) {
    var date = new Date(raw_date_string)
    var date_string = util.formatTime(date)
    return date_string
  },

  getCurrentYear: function() {
    var date = new Date()
    return date.getFullYear()
  }
})
