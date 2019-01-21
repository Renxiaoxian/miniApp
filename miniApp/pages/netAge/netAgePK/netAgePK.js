const app = getApp()
// pages/netAge/netAgePK/netAgePK.js
let util = require('../../../utils/storage.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false, 
    basic:'',
    total:'?',
    circle_active:'circle_active',
    beginTimeDay: '',
    beginTimeMonth: '',
    beginTimeYear: '',
    channel: '',
    lqzxUrl: '',
    phone: '',
    phoneAES: '',
    times:'0',
    ruleShow: false,
    getPhone: false,
    localhost: 'http://39.96.56.53:8080/static/image/image/',
    code: '',
    priceDisabled:true
  },
  lingqv(){
    if (this.data.state =="1"){
      this.setData({
        show:true
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    wx.getStorage({
      key: 'loginInfo',
      success(res) {
        console.log(res)
        app.globalData.loginInfo = res.data
        _this.setData({
          phone:res.data.phone,
          getTel:true
        })
        _this.init(res.data.phone)
      },
      fail(err){
        _this.setData({
          getPhone: true
        })
      }
    })
  },
  showrule: function () {
    this.setData({
      ruleShow: true
    })
  },
  login(){
    app.ajax({
      reqUrl: 'act1028e',
      method: 'checkMsg',
      actCode: '1028',
      mobile: this.data.phone,
      verification: this.data.code
    }).then((data) => {
      console.log(data)
      if (data.data.resultObj.state == '0') {
        wx.showToast({
          title: '验证失败',
          icon: 'none',
          duration: 2000
        })
      } else {
        wx.showToast({
          title: '登录成功',
          icon: 'success',
          duration: 2000
        })
        // app.globalData.phoneAES = data.data.resultObj.phoneAES
        this.setData({
          phone: data.data.resultObj.phone,
          getPhone:false
        })
        this.init(data.data.resultObj.phone)

      }
    })
  },
  openFn(){
    this.setData({
      getPhone: false,
      getTel: false
    })
  },
  inputcode(e){
    console.log(e)
    this.setData({
      code:e.detail.value
    })
  },
  offTel:function () {
    this.setData({
      getPhone: false,
      offTel:false,
      show:false,
      ruleShow:false,
      getTel:false,
      show:false
    })
  },
  goApp(){
    wx.navigateTo({
      url: '/pages/netAge/webView/webView?lqzxUrl=' + encodeURIComponent("https://www.he.10086.cn/app/ecu/resource/download/html/index.html")
    })
  },
  init(phone){
    console.log(phone)
    var that = this;
    app.ajax({
      reqUrl: 'act1028e',
      method: 'initPage',
      actCode: '1028',
      param: 'null',
      mobile: phone,
      city: '0311'
    }).then((res) => {
      if (res.data.resultCode == 1) {
        if (res.data.resultObj.state != 3) {
          wx.setStorage({
            key: 'loginInfo',
            data:res.data.resultObj
          })
          var times = res.data.resultObj.times ? res.data.resultObj.times : 2;
          that.setData({
            times: times,
            basic: res.data.resultObj.prize,
            phone: res.data.resultObj.phone,
            phoneAES: res.data.resultObj.phoneAES,
            total: res.data.resultObj.totalprize,
            state: res.data.resultObj.state,
            priceDisabled:true
          })
          app.globalData.phoneAES = res.data.resultObj.phoneAES
          if(this.data.fn == "share"){
            this.onShareAppMessage({ from: "button" });
          }
        } else {
          wx.showToast({
            title:  res.data.resultObj.msg,
            icon: 'none',
            duration: 2000
          })
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 2000)
        }
      } else {
        wx.showToast({
          title: res.data.resultMsg,
          icon: 'none',
          duration: 2000
        })
      }

      console.log(res)
    })
  },
  getPrize(type) {
    //判断是否存储过手机号
    if (app.globalData.loginPhone){
      console.log(app.globalData.loginPhone)
      this.init();
      return false;
    }
    if (util.get('phone')) {
      //保存过手机号
      this.setData({
        phone: util.get('phone'),
        getTel: true
      })
      app.globalData.loginPhone = util.get('phone')
    } else {
      this.setData({
        getPhone: true,
        priceDisabled: true
      })

    }
  },
  cut(){
    this.setData({
      getPhone: true,
      getTel:false
    })
  },
  /**
   *获取输入手机号
   */
  inputPhone(e){
    this.setData({
      phone: e.detail.value
    })
  },
  /**
   * 获取验证码
   */
  sendCode(){
    if(this.data.time > 0){
     return false;
    }
    let phone = this.data.phone;
   if (! /^(((13[4-9]{1})|(14[7]{1})|(15[0-2]{1})|(15[7-9]{1})|(17[8]{1})|(18[2-4]{1})|(18[7-8]{1})|(19[8]{1}))+\d{8})$/.test(phone)) {
      wx.showToast({
        title: '请输入移动手机号',
        icon: 'none',
        duration: 2000
      })
      return
    }
    var that = this;
    app.ajax({
      reqUrl: 'act1028e',
      method: 'sendMsg',
      actCode: '1028',
      mobile: that.data.phone,
    }).then((res) => {
      console.log(res)
      if(res.data.success){
        wx.showToast({
          title: '发送成功',
          icon:'success',
          duration:2000
        })
        this.setData({
          time: 60
        })
        this.outTime()
      }else{
        wx.showToast({
          title:'发送失败',
          icon: 'none',
          duration: 2000
        })
      }
      // that.setData({
      //   friendTel: res.data.resultObj.phone1,
      //   myTel: res.data.resultObj.phone2
      // })
      

    })
  },
  outTime: function () {
    var that = this
    setTimeout(function () {
      var time = this.data.time - 1
      this.setData({
        time: time
      })
      if (time > 0) {
        this.outTime()
      }
    }.bind(that), 1000)

  },
  goPK(){
    if(app.globalData.loginPhone){
      wx.navigateTo({
        url: '/pages/netAge/index/index?phone='+this.data.phone
      })
    }else{
      this.setData({
        fn:'gopk'
      })
      this.getPrize()
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShare(){
    this.setData({
      fn:'init'
    })
    if(app.globalData.loginPhone){
      this.onShareAppMessage({from:"button"})
    }else{
      this.getPrize()

    }
    // this.openFn();
   
  },
  onShareAppMessage: function (ops) {
    return {
      title: '人人有新年礼，PK再赢话费，快来挑战我吧！',
      imageUrl: this.data.localhost + 'shareImage.jpg',
      desc: '',
      path: 'pages/netAge/ChallengeBook/ChallengeBook?p1=' + this.data.phoneAES,  //点击分享的图片进到哪一个页面
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})
