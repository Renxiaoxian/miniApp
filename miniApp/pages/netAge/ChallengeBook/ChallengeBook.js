// pages/netAge/ChallengeBook/ChallengeBook.js
const app = getApp()
let util = require('../../../utils/storage.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    friendTel:'',
    myTel: '',
    p1:'',
    getPhone:true,
    hiddenBox:false,
    code:'',
    time:0,
    getTel:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      localhost: app.globalData.getImage,
      p1: options.p1,
      // p1:'8B1CA7C84FFBDF55D690BEEDC4050A42',
      myTel: app.globalData.loginPhone
    })
    this.init()
    if(!app.globalData.loginPhone){
      this.setData({
        // getPhone: false,
        hiddenBox: true
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
    app.ajax({
      reqUrl: 'act1028e',
      method: 'checkMsg',
      actCode: '1028',
      mobile: this.data.myTel,
      verification: this.data.code
    }).then((data) => {
      console.log(data)
      if (data.data.resultObj.state == '1') {
        wx.showToast({
          title: '登录成功',
          icon: 'success',
          duration: 2000
        })
        this.setData({
          getPhone: true,
          hiddenBox: false,
          myTel: this.data.myTel
        })
        util.put('phone', this.data.myTel, 172800)
        app.globalData.loginPhone = this.data.myTel;
        this.init();
      } else {
        wx.showToast({
          title: data.data.resultObj.msg,
          icon: 'none',
          duration: 2000
        })
      }
      console.log(data)
    })
  },
  inputCode(e) {
    this.setData({
      code: e.detail.value
    })
    console.log(this.data.code)
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
      getTel: true
    })
  },
  cut() {
    this.setData({
      getPhone: false,
      getTel: true
    })
  },
  /**
   * 获取验证码
   */
  getCode: function (){
    if (this.data.time > 0) {
      return false;
    }
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
      mobile: that.data.myTel,
      city: '311',
    }).then((res) => {
      // that.setData({
      //   friendTel: res.data.resultObj.phone1,
      //   myTel: res.data.resultObj.phone2
      // })
      if (res.data.success) {
        wx.showToast({
          title: '发送成功',
          icon: 'success',
          duration: 2000
        })
        this.setData({
          time: 60
        })
        this.outTime()
      } else {
        wx.showToast({
          title: '发送失败',
          icon: 'none',
          duration: 2000
        })
      }
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
    if (util.get('phone')) {
      //保存过手机号
      this.setData({
        myTel: util.get('phone'),
        getTel: false
      })
    } else {
      this.setData({
        getPhone: false
      })
    }
  },
  setPhone:function(){
    this.setData({
      getTel:true,
      hiddenBox:false
    })
    app.globalData.loginPhone = this.data.myTel
  },
  outTime: function () {
    var that = this
    setTimeout(function () {
      // console.log(this.data.time)
      var time = this.data.time - 1
      this.setData({
        time: time
      })
      if (time > 0) {
        this.outTime()
      }
    }.bind(that), 1000)

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
        p1: that.data.p1
      }).then((res) => {
        console.log(res);
        if (res.data.resultCode == 1) {
          if (res.data.resultObj.state == 1) {
            if (res.data.resultObj.pkLog.fLoser == that.data.myTel) {//失败
              wx: wx.navigateTo({
                url: "/pages/netAge/ChallengeFail/ChallengeFail?pkGiftId=" + res.data.resultObj.pkid + "&phone=" + that.data.myTel
              })
            } else if (res.data.resultObj.pkLog.fWiner == that.data.myTel) {//成功
              wx: wx.navigateTo({
                url: "/pages/netAge/ChallengeSuccess/ChallengeSuccess?pkGiftId=" + res.data.resultObj.pkid + "&phone=" + that.data.myTel
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
      // this.setData({
      //   getPhone: false
      // })
      this.getPrize();
    }
    
  },
  /**
   * 领取礼品
   */
  goGetPrize:function(){
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