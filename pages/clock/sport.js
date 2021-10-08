// pages/clock/sport.js
import {
  getClockMotion
} from "../../api/index";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    today_motion: [],
    motion_list: [],
    motion_ratio: '',
    motion_data: '',
    autosize: {
      'minHeight': 70
    },
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

  getData() {
    getClockMotion().then(res => {
      res = {
        "today_motion": '[{"motion_name":"\u4fef\u5367\u6491100","motion_course":"https: \ /\/www.bilibili.com\/video\/BV1Kf4y1n7JG?spm_id_from=333.851.b_62696c695f7265706f72745f646f756761.18"},{"motion_name":"\u4ef0\u5367\u8d77\u575020","motion_course":"https:\/\/www.bilibili.com\/video\/BV1Kf4y1n7JG?spm_id_from=333.851.b_62696c695f7265706f72745f646f756761.18"}]',
        "motion_list": [{
            "record_date": "2021-09-25",
            "motion_item": "跑步",
            "motion_ratio": 60,
            "motion_data": "123123"
          },
          {
            "record_date": "2021-09-25",
            "motion_item": "铁人三项",
            "motion_ratio": 60,
            "motion_data": "123123"
          }
        ]
      };
      let {
        today_motion = '',
          motion_list = []
      } = res;
      console.log(JSON.parse(today_motion));
      today_motion = today_motion ? JSON.parse(today_motion) : [];
      console.log(today_motion, motion_list);
      this.setData({
        today_motion,
        motion_list
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