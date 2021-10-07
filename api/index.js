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
// 获取活动详情
export const activityInfo = (id) => {
  return request({
    url: '/api/Activity/activityInfo',
    method: 'GET',
    data: { id }
  })
}
// 活动报名
export const activitySignUp = (data) => {
  return request({
    url: '/api/Activity/activitySignUp',
    method: 'POST',
    data
  })
}
// 获取文章分类
export const getArticleType = () => {
  return request({
    url: '/api/Article/getArticleType',
    method: 'GET'
  })
}
// 文章详情
export const getArticleInfo = (id) => {
  return request({
    url: '/api/Article/getArticleInfo',
    method: 'GET',
    data: { id }
  })
}
// 获取病例
export const getCase = () => {
  return request({
    url: '/api/Usercase/getCase',
    method: 'GET'
  })
}
// 获取用药指导
export const getMedication = () => {
  return request({
    url: '/api/Guide/getMedication',
    method: 'GET'
  })
}
// 获取热门推荐文章
export const getHotArticle = () => {
  return request({
    url: '/api/Article/getHotArticle',
    method: 'GET'
  })
}
// 获取饮食指导信息
export const getDiet = () => {
  return request({
    url: '/api/Guide/getDiet',
    method: 'GET'
  })
}
// 获取运动指导
export const getMotion = () => {
  return request({
    url: '/api/Guide/getMotion',
    method: 'GET'
  })
}
// 添加病例
export const addCsae = (data) => {
  return request({
    url: '/api/Usercase/addCsae',
    method: 'POST',
    data
  })
}
// 获取我的项目
export const getUserItem = () => {
  return request({
    url: '/api/Personal/getUserItem',
    method: 'GET'
  })
}
// 项目使用记录
export const getItemUseList = (item_id) => {
  return request({
    url: '/api/Personal/getItemUseList',
    method: 'GET',
    data: { item_id }
  })
}