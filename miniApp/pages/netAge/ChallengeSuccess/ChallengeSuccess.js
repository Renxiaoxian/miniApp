// pages/netAge/index/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lqzxUrl: '',
    phone: '',
    list: [

    ],
    originatorTel: '12345678900',
    recipientTel: '11111111111',
    originatorDuration: '12',
    recipientDuration: '18',
    status: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      phone: options.phone,
      localhost: app.globalData.getImage
    })
    var that = this;
    var myTel = options.phone;
    app.ajax({
      reqUrl: 'act1028e',
      method: 'initPK',
      actCode: '1028',
      param: '2D8165082DECAE8A60096E2CFC50F6AF',
      mobile: options.phone,
      city: '311',
      pkid: options.pkGiftId
      // pkid:'7F63A0A847FD31E9E0556780268CC4E2'
    }).then((res) => {
      var pkList = res.data.resultObj.list
      var list = [];
      for (var i in pkList) {
        var result = '0' //0成功 1失败 2平手
        if (pkList[i]['fLoser'] == myTel) {
          result = 1
        } else if (pkList[i]['fWiner'] == myTel) {
          result = 0
        } else {
          result = 2;
        }
        list.push({
          'phone1': pkList[i]['fPlayer1'] == myTel ? '我' : pkList[i]['fPlayer1'],
          'phone2': pkList[i]['fPlayer2'] == myTel ? '我' : pkList[i]['fPlayer2'],
          'date': pkList[i]['fDay'].substring(0, 4)
            + '.' + pkList[i]['fDay'].substring(4, 6)
            + '.' + pkList[i]['fDay'].substring(6, 8),
          'state': pkList[i]['fState'],
          'id': pkList[i]['fId'],
          'result': result
        })
      }
      console.log(res)
      var status = 0;
      if (res.data.resultObj.pklb.fPlayer1 == res.data.resultObj.pklb.fWiner) {
        status = 0
      } else if (res.data.resultObj.pklb.fPlayer2 == res.data.resultObj.pklb.fWiner) {
        status = 1
      } else {
        status = 2
      }
      that.setData({
        list: list,
        phoneAES: res.data.resultObj.phoneAES,
        lqzxUrl: res.data.resultObj.lqzxUrl,
        phone: res.data.resultObj.phone,
        originatorTel: res.data.resultObj.pklb.fPlayer1,
        originatorDuration: res.data.resultObj.pklb.fTotalMonth1,
        recipientTel: res.data.resultObj.pklb.fPlayer2,
        recipientDuration: res.data.resultObj.pklb.fTotalMonth2,
        status:status
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  // 活动规则
  rule: function () {
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
  goApp: function () {
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
    return {
      title: '挑战书',
      path: '/pages/netAge/ChallengeBook/ChallengeBook?p1=' + this.data.phoneAES
    }
  }
})