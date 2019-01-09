// pages/netAge/index/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //是否显示modal
    show: false,
    lqzxUrl:'',
    phone:'',
    phoneAES:'',
    pkRecord: [
      {
        date:'2019.01.03',
        list:[{
          message: 'foo',
        }, {
            message: 'bar'
          }]
      },
      {
        date: '2019.01.03',
        list: [{
          message: 'foo',
        }, {
          message: 'bar'
        }]
      }
    ]
  },
  clickMask() {
    // this.setData({show: false})
  },

  cancel() {
    this.setData({ show: false })
    this.triggerEvent('cancel')
  },

  confirm() {
    this.setData({ show: false })
    this.triggerEvent('confirm')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    this.setData({
      localhost: app.globalData.getImage
    }),
      app.ajax({
        reqUrl: 'act1028e',
        method: 'initPK',
        actCode: '1028',
        param: 'null',
        mobile: '13933184430',
        city: '0311'
      }).then((res) => {
        that.data.lqzxUrl = res.data.resultObj.lqzxUrl
        console.log(res.data);
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  // 活动规则
  rule:function(){
    console.log("活动规则")
  },
  // 去激活
  activation: function () {
    wx.navigateTo({
      url: '/pages/netAge/webView/webView?lqzxUrl=' + encodeURIComponent(this.data.lqzxUrl)
    })
  },
  //去PK
  startPk:function(){
    console.log("去PK")
  },
  //领取
  receive: function () {
    console.log("领取")
  },
  //关闭
  close: function () {
    this.setData({
      show: false
    })
  },
  goApp:function(){
    console.log("去App");
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