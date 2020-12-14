// 在需要使用的js文件中，导入js
var md5 = require('../../utils/md5.js');
const app = getApp()
// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gender: null, //性别
    age: '01', //年龄
    area: '110000', //户籍
    income: null, //月收入
    home: null, //居住小区名称
    tel: null, //电话
    date: null, //获取时间
    city: "110000", //现居城市
    password1: null, //设置密码
    password2: null, //确认密码
    ageShow: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    selectAgeDatas: ['0-6岁', '7-12岁', '13-15岁','16-18岁','19-24岁','25-29岁','30-34岁','35-39岁',
                    '40-44岁','45-49岁','50-54岁','55-59岁','60-64岁','65-69岁','70岁以上','未知'], //下拉列表的数据
    ageTo: ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16'],             
    ageIndex: 0, //选择的下拉列表下标

    areaShow: false,
    selectAreaDatas: ['北京市','天津市','河北省','山西省','内蒙古自治区','辽宁省','吉林省',
                     '黑龙江省','上海市','江苏省','浙江省','安徽省','福建省','江西省','山东省',
                     '河南省','湖北省','湖南省','广东省','广西壮族自治区','海南省','重庆市',
                     '四川省','贵州省','云南省','西藏自治区','陕西省','甘肃省','青海省',
                     '宁夏回族自治区','新疆维吾尔自治区',],
    areaTo: ['110000','120000','130000','140000','150000','210000','220000',
            '230000','310000','320000','330000','340000','350000','360000','370000',
            '410000','420000','430000','440000','450000','460000','500000',
            '510000','520000','530000','540000','610000','620000','630000',
            '640000','650000'],
    areaIndex: 0,
    cityShow: false,
    cityIndex: 0,
  },
  getGender: function(e) {
    this.setData({
      gender: e.detail.value
    });
  },
  
  getIncome: function(e) {
    this.setData({
      income: e.detail.value
    });
  },

  getHome: function(e) {
    this.setData({
      home: e.detail.value
    });
  },

  getTel: function(e) {
    this.setData({
      tel: e.detail.value
    });
  },

  getPassword1: function(e) {
    this.setData({
      password1: e.detail.value
    });
  },

  getPassword2: function(e) {
    this.setData({
      password2: e.detail.value
    });
  },

  // 点击下拉显示框
  selectAgeTaps: function() {
    this.setData({
      ageShow: !this.data.ageShow
    });
  },
  // 点击下拉列表
  optionAgeTaps: function(e) {
    var index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    console.log(index)
    this.setData({
      age: this.data.ageTo[index],
      ageIndex: index,
      ageShow: !this.data.ageShow
    });
  },

  // 点击下拉显示框
  selectAreaTaps: function() {
    this.setData({
      areaShow: !this.data.areaShow
    });
  },
  // 点击下拉列表
  optionAreaTaps: function(e) {
    var index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    console.log(index)
    this.setData({
      area: this.data.areaTo[index],
      areaIndex: index,
      areaShow: !this.data.areaShow
    });
  },

 // 点击下拉显示框
 selectCityTaps: function() {
  this.setData({
    cityShow: !this.data.cityShow
  });
},
// 点击下拉列表
optionCityTaps: function(e) {
  var index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
  console.log(index)
  this.setData({
    city: this.data.areaTo[index],
    cityIndex: index,
    cityShow: !this.data.cityShow
  });
},

//特定时间格式
intTime: function(date){
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return year*10000+month*100+day
},

//按下注册键
registerTap: function() {
  var time = this.intTime(new Date());
  this.setData({
    date: time
  });
  if(this.data.gender!=null&&this.data.income!=null&&this.data.home!=null&&this.data.tel!=null&&this.data.password1!=null&&this.data.password2!=null&&this.data.password1==this.data.password2){
    var that = this //非常重要！
    var passwordMd5=md5.b64Md5(this.data.password1)
    console.log("注册"+this.data.tel)
    wx.request({
      url: app.globalData.server+'/api/getuser', //接口地址1
      data: {
        tel: this.data.tel
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res.data)
        if(res.data.uid==null) {
          //手机号未注册
          wx.request({
            url: app.globalData.server+'/api/register', //接口地址1
            data: {
              gender: that.data.gender,
              age: that.data.age,
              area: that.data.area,
              income: that.data.income,
              home: that.data.home,
              tel: that.data.tel,
              date: that.data.date,
              city: that.data.city,
              password: passwordMd5
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success (res) {
              console.log(res.data)
              wx.showToast({
                title: "注册成功！",
                icon: 'none',
                duration: 2000
              })
              wx.navigateTo({
                url: '../index/index'
              })
            }
          })
        }else {
          wx.showToast({
            title: '该手机号已注册！',
            icon: 'none',
            duration: 2000
          })
        } 
      }
    })
    
  }else if(this.data.gender==null||this.data.income==null||this.data.home==null||this.data.tel==null||this.data.password1==null||this.data.password2==null){
    wx.showToast({
      title: '请填写完整信息！',
      icon: 'none',
      duration: 2000
    })
  }else if(this.data.password1!=this.data.password2){
    wx.showToast({
      title: '两次密码不相同！',
      icon: 'none',
      duration: 2000
    })
  }
}

})