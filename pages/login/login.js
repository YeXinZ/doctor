// pages/login/login.js
Page({

  data: {
    userName: '',
    pwd: '',
    getUserInfoFail: '',
    userInfo: [],
    hasUserInfo: '',
    phone: '',
    config: {
      tipsshow1: true,
      tipsshow2: false
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //用户是否授权过手机号
    wx.getStorage({
      key: 'phone',
      success: function (res) {
        that.setData({
          config: {
            tipsshow1: false,
            tipsshow2: false
          },
        })
      }
    })

    //是否授权过用户信息
    wx.getSetting({
      success: function (res) {
        console.log(res, 'res');
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log(res);
              that.setData({
                userInfo: res.userInfo,
                config: {
                  tipsshow1: false,
                },
              })
            }
          })
        }
      }
    })

  },

  getPhoneNumber: function (e) {
    if (e.detail.errMsg == "getPhoneNumber:fail user deny") return;
    //用户允许授权
    wx.showLoading()
    var self = this
    //1. 调用登录接口获取临时登录code
    wx.login({
      success: res => {
        console.log(res, 555)
        if (res.code) {
          //2. 访问登录凭证校验接口获取session_key、openid
          wx.request({
            url: "xxxxxxx/index/author/login",
            data: {
              'js_code': res.code,
            },
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
              'content-type': 'application/json'
            }, // 设置请求的 header
            success: function (data) {
              console.log(data, data)
              if (data.statusCode == 200) {
                //3. 解密
                wx.request({
                  url: 'xxxxxx/index/author/number',
                  data: {
                    'appid': data.data.appid,
                    'sessionKey': data.data.session_key,
                    'encryptedData': e.detail.encryptedData,
                    'iv': e.detail.iv,
                  },
                  method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                  header: {
                    'content-type': 'application/json'
                  }, // 设置请求的 header
                  success: function (data2) {
                    wx.hideLoading()
                    console.log(data2.data.phoneNumber)
                    if (data2.statusCode == 200 && data2.data.phoneNumber) {
                      self.setData({
                        phone: data2.data.phoneNumber,
                        config: {
                          tipsshow1: false,
                          tipsshow2: false,
                        },
                      })
                      wx.setStorageSync('phone', data2.data.phoneNumber);
                      if (self.data.userInfo != '') {
                        wx.request({
                          url: 'xxxx/index/author/regist',
                          data: {
                            username: self.data.userInfo.nickName,
                            sex: self.data.userInfo.gender,
                            phone: self.data.phone,
                            pwd: 123456,
                            avatarimg: self.data.userInfo.avatarUrl
                          },
                          success: function (data) {
                            console.log(data.data, 56565)
                            if (data.data != null) {
                              wx.showToast({
                                title: '登录中...',
                                icon: 'loading',
                                duration: 2000
                              })
                              wx.navigateTo({
                                url: '../managementList/managementList' //管理页面
                              })
                            }
                          }
                        });
                      }
                      console.log(self.data, 526336)
                    }
                  },
                  fail: function (err) {
                    console.log(err);
                  }
                })
              }
            },
            fail: function (err) {
              console.log(err);
            }
          })
        }
      }
    })
  },

  getUserInfo: function (e) {
    var that = this;
    console.log(e.detail.userInfo, "getuserinfo")
    if (e.detail.userInfo) {
      that.setData({
        userInfo: e.detail.userInfo,
        config: {
          tipsshow1: false,
          tipsshow2: true,
        },
      })
      console.log(that.data.userInfo);
    } else {
      console.log("获取信息失败")
    }
  }
})