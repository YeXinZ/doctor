// pages/case/add.js
import {
  baseUrl
} from '../../utils/request';
import { addCsae } from "../../api/index";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    case_img: [],
    case_content: '',
    prescription_img: [],
    prescription_data: '',
    autosize: {
      'minHeight': 70
    },
  },

  afterRead(event) {
    const { file } = event.detail;
    console.log(file);
    wx.uploadFile({
      url: baseUrl + '/api/Upload/upload',
      filePath: file.url,
      name: 'file',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      success(res) {
        // 上传完成需要更新 fileList
        const { case_img = [] } = this.data;
        case_img.push({ ...file, url: res.data });
        this.setData({ case_img });
      },
    });
  },

  afterRead1(event) {
    const { file } = event.detail;
    console.log(file);
    wx.uploadFile({
      url: baseUrl + '/api/Upload/upload',
      filePath: file.url,
      name: 'file',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      success(res) {
        // 上传完成需要更新 fileList
        const { prescription_img = [] } = this.data;
        prescription_img.push({ ...file, url: res.data });
        this.setData({ prescription_img });
      },
    });
  },

  toSubmit() {
    const { case_img, case_content, prescription_img, prescription_data } = this.data;
    if (case_img.length === 0 || prescription_img === 0 || !case_content || !prescription_data) {
      wx.showToast({
        title: '上传信息不完整，请完善信息！',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    const params = {
      case_img: case_img.join(','),
      case_content,
      prescription_img: prescription_img.join(','),
      prescription_data
    };
    addCsae(params).then(res => {
      wx.showToast({
        title: "上传成功",
        icon: 'success',
        duration: 2000
      })
      setTimeout(() => {
        wx.navigateBack();
      }, 500);
    })
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