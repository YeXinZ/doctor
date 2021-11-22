// pages/clock/food.js
import {
  getTodayDiet,
  addDiet
} from "../../api/index";
import {
  baseUrl
} from '../../utils/request';
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgBase: app.globalData.imgUrl,
    today_diet: {},
    diet_list: [],
    autosize: {
      'minHeight': 70
    },
    meal_data: '',
    meal_img: [],
    meal_type: '1'
  },

  onChange(event) {
    this.setData({
      meal_type: event.detail,
    });
  },

  toSubmit() {
    let {
      meal_data,
      meal_img,
      meal_type
    } = this.data;
    if (meal_img.length === 0 || !meal_data) {
      wx.showToast({
        title: '提交信息不完整，请完善信息！',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    meal_img = meal_img.map(k => k.url);
    const params = {
      meal_img: meal_img.join(','),
      meal_data,
      meal_type
    };
    addDiet(params).then(res => {
      wx.showToast({
        title: "提交成功",
        icon: 'success',
        duration: 2000
      });
      this.setData({
        meal_data: '',
        meal_img: [],
        meal_type: '1'
      });
      this.getData();
    })
  },

  afterRead(event) {
    const {
      file
    } = event.detail;
    const that = this;
    wx.uploadFile({
      url: baseUrl + '/api/Upload/upload',
      filePath: file.url,
      name: 'image',
      header: {
        "Content-Type": "multipart/form-data"
      },
      success(res) {
        if (res.statusCode === 200) {
          const url = JSON.parse(res.data).url;
          // 上传完成需要更新 fileList
          const {
            meal_img = []
          } = that.data;
          meal_img.push({
            ...file,
            url
          });
          that.setData({
            meal_img
          });
        }
      },
    });
  },

  getData() {
    getTodayDiet().then(res => {
      const {
        today_diet = {},
          diet_list = []
      } = res;
      diet_list.map(item => {
        item.meal_img = item.meal_img ? item.meal_img.split(',') : [];
      });
      this.setData({
        today_diet,
        diet_list
      });
    })
  },

  checkMore() {
    wx.navigateTo({
      url: '/pages/clock/log?type=food',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
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
      this.getData();
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