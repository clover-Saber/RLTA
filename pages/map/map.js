// pages/map/map.js
// 在需要使用的js文件中，导入js
var util = require('../../utils/util.js');
//获取应用实例
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    //初始值
    latitude: {},
    longitude: {},
    array: []
  },

  //特定时间格式
  intDate: function(date){
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return year*10000+month*100+day
  },

  intTime: function(date){
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    return [hour, minute, second].map(formatNumber).join(':')
  },

  onLoad: function () {
    //this.locationWorker()
    var tot = 0
    var that = this
    wx.onLocationChange(function(res) {
      //控制上传频率
      tot = (tot+1)%3
      if(tot==1){
        // 调用函数时，传入new Date()参数，返回值是日期和时间
        var date = that.intDate(new Date())
        var time = util.formatTime2(new Date())
        console.log("一次位置上传："+time,res)
        that.data.array = ["time: "+time+" latitude:"+res.latitude+" longitude:"+res.longitude].concat(that.data.array)
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          array: that.data.array
        });
        wx.request({
          url: app.globalData.server+'/api/uploadLocation', //接口地址1
          data: {
            uid: app.globalData.userInfo.uid,
            date: date,
            time: time,
            lon: res.longitude,
            lat: res.latitude
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success (res) {
            console.log("上传成功")
          },
          fail () {
            console.log("上传失败")
          }
        })
      }
     })
  },
  bindServeyTap: function() {
    
  }

})