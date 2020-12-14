//index.js
var md5 = require('../../utils/md5.js');
//获取应用实例
const app = getApp()

Page({
  data: {
    //是否已经登录
    hasUserInfo: false,
    //输入的账号
    userName: null,
    //输入的密码
    passWord: null,
  },
  //获取输入框数据
  getUserName: function(e) {
    this.setData({
      userName: e.detail.value
    })
  },
  getPassWord: function(e) {
    this.setData({
      passWord: e.detail.value
    })
  },
  userLogin: function(user) {
    var passwordMd5=md5.b64Md5(this.data.passWord)
    if(passwordMd5==user.password){
      console.log("登录成功！")
      //保存用户信息
      app.globalData.userInfo = user
      //查询用户是否开启了授权
      wx.getSetting({
        success: res => {
          console.log(res)
          //后台位置授权
          if(!res.authSetting['scope.userLocationBackground']) {
            //未授权请求授权
            wx.authorize({
              scope: 'scope.userLocationBackground',
              fail() {
                //被拒绝后弹窗提醒用户手动开启授权
                wx.showToast({
                 title: '授权失败，请点击右上角设置位置为使用时和离开后！"',
                 icon: 'none',
                 duration: 10000
                })
              }
            })
          }
        }
      })
      wx.startLocationUpdateBackground({
        success(res) {
         console.log('开启后台定位', res)
        },
        fail(res) {
         console.log('开启后台定位失败', res)
        }
       })
      //跳转
      wx.navigateTo({
        url: '../map/map'
      })
    } else{
      //弹框提示登录失败
      wx.showToast({
        title: '登录失败！账户名或密码错误！',
        icon: 'none',
        duration: 2000
      })
    }
  },
  //点击事件处理函数
  bindMapTap: function() {
    if(this.data.userName!=null && this.data.passWord!=null){
      var that = this //非常重要！
      wx.request({
        url: app.globalData.server+'/api/getuser', //接口地址1
        data: {
          tel: this.data.userName
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success (res) {
          console.log(res.data)
          that.userLogin(res.data)
        }
      })
    }
  },

  onLoad: function () {
    //以前登录过就不需要重新登录了
    console.log("登录过吗？"+app.globalData.userInfo)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      wx.navigateTo({
        url: '../map/map'
      })
    }

  }
})
