// pages/article/detail.js
import { getArticleInfo } from "../../api/index";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    infoData: {}
  },

  getData(id) {
    getArticleInfo(id).then(res => {
      console.log(res);
      const data = { ...res };
      data.content = data.content.replace(/<img/gi, '<img style="max-width:100%;height:auto;float:left;display:block" ');
      this.setData({
        infoData: res || {}
      });
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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