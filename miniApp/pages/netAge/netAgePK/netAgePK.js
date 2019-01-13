// pages/netAge/netAgePK/netAgePK.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    basic:'500',
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
    myTel:"13472197474",
    ruleShow: true,
    getPhone: true,
    localhost: 'http://39.96.56.53:8080/static/image/image/'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // if (options){
    //   this.setData({
    //     myTel: options.phone
    //   })
    // }
    this.setData({
      localhost: app.globalData.getImage,
      getTel: true
    })
    var that = this;
    app.ajax({
      reqUrl: 'act1028e',
      method: 'initPage',
      actCode: '1028',
      param: 'null',
      mobile: that.data.myTel,
      city: '0311'
    }).then((res) => {
      if (res.data.resultCode==1){
        if (res.data.resultObj.state!=3){
          var times = res.data.resultObj.times ? res.data.resultObj.times : 2;
          var basic = times > 0 ?that.data.basic:null;
          that.setData({
            times: times,
            // beginTimeDay: res.data.resultObj.beginTimeDay,
            // beginTimeMonth: res.data.resultObj.beginTimeMonth,
            // beginTimeYear: res.data.resultObj.beginTimeYear,
            phone: res.data.resultObj.phone,
            phoneAES: res.data.resultObj.phoneAES,
            total: times * basic / 1000
          })
        }else{
          wx.showToast({
            title: res.data.resultObj.msg,
            icon: 'none',
          })
          setTimeout(function(){
            wx.navigateBack({
              delta: 1
            })
          },2000)
        }
      }else{
        wx.showToast({
          title: res.data.resultMsg,
          icon: 'none',
        })
      }
      
      console.log(res)
    })
  },
  showrule: function () {
    this.setData({
      ruleShow: false
    })
  },
  offRule: function () {
    this.setData({
      ruleShow: true
    })
  },
  getPrize() {
    app.getCode().then((res) => {
      console.log(res)
    })
  },
  goPK(){
    console.log('/pages/netAge/index/index?phone=' + this.data.myTel)
    wx:wx.navigateTo({
      url: '/pages/netAge/index/index?phone='+this.data.myTel
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
  onShareAppMessage: function () {

  }
})