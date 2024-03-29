// pages/activity/detail.js
import {
  activityInfo,
  activitySignUp
} from "../../api/index";
import {
  checkPhone,
  checkName
} from "../../utils/validate";
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    infoData: {},
    imgBase: app.globalData.imgUrl,
    user_name: '',
    user_mobile: '',
    show: false,
    verify(action) {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (action === 'confirm') {
            const {
              user_name,
              user_mobile,
              infoData: {
                id: activity_id
              }
            } = this.data;
            if (!checkName(user_name) || !checkPhone(user_mobile)) {
              resolve(false);
            } else {
              activitySignUp({
                activity_id,
                user_name,
                user_mobile
              }).then(res => {
                wx.showToast({
                  title: "报名成功",
                  icon: 'success',
                  duration: 2000
                })
                this.setData({
                  user_name: '',
                  user_mobile: ''
                })
                resolve(true);
              })
            }
          } else {
            resolve(true);
          }
        }, 13);
      });
    },
  },

  onClose() {
    this.setData({
      show: false
    });
  },

  openApply() {
    const phone = wx.getStorageSync('phone');
    const userInfo = wx.getStorageSync('userInfo');
    if (!userInfo) {
      this.selectComponent('#authComp').showDialog(1);
    } else if (!phone) {
      this.selectComponent('#authComp').showDialog(2);
    } else {
      this.setData({
        show: true
      });
    }
  },

  toApply() {
    const {
      user_name,
      user_mobile,
      infoData: {
        id: activity_id
      }
    } = this.data;
    if (!checkName(user_name)) {
      return false;
    }
    if (!checkPhone(user_mobile)) {
      return false;
    }
    console.log(user_name, user_mobile);
    activitySignUp({
      activity_id,
      user_name,
      user_mobile
    }).then(res => {
      wx.showToast({
        title: "报名成功",
        icon: 'success',
        duration: 2000
      })
      this.setData({
        user_name: '',
        user_mobile: ''
      })
    })
  },

  getData(id) {
    activityInfo(id).then(res => {
      console.log(res);
      const data = {
        ...res
      };
      data.activity_img = data.activity_img ? data.activity_img.split(',') : [];
      data.content = data.content.replace(/<img/gi, '<img style="max-width:100%;height:auto;float:left;display:block" ');
      console.log(data);
      this.setData({
        infoData: data || {}
      });
      wx.setNavigationBarTitle({
        title: data.activity_name
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData(options.id);
    this.setData({
      verify: this.data.verify.bind(this),
    });
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
    setTimeout(() => {
      this.getData(this.data.infoData.id);
      wx.stopPullDownRefresh();
    }, 500);
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

  },
  onShareTimeline: function () {

  }
})