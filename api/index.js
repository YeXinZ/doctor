import {
  request
} from '../utils/request';

// 获取文章列表
export const getArticleList = (data) => {
  return request({
    url: '/api/Article/getArticleList',
    method: 'POST',
    data
  })
}
// 获取活动列表
export const activityList = (data) => {
  return request({
    url: '/api/Activity/activityList',
    method: 'GET',
    data
  })
}

export const getCase = () => {
  return request({
    url: '/api/Usercase/getCase',
    method: 'GET'
  })
}