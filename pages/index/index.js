// index.js
import {
  getArticleList,
  activityList
} from "../../api/index";

Page({
  data: {
    menuList: [{
        title: '私人医生\n健康管理',
        pagePath: '/pages/doctor/doctor'
      },
      {
        title: '健康百科'
      },
      {
        title: '最新活动'
      },
      {
        title: '联系医生\n立马咨询'
      }
    ],
    articles: [],
    activities: [],
    loading: true
  },
  toPage(e) {
    const path = e.currentTarget.dataset.path;
    if (path) {
      wx.navigateTo({
        url: path
      })
    }
  },
  getArticle() {
    getArticleList({
      page: 1,
      pageSize: 8,
      type_id: 4
    }).then(res => {
      // const list = res.data;
      const list = [{
        "id": 18,
        "title": "鞍山市",
        "image": "topic/20210814\b684afc15721dccc68d1357afb8257c7.png",
        "abstract": "按时大大",
        "author": "按时大大",
        "publish_time": "2021-08-13 00:00:00"
      }];
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
    this.getArticle();
    this.getActivity();
  }
})