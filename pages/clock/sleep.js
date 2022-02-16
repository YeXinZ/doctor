// pages/clock/sleep.js
import {
  getSleep,
  addSleep
} from "../../api/index";
import {
  baseUrl
} from '../../utils/request';
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgBase: app.globalData.imgUrl,
    autosize: {
      'minHeight': 70
    },
    sleep_data: '',
    logData: [],
    sleep_img: []
  },

  afterRead(event) {
    const {
      file
    } = event.detail;
    const that = this;
    wx.uploadFile({
      url: baseUrl + '/api/Upload/upload',
      filePath: file.url,
      name: 'image',
      header: {
        "Content-Type": "multipart/form-data"
      },
      success(res) {
        if (res.statusCode === 200) {
          const url = JSON.parse(res.data).url;
          // 上传完成需要更新 fileList
          const {
            sleep_img = []
          } = that.data;
          sleep_img.push({
            ...file,
            url
          });
          that.setData({
            sleep_img
          });
        }
      },
    });
  },

  toSubmit() {
    let {
      sleep_data,
      sleep_img
    } = this.data;
    if (sleep_img.length === 0) {
      wx.showToast({
        title: '请上传打卡图片！',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    sleep_img = sleep_img.map(k => k.url);
    if (!sleep_data) {
      wx.showToast({
        title: '请输入打卡内容！',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    addSleep({
      sleep_img: sleep_img.join(','),
      sleep_data
    }).then(res => {
      wx.showToast({
        title: "提交成功",
        icon: 'success',
        duration: 2000
      })
      this.setData({
        sleep_data: '',
        sleep_img: []
      })
      this.getData();
    })
  },

  checkMore() {
    wx.navigateTo({
      url: '/pages/clock/log?type=sleep',
    })
  },

  getData() {
    getSleep().then(res => {
      console.log(res);
      res.sleep_list.map(item => {
        item.sleep_img = item.sleep_img ? item.sleep_img.split(',') : [];
      });
      this.setData({
        logData: res.sleep_list || []
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
    //     sleep_data: ''
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

  },
  onShareTimeline: function () {

  }
})