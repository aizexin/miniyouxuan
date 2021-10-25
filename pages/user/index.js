// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{}
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const userInfo = wx.getStorageSync('userinfo')
    this.setData({
      userInfo
    })
  },
  // ----order action
  onclickItem(event) {
    console.log(event)
    const {type} = event.detail
    wx.navigateTo({
      url: `/pages/order/index?type=${type}`
    })
  }
})