const Address_Key = 'Address_Key'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:[],
    totalPrice: 0,
    totalNum: 0
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
     // 1. 获取缓存中的地址信息
     const address = wx.getStorageSync(Address_Key)
     // 2. 获得购物车数据
     let data = wx.getStorageSync('cart') || []
     // // 计算全选 every 会循环，遇到flase的时候就返回flase  但是空数组返回也是true
     // const allChecked = data.length ? data.every(v => v.checked) : false
     data = data.filter(v=>v.checked)
     this.setData({
       address: address,
       cart: data,
     })
     // 设置底部工具栏
     this.setBottomTool(data)
  },
  setBottomTool(cart) {
    let totalPrice = 0
    let totalNum = 0
    cart.forEach(v => {
      if (v.checked) {
        totalNum += v.num
        totalPrice += v.num * v.goods_price
      }
    })
    this.setData({
      totalNum,
      totalPrice
    })
  }
})