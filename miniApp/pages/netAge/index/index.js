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
    ruleShow:false,
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
  showrule: function () {
    this.setData({
      ruleShow: true
    })
  },
  offTel: function () {
    this.setData({
      ruleShow: false
    })
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
    console.log(options)
    var that=this;
    var myTel=options.phone;
   // var myTel ='13933184430';
    this.setData({
      localhost: app.globalData.getImage
    }),
      app.ajax({
        reqUrl: 'act1028e',
        method: 'initPK',
        actCode: '1028',
        param: 'null',
        mobile: myTel,
        city: '0311'
      }).then((res) => {
        console.log(res)
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
          list:list,
          phoneAES: res.data.resultObj.phoneAES,
          lqzxUrl : res.data.resultObj.lqzxUrl,
          phone: res.data.resultObj.phone
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
    this.setData({
      show:true
    })
  },
  //关闭
  close: function () {
    this.setData({
      show: false
    })
  },
  goApp() {
    wx.navigateTo({
      url: '/pages/netAge/webView/webView?lqzxUrl=' + encodeURIComponent("https://www.he.10086.cn/app/ecu/resource/download/html/index.html")
    })
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
  onShareAppMessage: function (ops) {
    if (ops.from === 'button') {
      if (app.globalData.loginPhone) {
        return {
          title: '人人有新年礼，PK再赢话费，快来挑战我吧！',
          imageUrl: this.data.localhost + 'shareImage.jpg',
          desc: '',
          path: 'pages/netAge/ChallengeBook/ChallengeBook?p1=' + this.data.phoneAES, //点击分享的图片进到哪一个页面
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

    } else {
      return {
        title: '人人有新年礼，PK再赢话费，快来挑战我吧！',
        imageUrl: this.data.localhost + 'shareImage.jpg',
        desc: '',
        path: 'pages/netAge/ChallengeBook/ChallengeBook?p1=' + this.data.phoneAES, //点击分享的图片进到哪一个页面
        success: function (res) {
          // 转发成功
        },
        fail: function (res) {
          // 转发失败
        }
      }
    }
   
  }
})