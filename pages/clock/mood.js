// pages/clock/mood.js
import {
  getMood,
  addMood
} from "../../api/index";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    autosize: {
      'minHeight': 70
    },
    mood_data: '',
    logData: []
  },

  toSubmit() {
    const {
      mood_data
    } = this.data;
    if (!mood_data) {
      wx.showToast({
        title: '请输入打卡内容！',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    addMood(mood_data).then(res => {
      wx.showToast({
        title: "提交成功",
        icon: 'success',
        duration: 2000
      })
      this.setData({
        mood_data: ''
      })
      this.getData();
    })
  },

  checkMore() {
    wx.navigateTo({
      url: '/pages/clock/log?type=mood',
    })
  },

  getData() {
    getMood().then(res => {
      console.log(res);
      this.setData({
        logData: res.motion_list || []
      });
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
    // setTimeout(() => {
    //   this.setData({
    //     mood_data: ''
    //   });
    //   this.getData();
    //   wx.stopPullDownRefresh();
    // }, 500);
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