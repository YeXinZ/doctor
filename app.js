// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
  },
  getUserInfo(callback) {
    // const phone = wx.getStorageSync({
    //   key: 'phone'
    // });
    // if (phone) {

    // } else {

    // }
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {

            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    imgUrl: "http://img.xunshanfang.cn/"
  }
})