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
    data: {
      id
    }
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
    data: {
      id
    }
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
    data: {
      item_id
    }
  })
}
// 获取心情打卡信息
export const getMood = () => {
  return request({
    url: '/api/Clockin/getMood',
    method: 'GET'
  })
}
// 获取心情打卡列表
export const getMoodList = (data) => {
  return request({
    url: '/api/Clockin/getMoodList',
    method: 'GET',
    data
  })
}
// 心情打卡
export const addMood = (mood_data) => {
  return request({
    url: '/api/Clockin/addMood',
    method: 'POST',
    data: {
      mood_data
    }
  })
}
// 获取睡眠打卡信息
export const getSleep = () => {
  return request({
    url: '/api/Clockin/getSleep',
    method: 'GET'
  })
}
// 睡眠打卡
export const addSleep = (data) => {
  return request({
    url: '/api/Clockin/addSleep',
    method: 'POST',
    data
  })
}
// 获取睡眠打卡列表
export const getSleepList = (data) => {
  return request({
    url: '/api/Clockin/getSleepList',
    method: 'GET',
    data
  })
}
// 获取饮食指导信息
export const getTodayDiet = () => {
  return request({
    url: '/api/Clockin/getTodayDiet',
    method: 'GET'
  })
}
// 饮食打卡
export const addDiet = (data) => {
  return request({
    url: '/api/Clockin/addDiet',
    method: 'POST',
    data
  })
}
// 获取饮食打卡列表
export const getDietList = (data) => {
  return request({
    url: '/api/Clockin/getDietList',
    method: 'GET',
    data
  })
}
// 获取运动指导信息
export const getClockMotion = () => {
  return request({
    url: '/api/Clockin/getMotion',
    method: 'GET'
  })
}
// 运动打卡
export const addMotion = (data) => {
  return request({
    url: '/api/Clockin/addMotion',
    method: 'POST',
    data
  })
}
// 获取运动打卡列表
export const getMotionList = (data) => {
  return request({
    url: '/api/Clockin/getMotionList',
    method: 'GET',
    data
  })
}
// 获取我的活动
export const getUserActivity = (data) => {
  return request({
    url: '/api/Personal/getUserActivity',
    method: 'GET',
    data
  })
}
// 授权登录
export const authLogin = (data) => {
  return request({
    url: '/api/author/login',
    method: 'GET',
    data
  })
}
// 获取手机号
export const authNumber = (data) => {
  return request({
    url: '/api/author/number',
    method: 'GET',
    data
  })
}
// 注册
export const authRegist = (data) => {
  return request({
    url: '/api/author/regist',
    method: 'GET',
    data
  })
}
// 私人医生点击
export const getVip = () => {
  return request({
    url: '/api/Usercase/getVip',
    method: 'GET'
  })
}