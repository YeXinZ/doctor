// pages/guide/guide.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuList: [{
        title: '用药指导',
        icon: '/images/menu-yy.png'
      },
      {
        title: '饮食指导',
        icon: '/images/menu-food.png'
      },
      {
        title: '运动指导',
        icon: '/images/menu-yd.png'
      },
      {
        title: '情绪指导',
        icon: '/images/menu-xq.png'
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