//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    //用户信息
    userInfo: {},
    //是否已经登录
    hasUserInfo: false,
    //当前版本是否可用
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //点击事件处理函数
  bindMapTap: function() {
    console.log(this.data.userInfo)
    //先查询一下用户是否授权了 "scope.userLocation" 这个 scope
    wx.getSetting({
      success: res => {
        console.log(res)
        if (!res.authSetting['scope.userLocation']) {
          //未授权
          wx.showToast({
            title: '请开启位置授权！',
            icon: 'none',
            duration: 1500
          })
          /*
          wx.openSetting({
          })*/
        }
      }
    })
    //跳转
    wx.navigateTo({
      url: '../map/map'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
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
