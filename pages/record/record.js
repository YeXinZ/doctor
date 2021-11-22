// pages/record/record.js
import { getItemUseList } from "../../api/index";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: [],
    item_id: '',
    item_name: ''
  },

  getData(id) {
    getItemUseList(id).then(res => {
      const data = [...res];
      console.log(data);
      this.setData({
        dataList: data,
        item_name: data[0].item_name || ''
      });
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      item_id: options.id
    });
    this.getData(options.id);
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
      this.getData(this.data.item_id);
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