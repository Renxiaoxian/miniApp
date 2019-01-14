// pages/netAge/ChallengeBook/ChallengeBook.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    friendTel:'',
    myTel: '13933184430',
    p1:'',
    getPhone:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      localhost: app.globalData.getImage,
      p1: options.p1
    })
    if(app.globalData.loginPhone){
     this.init()  
    }else{
      this.setData({
        getPhone: false
      })
    }
  },
  init:function()
  {
    var that = this;
    app.ajax({
      reqUrl: 'act1028e',
      method: 'initAcceptPK',
      actCode: '1028',
      param: '2D8165082DECAE8A60096E2CFC50F6AF',
      mobile: that.data.myTel,
      city: '311',
      p1: that.data.p1
    }).then((res) => {
      that.setData({
        friendTel: res.data.resultObj.phone1,
        myTel: res.data.resultObj.phone2
      })
      console.log(res);
    })
  },
  login() {
    app.getCode().then((res) => {
      //reqUrl=act1028e&method=checkMsg&actCode=1028&mobile=13472197474&js_code=023sxEVi2G3EqC0JJTXi29TNVi2sxEV0&verification=670642
      app.ajax({
        reqUrl: 'act1028e',
        method: 'checkMsg',
        actCode: '1028',
        mobile: this.data.myTel,
        js_code: res.code,
        verification: this.data.code
      }).then((data) => {
        if (data.data.resultObj.state == '0') {
          wx.showToast({
            title: data.data.resultObj.msg,
            icon: none,
            duration: 2000
          })
        } else {
          wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 2000
          })
          this.setData({
            getPhone: false
          })
          app.globalData.loginPhone = data.data.resultObj.phone;
          this.init();
        }
        console.log(data)
      })
    })
  },
  inputcode(e) {
    this.setData({
      code: e.detail.value
    })
  },
  /**
   * 输入我的号码
   */
  myTel:function(e){
    this.setData({
      myTel:e.detail.value
    })
  },
  offTel: function () {
    this.setData({
      getPhone: true,
      // offTel: false,
      // show: false,
      // ruleShow: false,
      // getTel: false
    })
  },
  /**
   * 换个号码
   */
  cutTel:function(){
    
  },
  /**
   * 获取验证码
   */
  getCode: function (){
    var phone=this.data.myTel;
    console.log(phone)
    if (!(/^\d{11}$/.test(phone))) {
      wx.hideLoading()
      wx.showToast({
        title: '手机号有误',
        icon: 'none',
        duration: 2000
      })
      return;
    } else if (! /^(((13[4-9]{1})|(14[7]{1})|(15[0-2]{1})|(15[7-9]{1})|(17[8]{1})|(18[2-4]{1})|(18[7-8]{1})|(19[8]{1}))+\d{8})$/.test(phone)) {
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
      param: '2D8165082DECAE8A60096E2CFC50F6AF',
      phone: that.data.myTel,
      city: '311',
      p1: that.data.p1
    }).then((res) => {
      // that.setData({
      //   friendTel: res.data.resultObj.phone1,
      //   myTel: res.data.resultObj.phone2
      // })

      console.log(res);

    })
  },
  getMyTel: function(res){
    this.setData({
      myTel: res.detail.value
    })
  },
  getPrize(type) {
    //判断是否存储过手机号
    if (app.globalData.loginPhone) {
      this.init();
      return false;
    }
    app.getCode().then((res) => {
      app.ajax({
        reqUrl: 'act1028e',
        method: 'doLogin',
        actCode: '1028',
        js_code: res.code
      }).then((data) => {
        if (data.data.resultObj.state == '1') {
          //保存过手机号
          this.setData({
            //phone: data.data.resultObj.phone,
            getTel: true
          })
        } else {
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
  /**
   * 接受挑战
   */
  accep:function(){
    var that=this;
    if(app.globalData.loginPhone){
      app.ajax({
        reqUrl: 'act1028e',
        method: 'acceptPK',
        actCode: '1028',
        param: '2D8165082DECAE8A60096E2CFC50F6AF',
        mobile: that.data.myTel,
        city: '311',
        p1: "8B1CA7C84FFBDF55D690BEEDC4050A42"
      }).then((res) => {
        console.log(res);
        if (res.data.resultCode == 1) {
          if (res.data.resultObj.state == 1) {
            if (res.data.resultObj.pkLog.fLoser == that.data.myTel) {//失败
              wx: wx.navigateTo({
                url: "/pages/netAge/netAgePK/netAgePK?pkGiftId=" + res.data.resultObj.pkid + "&phone=" + that.data.myTel
              })
            } else if (res.data.resultObj.pkLog.fWiner == that.data.myTel) {//成功
              wx: wx.navigateTo({
                url: "/pages/netAge/ChallengeFail/ChallengeFail?pkGiftId=" + res.data.resultObj.pkid + "&phone=" + that.data.myTel
              })
            } else {//平
              wx: wx.navigateTo({
                url: "/pages/netAge/ChallengeFlat/ChallengeFlat?pkGiftId=" + res.data.resultObj.pkid + "&phone=" + that.data.myTel
              })
            }
          } else {
            wx.showToast({
              title: res.data.resultObj.msg,
              icon: 'none',
            })
          }
        } else {
          wx.showToast({
            title: res.data.resultMsg,
            icon: 'none',
          })
        }
      })
    }else{
      this.setData({
        getPhone: false
      })
      
    }
    
  },
  /**
   * 领取礼品
   */
  getPrize:function(){
   wx:wx.navigateTo({
     url: "/pages/netAge/netAgePK/netAgePK?phone=" + this.data.myTel
   })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  /**
   * 点击关闭按钮
   */
  offBook: () => {
    console.log("点击关闭按钮")
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
  onShareAppMessage: function () {

  }
})