// index.js
import {
  getHotArticle,
  activityList
} from "../../api/index";

Page({
  data: {
    menuList: [{
      title: '私人医生',
      pagePath: '/pages/doctor/doctor',
      auth: true
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
      title: '联系医生',
      contact: true
    }
    ],
    articles: [],
    activities: [],
    loading: true
  },
  toPage(e) {
    const phone = wx.getStorageSync('phone');
    const userInfo = wx.getStorageSync('userInfo');
    const { path, auth, contact } = e.currentTarget.dataset;
    if (auth && !userInfo) {
      this.selectComponent('#authComp').showDialog(1);
    } else if (auth && !phone) {
      this.selectComponent('#authComp').showDialog(2);
    } else if (path) {
      wx.navigateTo({
        url: path
      })
    } else if (contact) {
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
  onPullDownRefresh: function () {
    setTimeout(() => {
      this.getArticle();
      this.getActivity();
      wx.stopPullDownRefresh();
    }, 500);
  },
})