// components/auth/auth.js
import {
  authLogin,
  authNumber,
  authRegist
} from "../../api/index";
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    backHome: {
      type: Boolean,
      default: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    show: false,
    show1: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getPhoneNumber(e) {
      if (e.detail.errMsg == "getPhoneNumber:fail user deny") return;
      const that = this;
      //用户允许授权
      wx.showLoading();
      //1. 调用登录接口获取临时登录code
      wx.login({
        success: res => {
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
                    authRegist({
                      username: userInfo.nickName,
                      sex: userInfo.gender,
                      phone: phoneNumber,
                      pwd: 123456,
                      avatarimg: userInfo.avatarUrl
                    }).then(res => {
                      console.log(res, 56565)
                      if (res) {
                        wx.showToast({
                          title: '登录成功!',
                          icon: 'success',
                          duration: 1000,
                        })
                        wx.setStorageSync('token', res.token);
                      } else {
                        if (this.data.backHome) {
                          setTimeout(() => {
                            wx.switchTab({
                              url: '/pages/index/index',
                            })
                          }, 1000);
                        }
                      }
                    }).catch(err => {
                      if (this.data.backHome) {
                        setTimeout(() => {
                          wx.switchTab({
                            url: '/pages/index/index',
                          })
                        }, 1000);
                      }
                    })
                  } else {
                    if (this.data.backHome) {
                      setTimeout(() => {
                        wx.switchTab({
                          url: '/pages/index/index',
                        })
                      }, 1000);
                    }
                  }
                }).catch(err => {
                  if (this.data.backHome) {
                    setTimeout(() => {
                      wx.switchTab({
                        url: '/pages/index/index',
                      })
                    }, 1000);
                  }
                })
              } else {
                wx.hideLoading();
                if (this.data.backHome) {
                  setTimeout(() => {
                    wx.switchTab({
                      url: '/pages/index/index',
                    })
                  }, 1000);
                }
              }
            })
          } else {
            wx.hideLoading();
            if (this.data.backHome) {
              setTimeout(() => {
                wx.switchTab({
                  url: '/pages/index/index',
                })
              }, 1000);
            }
          }
        },
        fail: err => {
          wx.hideLoading();
          if (this.data.backHome) {
            setTimeout(() => {
              wx.switchTab({
                url: '/pages/index/index',
              })
            }, 1000);
          }
        }
      })
    },
    getUserProfile(e) {
      const userInfo = e.detail.userInfo;
      const that = this;
      wx.setStorageSync('userInfo', userInfo);
      console.log(userInfo, wx.getStorageSync('userInfo'))
      wx.showToast({
        title: '授权成功!', // 标题
        icon: 'success',  // 图标类型，默认success
        duration: 1000,  // 提示窗停留时间，默认1500ms
        success: function () {
          setTimeout(() => {
            that.setData({
              show1: true
            })
            if (that.data.backHome) {
              that.triggerEvent('setUserInfo', userInfo);
            }
          }, 1000)
        }
      });
    },
    showDialog(type) {
      if (type == 1) {
        this.setData({
          show: true
        })
      } else {
        this.setData({
          show1: true
        })
      }
    },
    onClose() {
      if (this.data.backHome) {
        wx.switchTab({
          url: '/pages/index/index',
        })
      } else {
        this.setData({ show: false });
      }
    },
    onClose1() {
      if (this.data.backHome) {
        wx.switchTab({
          url: '/pages/index/index',
        })
      } else {
        this.setData({ show1: false });
      }
    },
  }
})
