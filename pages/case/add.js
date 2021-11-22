// pages/case/add.js
import {
  baseUrl
} from '../../utils/request';
import {
  addCsae
} from "../../api/index";

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
    const {
      file
    } = event.detail;
    console.log(file);
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
          const {
            case_img = []
          } = that.data;
          case_img.push({
            ...file,
            url
          });
          that.setData({
            case_img
          });
        }
      },
    });
  },

  afterRead1(event) {
    const {
      file
    } = event.detail;
    console.log(file);
    const that = this;
    wx.uploadFile({
      url: baseUrl + '/api/Upload/upload',
      filePath: file.url,
      name: 'image',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      success(res) {
        if (res.statusCode === 200) {
          const url = JSON.parse(res.data).url;
          const {
            prescription_img = []
          } = that.data;
          prescription_img.push({
            ...file,
            url
          });
          that.setData({
            prescription_img
          });
        }
      },
    });
  },

  toSubmit() {
    let {
      case_img,
      case_content,
      prescription_img,
      prescription_data
    } = this.data;
    if (case_img.length === 0 || prescription_img === 0 || !case_content || !prescription_data) {
      wx.showToast({
        title: '上传信息不完整，请完善信息！',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    case_img = case_img.map(k => k.url);
    prescription_img = prescription_img.map(k => k.url);
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

  },
  onShareTimeline: function () {

  }
})