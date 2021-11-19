// app.js
import {
  authLogin,
  authNumber,
  authRegist
} from "./api/index";
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
  getPhoneNumber(e, callback) {
    if (e.detail.errMsg == "getPhoneNumber:fail user deny") return;
    //用户允许授权
    wx.showLoading();
    //1. 调用登录接口获取临时登录code
    wx.login({
      success: res => {
        console.log(res, 555)
        if (res.code) {
          //2. 访问登录凭证校验接口获取session_key、openid
          authLogin({
            'js_code': res.code
          }).then(data => {
            console.log(data, 'res');
            if (data) {
              //3. 解密
              authNumber({
                'appid': data.appid,
                'sessionKey': data.session_key,
                'encryptedData': e.detail.encryptedData,
                'iv': e.detail.iv,
              }).then(data2 => {
                wx.hideLoading();
                if (data2) {
                  const phoneNumber = JSON.parse(data2).phoneNumber;
                  wx.setStorageSync('phone', phoneNumber);
                  const userInfo = wx.getStorageSync('userInfo');
                  console.log(userInfo, 'userInfo');
                  if (userInfo) {
                    authRegist({
                      username: userInfo.nickName,
                      sex: userInfo.gender,
                      phone: phoneNumber,
                      pwd: 123456,
                      avatarimg: userInfo.avatarUrl
                    }).then(res => {
                      console.log(res, 56565)
                      if (res != null) {
                        wx.showToast({
                          title: '登录中...',
                          icon: 'loading',
                          duration: 2000
                        })
                        callback();
                      }
                    })
                  }
                }
              })
            }
          })
          // wx.request({
          //   url: "xxxxxxx/index/author/login",
          //   data: {
          //     'js_code': res.code,
          //   },
          //   method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          //   header: {
          //     'content-type': 'application/json'
          //   }, // 设置请求的 header
          //   success: function (data) {
          //     console.log(data, data)
          //     if (data.statusCode == 200) {
          //       //3. 解密
          //       wx.request({
          //         url: 'xxxxxx/index/author/number',
          //         data: {
          //           'appid': data.data.appid,
          //           'sessionKey': data.data.session_key,
          //           'encryptedData': e.detail.encryptedData,
          //           'iv': e.detail.iv,
          //         },
          //         method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          //         header: {
          //           'content-type': 'application/json'
          //         }, // 设置请求的 header
          //         success: function (data2) {
          //           wx.hideLoading()
          //           console.log(data2.data.phoneNumber)
          //           if (data2.statusCode == 200 && data2.data.phoneNumber) {
          //             self.setData({
          //               phone: data2.data.phoneNumber,
          //               config: {
          //                 tipsshow1: false,
          //                 tipsshow2: false,
          //               },
          //             })
          //             wx.setStorageSync('phone', data2.data.phoneNumber);
          //             if (self.data.userInfo != '') {
          //               wx.request({
          //                 url: 'xxxx/index/author/regist',
          //                 data: {
          //                   username: self.data.userInfo.nickName,
          //                   sex: self.data.userInfo.gender,
          //                   phone: self.data.phone,
          //                   pwd: 123456,
          //                   avatarimg: self.data.userInfo.avatarUrl
          //                 },
          //                 success: function (data) {
          //                   console.log(data.data, 56565)
          //                   if (data.data != null) {
          //                     wx.showToast({
          //                       title: '登录中...',
          //                       icon: 'loading',
          //                       duration: 2000
          //                     })
          //                     wx.navigateTo({
          //                       url: '../managementList/managementList' //管理页面
          //                     })
          //                   }
          //                 }
          //               });
          //             }
          //             console.log(self.data, 526336)
          //           }
          //         },
          //         fail: function (err) {
          //           console.log(err);
          //         }
          //       })
          //     }
          //   },
          //   fail: function (err) {
          //     console.log(err);
          //   }
          // })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    imgUrl: "http://img.xunshanfang.cn/"
  }
})