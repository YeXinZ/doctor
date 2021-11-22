// pages/article/article.js
import { getArticleType, getArticleList } from "../../api/index";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeList: [],
    dataList: [],
    page: 1,
    pageSize: 10,
    total: 0,
    type_id: '',
    loadText: ""
  },

  getList() {
    const { page, pageSize, type_id, dataList } = this.data;
    this.setData({
      loadText: "加载中......"
    });
    getArticleList({
      page,
      pageSize,
      type_id
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

  getTypes() {
    getArticleType().then(res => {
      const data = [...res];
      this.setData({
        typeList: [...res],
        type_id: data[0].id
      });
      this.getList();
    })
  },

  tabChange(event) {
    const index = event.detail.index;
    this.setData({
      type_id: this.data.typeList[index].id,
      page: 1,
      dataList: []
    });
    this.getList();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTypes();
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
      this.getTypes();
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

  },
  onShareTimeline: function () {

  }
})