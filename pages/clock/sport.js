// pages/clock/sport.js
import {
  getClockMotion,
  addMotion
} from "../../api/index";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    today_motion: [],
    motion_list: [],
    autosize: {
      'minHeight': 70
    },
    formData: []
  },

  checkMore() {
    wx.navigateTo({
      url: '/pages/clock/log?type=sport',
    })
  },

  onChange(event) {
    const value = event.detail;
    const index = event.currentTarget.dataset.index;
    const {
      formData
    } = this.data;
    formData[index].motion_data = value;
    this.setData({
      formData
    });
  },

  toSubmit() {
    const {
      formData
    } = this.data;
    formData.forEach((element, index) => {
      const id = '#ratio' + (index + 1);
      const ratioComp = this.selectComponent(id);
      element.motion_ratio = ratioComp.getScore();
    });
    addMotion(formData).then(res => {
      wx.showToast({
        title: "提交成功",
        icon: 'success',
        duration: 2000
      })
      formData.forEach((element, index) => {
        const id = '#ratio' + (index + 1);
        const ratioComp = this.selectComponent(id);
        ratioComp.setCurrentProgress(10);
        element.motion_ratio = '';
        element.motion_data = '';
      });
      this.setData({
        formData
      });
      this.getData();
    })
  },

  getData() {
    getClockMotion().then(res => {
      // res = {
      //   "today_motion": '[{"motion_name":"\u4fef\u5367\u6491100","motion_course":"https: \ /\/www.bilibili.com\/video\/BV1Kf4y1n7JG?spm_id_from=333.851.b_62696c695f7265706f72745f646f756761.18"},{"motion_name":"\u4ef0\u5367\u8d77\u575020","motion_course":"https:\/\/www.bilibili.com\/video\/BV1Kf4y1n7JG?spm_id_from=333.851.b_62696c695f7265706f72745f646f756761.18"}]',
      //   "motion_list": [{
      //       "record_date": "2021-09-25",
      //       "motion_item": "跑步",
      //       "motion_ratio": 60,
      //       "motion_data": "123123"
      //     },
      //     {
      //       "record_date": "2021-09-25",
      //       "motion_item": "铁人三项",
      //       "motion_ratio": 60,
      //       "motion_data": "123123"
      //     }
      //   ]
      // };
      let {
        today_motion = '',
          motion_list = []
      } = res;
      console.log(JSON.parse(today_motion));
      today_motion = today_motion ? JSON.parse(today_motion) : [];
      const formData = [];
      for (let item of today_motion) {
        formData.push({
          motion_item: item.motion_name,
          motion_ratio: '',
          motion_data: ''
        });
      }
      console.log(today_motion, motion_list, formData);
      this.setData({
        today_motion,
        motion_list,
        formData
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

  },
  onShareTimeline: function () {

  }
})