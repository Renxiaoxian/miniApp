const app = getApp()
// pages/netAge/netAgePK/netAgePK.js

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
    phone: '13472197474',
    phoneAES: '',
    times:'0',
    ruleShow: false,
    getPhone: false,
    localhost: 'http://39.96.56.53:8080/static/image/image/',
    code: '175188'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.loginPhone){
      this.init();
    }
    // if (options){
    //   this.setData({
    //     myTel: options.phone
    //   })
    // }
    this.setData({
      localhost: app.globalData.getImage,
      getTel: false
    })
   
  },
  showrule: function () {
    this.setData({
      ruleShow: true
    })
  },
  login(){
    app.getCode().then((res)=>{
      //reqUrl=act1028e&method=checkMsg&actCode=1028&mobile=13472197474&js_code=023sxEVi2G3EqC0JJTXi29TNVi2sxEV0&verification=670642
      app.ajax({
        reqUrl:'act1028e',
        method:'checkMsg',
        actCode:'1028',
        mobile:this.data.phone,
        js_code:res.code,
        verification:this.data.code
      }).then((data)=>{
        if (data.data.resultObj.state == '0'){
          wx.showToast({
            title: data.data.resultObj.msg,
            icon: none,
            duration:2000
          })
        }else{
          wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 2000
          })
          this.setData({
            getPhone:false
          })
          app.globalData.loginPhone = data.data.resultObj.phone;
          this.init();
        }
        console.log(data)
      })
    })
  },
  inputcode(e){
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
      getTel:false
    })
  },
  init(){
    var that = this;
    app.ajax({
      reqUrl: 'act1028e',
      method: 'initPage',
      actCode: '1028',
      param: 'null',
      mobile: that.data.phone,
      city: '0311'
    }).then((res) => {
      if (res.data.resultCode == 1) {
        if (res.data.resultObj.state != 3) {
          var times = res.data.resultObj.times ? res.data.resultObj.times : 2;
          var basic = times > 0 ? that.data.basic : null;
          that.setData({
            times: times,
            // beginTimeDay: res.data.resultObj.beginTimeDay,
            // beginTimeMonth: res.data.resultObj.beginTimeMonth,
            // beginTimeYear: res.data.resultObj.beginTimeYear,
            basic: res.data.resultObj.prize,
            phone: res.data.resultObj.phone,
            phoneAES: res.data.resultObj.phoneAES,
            total: res.data.resultObj.totalprize,
            msg: res.data.resultObj.msg,
            getTel:false
          })
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
      this.init();
      return false;
    }
    app.getCode().then((res) => {
      app.ajax({
        reqUrl: 'act1028e',
        method: 'doLogin',
        actCode: '1028',
        js_code:res.code
      }).then((data) => {
        if (data.data.resultObj.state == '1'){
          //保存过手机号
          this.setData({
            //phone: data.data.resultObj.phone,
            getTel:true
          })
        }else{
          console.log(this.data.getPhone)
          this.setData({
            getPhone: true
          })
          console.log(this.data.getPhone)
        }
        
      })
      console.log(res)
    })
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
          title:'123',
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
      console.log(this.data.time)
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
    wx:wx.navigateTo({
      url: '/pages/netAge/index/index?phone='+this.data.phone
    })
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
    let that = this
    if(app.globalData.loginPhone){

    }else{
      that.setData({
        getPhone:true
      })
    }
  },
  showInput(){
    
  },
  onShareAppMessage: function (ops) {
    console.log(ops)
    if (ops.from === 'button') {
      if (app.globalData.loginPhone) {
        return {
          title: '人人有新年礼，PK再赢话费，快来挑战我吧！',
          imageUrl: ``,
          desc: '',
          path: `pages/index/index`, //点击分享的图片进到哪一个页面
          success: function (res) {
            // 转发成功
            console.log("转发成功:" + JSON.stringify(res));
          },
          fail: function (res) {
            // 转发失败
            console.log("转发失败:" + JSON.stringify(res));
          }
        }
      } else {
        this.setData({
          getPhone: false
        })
        return false
      }
      // 来自页面内转发按钮
      
    }else{
      return {
        title: '河北移动',
        desc: '网龄PK大赛',
        path: `pages/netAge/netAgePK/netAgePK`, //点击分享的图片进到哪一个页面
        success: function (res) {
          // 转发成功
          console.log("转发成功:" + JSON.stringify(res));
        },
        fail: function (res) {
          // 转发失败
          console.log("转发失败:" + JSON.stringify(res));
        }
      }
    }
  }
})
