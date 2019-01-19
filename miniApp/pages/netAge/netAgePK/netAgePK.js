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
    phone: '',
    phoneAES: '',
    times:'0',
    ruleShow: false,
    getPhone: false,
    localhost: 'http://39.96.56.53:8080/static/image/image/',
    code: ''
  },
  lingqv(){
    if (this.data.state =="1"){
      this.setData({
        show:true
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // if (app.globalData.loginPhone){
    //   this.init();
    // }
    // if (options){
    //   this.setData({
    //     myTel: options.phone
    //   })
    // }
    this.setData({
      localhost: app.globalData.getImage,
      phone: app.globalData.loginPhone,
      getTel: false
    })
    if (app.globalData.loginPhone){
      this.init();
    }
  },
  showrule: function () {
    this.setData({
      ruleShow: true
    })
  },
  login(){
    app.getCode().then((res)=>{
      console.log(1111)
      //reqUrl=act1028e&method=checkMsg&actCode=1028&mobile=13472197474&js_code=023sxEVi2G3EqC0JJTXi29TNVi2sxEV0&verification=670642
      app.ajax({
        reqUrl:'act1028e',
        method:'checkMsg',
        actCode:'1028',
        mobile:this.data.phone,
        openid:res.code,
        verification:this.data.code
      }).then((data)=>{
        console.log(data)
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
            getPhone:false,
            phoneAES: data.data.resultObj.phoneAES
          })
          app.globalData.phoneAES = data.data.resultObj.phoneAES
          app.globalData.loginPhone = data.data.resultObj.phone;
          this.openFn()
        }
        
      })
    })
  },
  openFn(){
    console.log(this.data.fn)
    switch (this.data.fn){
      case 'init':
      this.init()
      break;
      case 'share':
        this.onShareAppMessage({from:"button"});
      break;
      case 'gopk':
        wx.navigateTo({
          url: '/pages/netAge/index/index?phone=' + this.data.phone
        })
        break;
    }
  },
  inputcode(e){
    console.log(e)
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
      getTel:false,
      show:false
    })
  },
  goApp(){
    wx.navigateTo({
      url: '/pages/netAge/webView/webView?lqzxUrl=' + encodeURIComponent("https://www.he.10086.cn/app/ecu/resource/download/html/index.html")
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
          that.setData({
            times: times,
            basic: res.data.resultObj.prize,
            phone: res.data.resultObj.phone,
            phoneAES: res.data.resultObj.phoneAES,
            total: res.data.resultObj.totalprize,
            state: res.data.resultObj.state,
            getTel:false
          })
          app.globalData.phoneAES = res.data.resultObj.phoneAES
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
        openid:res.code
      }).then((data) => {
        if (data.data.resultObj && data.data.resultObj.state == '1'){
          //保存过手机号
          this.setData({
            phone: data.data.resultObj.phone,
            getTel:true
          })
          app.globalData.loginPhone = data.data.resultObj.phone
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
  getMylw(){
    this.setData({
      fn:"init"
    })
    this.getPrize()
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
    if(app.globalData.loginPhone){
      wx.navigateTo({
        url: '/pages/netAge/index/index?phone='+this.data.phone
      })
    }else{
      this.setData({
        fn:'gopk'
      })
      this.getPrize()
    }
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
    this.setData({
      fn:'share'
    })
    this.getPrize();
  },
  onShareAppMessage: function (ops) {
    if (ops.from === 'button') {
      if (app.globalData.loginPhone) {
        return {
          title: '人人有新年礼，PK再赢话费，快来挑战我吧！',
          imageUrl: this.data.localhost + 'shareImage.jpg',
          desc: '',
          path: 'pages/netAge/ChallengeBook/ChallengeBook?phone' + app.globalData.phoneAES, //点击分享的图片进到哪一个页面
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
        title: '人人有新年礼，PK再赢话费，快来挑战我吧！',
        imageUrl: this.data.localhost+'shareImage.jpg',
        desc: '',
        path: 'pages/netAge/ChallengeBook/ChallengeBook?phone' + app.globalData.phoneAES, //点击分享的图片进到哪一个页面
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
