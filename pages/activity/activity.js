// pages/activity/activity.js
import {
  activityList
} from "../../api/index";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: [],
    page: 1,
    pageSize: 10,
    total: 0,
    loadText: ""
  },

  getList() {
    const { page, pageSize, dataList } = this.data;
    this.setData({
      loadText: "加载中......"
    });
    activityList({
      page: page,
      pageSize: pageSize
    }).then(res => {
      const newList = dataList.concat(res.data);
      this.setData({
        page: page + 1,
        dataList: newList,
        total: res.total,
        loadText: newList.length >= res.total ? "没有更多数据了" : ""
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
    this.setData({
      page: 1,
      dataList: []
    });
    setTimeout(() => {
      this.getList();
      wx.stopPullDownRefresh();
    }, 500);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    const { dataList, total } = this.data;
    if (dataList.length < total) {
      this.getList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})