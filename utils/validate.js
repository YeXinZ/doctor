function checkPhone(phone) {
  // 判断手机号
  if (!phone) {
    wx.showToast({
      title: '请输入手机号',
      icon: 'none',
      duration: 2000
    });
    return false
  }
  if (phone.length < 11) {
    wx.showToast({
      title: '手机号位数不对，请重新输入',
      icon: 'none',
      duration: 2000
    });
    return false
  }
  if (!(/^1[3456789]\d{9}$/.test(phone))) {
    wx.showToast({
      title: '手机号格式有误，请重新输入',
      icon: 'none',
      duration: 2000
    });
    return false
  }
  return true
}

function checkName(name) {
  if (!name) {
    wx.showToast({
      title: '姓名不能为空',
      icon: 'none',
      duration: 2000
    });
    return false;
  }
  const nameReg = /^[a-zA-Z\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
  if (!nameReg.test(name)) {
    wx.showToast({
      title: '姓名格式输入错误',
      icon: 'none',
      duration: 2000
    });
    return false;
  }
  return true;
}

module.exports = {
  checkPhone,
  checkName
}