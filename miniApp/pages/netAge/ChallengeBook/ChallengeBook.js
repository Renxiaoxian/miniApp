// pages/netAge/ChallengeBook/ChallengeBook.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    friendTel:'',
    myTel: '13933184430',
    p1:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      localhost: app.globalData.getImage,
      p1: options.p1
    })
    var that=this;
    app.ajax({
      reqUrl:'act1028e',
      method:'initAcceptPK',
      actCode:'1028',
      param:'2D8165082DECAE8A60096E2CFC50F6AF',
      mobile:that.data.myTel,
      city:'311',
      p1: that.data.p1
    }).then((res)=>{
      that.setData({
        friendTel:res.data.resultObj.phone1,
        myTel: res.data.resultObj.phone2
      })
      
      console.log(res);

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
    var that=this;
    app.ajax({
      reqUrl: 'act1028e',
      method: 'acceptPK',
      actCode: '1028',
      param: '2D8165082DECAE8A60096E2CFC50F6AF',
      mobile: "13933184430",
      city: '311',
      p1: "8B1CA7C84FFBDF55D690BEEDC4050A42"
    }).then((res) => {
      console.log(res)
      if (res.data.resultObj.state == 1) {
        console.log(res)
        app.ajax({
          reqUrl: 'act1028e',
          method: 'acceptPK',
          actCode: '1028',
          param: '2D8165082DECAE8A60096E2CFC50F6AF',
          mobile: res.data.resultObj.phone2,
          city: '0311',
          pkGiftId: options.pkid
        }).then((result) => {
          // wx.navigateTo({
          //   url: "/pages/netAge/ChallengeSuccess/ChallengeSuccess?pkid=" + res.data.resultObj.pkid
          // })
          console.log(result)
        })
      } else {
        wx.showToast({
          title: res.data.resultObj.msg,
          icon: 'none',
        })
      }
    })
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