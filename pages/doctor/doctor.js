// pages/doctor/doctor.js
const app = getApp();
import { getCase } from "../../api/index";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgBase: app.globalData.imgUrl,
    menuList: [{
      title: '生活打卡',
      menus: [
        {
          title: '饮食打卡',
          iconPath: '/images/food.png',
          pagePath: ''
        },
        {
          title: '运动打卡',
          iconPath: '/images/sport.png',
          pagePath: ''
        },
        {
          title: '心情打卡',
          iconPath: '/images/mood.png',
          pagePath: ''
        }
      ],
    },
    {
      title: '生活指导',
      menus: [
        {
          title: '用药指导',
          iconPath: '/images/medicine.png',
          pagePath: '/pages/guide/medicine'
        },
        {
          title: '饮食指导',
          iconPath: '/images/food.png',
          pagePath: '/pages/guide/food'
        },
        {
          title: '运动指导',
          iconPath: '/images/sport.png',
          pagePath: '/pages/guide/sport'
        }
      ]
    }],
    dataList: []
  },

  toCase(e) {
    wx.navigateTo({
      url: "/pages/case/add"
    })
  },

  getList() {
    getCase().then(res => {
      const data = [...res];
      data.map(item => {
        item.case_img = item.case_img ? item.case_img.split(',') : [];
        item.prescription_img = item.prescription_img ? item.prescription_img.split(',') : [];
      })
      console.log(data);
      this.setData({
        dataList: data
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList();
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
      this.getList();
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

  }
})