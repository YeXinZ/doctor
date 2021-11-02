export const baseUrl = "https://health.xunshanfang.cn";

export function request(config) {
  // 加载loading
  wx.showLoading({
    content: '加载中...'
  });
  // 解构赋值
  let {
    url = '',
      data = {},
      method = 'POST'
  } = {
    ...config
  };
  const token = wx.getStorageSync({
    key: 'token'
  });
  let header = token ? {
    token
  } : {};

  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + url,
      method: method,
      data: {
        ...data
      },
      headers: {
        ...header
      },
      success: (res) => {
        if (res.data && res.data.status === 200) {
          resolve(res.data.data)
        } else {
          wx.showToast({
            icon: 'fail',
            content: res.data.msg,
            duration: 2000
          });
          reject(false)
        }
      },
      fail: (err) => {
        reject(err)
      },
      complete: () => {
        setTimeout(() => {
          wx.hideLoading();
        }, 400)
      }
    });
  })
}