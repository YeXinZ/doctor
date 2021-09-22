// pages/doctor/doctor.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuList: [{
        title: '生活打卡',
        icon: '/images/menu-dk.png',
        pagePath: '/pages/clock/clock'
      },
      {
        title: '生活指导',
        icon: '/images/menu-zd.png',
        pagePath: '/pages/guide/guide'
      },
      {
        title: '病例',
        icon: '/images/menu-bl.png'
      }
    ]
  },

  toPage(e) {
    const path = e.currentTarget.dataset.path;
    if (path) {
      wx.navigateTo({
        url: path
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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