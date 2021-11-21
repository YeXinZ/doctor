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
  const token = wx.getStorageSync('token');
  let header = token ? {
    token
  } : {};
  console.log(header);

  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + url,
      method: method,
      data: {
        ...data
      },
      header: {
        ...header
      },
      success: (res) => {
        if (res.data && res.data.status === 200) {
          resolve(res.data.data)
        } else if (res.data && res.data.status === 300) {
          wx.showToast({
            icon: 'none',
            title: res.data.msg,
            duration: 1200
          });
          wx.clearStorageSync();
          setTimeout(() => {
            wx.switchTab({
              url: '/pages/index/index',
            })
          }, 1200);
          reject(false);
        } else {
          wx.showToast({
            icon: 'none',
            title: res.data.msg,
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