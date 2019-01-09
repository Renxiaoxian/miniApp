// pages/netAge/ChallengeBook/ChallengeBook.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    friendTel:13333333333,
    myTel: 13812113211,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      localhost: app.globalData.getImage
    }),
    app.ajax({
      reqUrl:'act1028e',
      method:'initAcceptPK',
      actCode:'1028',
      param:'2D8165082DECAE8A60096E2CFC50F6AF',
      mobile:'13933184430',
      city:'311',
      P1: "8CFDAEA99068AF40AAE42AABC73155E4"
    }).then((res)=>{
      console.log(res)
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
  /**
   * 换个号码
   */
  cutTel:function(){
    
  },
  /**
   * 接受挑战
   */
  accep:function(){
    console.log("接受挑战")
  },
  /**
   * 领取礼品
   */
  getPrize:function(){
    console.log("领取礼品")
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