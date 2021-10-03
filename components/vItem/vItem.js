// components/vItem/vItem.js
const app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    infoData: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    imgBase: app.globalData.imgUrl
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toDetail(e) {
      const id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: '/pages/activity/detail?id=' + id
      })
    }
  }
})
