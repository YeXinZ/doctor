// index.js
import {
  getHotArticle,
  activityList
} from "../../api/index";
const app = getApp();

Page({
  data: {
    menuList: [{
        title: '私人医生',
        pagePath: '/pages/doctor/doctor'
      },
      {
        title: '热门文章',
        pagePath: '/pages/article/article'
      },
      {
        title: '最新活动',
        pagePath: "/pages/activity/activity"
      },
      {
        title: '联系医生'
      }
    ],
    articles: [],
    activities: [],
    loading: true,
    userPhone: ''
  },
  getPhoneNumber(e) {
    const phone = wx.getStorageSync({
      key: 'phone'
    });
    console.log(phone);
    if (!phone) {
      app.getPhoneNumber(e, function () {
        console.log(22222);
      })
    }
  },
  toPage(e) {
    const path = e.currentTarget.dataset.path;
    if (path) {
      wx.navigateTo({
        url: path
      })
    } else {
      wx.makePhoneCall({
        phoneNumber: '17610063316'
      })
    }
  },
  getArticle() {
    getHotArticle().then(res => {
      const list = [...res];
      console.log(list);
      this.setData({
        articles: list
      });
    })
  },
  getActivity() {
    activityList({
      page: 1,
      pageSize: 8
    }).then(res => {
      this.setData({
        activities: res.data
      })
      console.log(res.data);
    })
  },
  onLoad() {
    // this.getArticle();
    // this.getActivity();
  },
  onShow() {
    this.setData({
      userPhone: wx.getStorageSync('phone') || ''
    })
  },
  onPullDownRefresh: function () {
    setTimeout(() => {
      this.getArticle();
      this.getActivity();
      wx.stopPullDownRefresh();
    }, 500);
  },
})