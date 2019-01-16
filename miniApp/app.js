//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    
  },
  ajax: function(data) {
    return new Promise((resolve, reject) => {
      wx.showLoading({
        mask: true,
        icon: 'loading',
        title: '加载中'
      })
      wx.request({
        //url: 'http://he.10086.cn/app/test/act/actAction.do',
        url:'https://www.he.10086.cn/app/act/actAction.do',
        data: data,
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        success: function (res) {
          resolve(res)
        },
        fail: function (res) { },
        complete: function (res) {
          wx.hideLoading()
        },
      })
    })
  },
  getCode: () => {
    wx.showLoading({
      title: '数据加载中',
      mask: true,
    })
    return new Promise((resolve, reject) => {
      wx.login({
        success: function (res) {
          wx.hideLoading()
          console.log(res)
          resolve(res)
          if (res.code) {
            //发起网络请求
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }

      })
    })
  },
  globalData: {
    userInfo: null,
    getImage: "http://39.96.56.53:8080/static/image/image/",
    // getImage: "/image/",
    getData: "",
    loginPhone:null,
    phoneAES:null
    }
})