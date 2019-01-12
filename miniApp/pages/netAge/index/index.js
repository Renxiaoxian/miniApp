// pages/netAge/index/index.js
const app = getApp()
Page({
  onShareAppMessage(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123'
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    //是否显示modal
    show: false,
    lqzxUrl:'',
    phone:'',
    phoneAES:'',
    list: [
      {
        'date':'2019.01.03',
        'phone1':'我',
        'phone2':'13777771117',
        'state':'1',
        'id':'1',
        'result':'0'
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
    // var myTel=options.phone;
    var myTel ='13933184430';
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
        console.log(res)
        that.data.lqzxUrl = res.data.resultObj.lqzxUrl
        var pkList = res.data.resultObj.list
        var list = [];
        for(var i in pkList){
          var result='0' //0成功 1失败 2平手
          if (pkList[i]['fLoser']==myTel){
            result=1
          } else if (pkList[i]['fWiner'] == myTel){
            result = 0
          }else{
            result =2;
          }
          list.push({ 
            'phone1': pkList[i]['fPlayer1'] == myTel ? '我' :pkList[i]['fPlayer1'],
            'phone2': pkList[i]['fPlayer2'] == myTel ? '我' : pkList[i]['fPlayer2'],
            'date': pkList[i]['fDay'].substring(0,4)
              + '.' + pkList[i]['fDay'].substring(4, 6)
              + '.' + pkList[i]['fDay'].substring(6, 8),
            'state': pkList[i]['fState'],
            'id': pkList[i]['fId'],
            'result': result})
        }
        console.log(list)
        that.setData({
          list:list
        })
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