import {
  showToastText
} from '../../utils/toast'
import {
  getSetting,
  chooseAddress,
  openSetting,
  showModal
} from '../../utils/asyncwx'
import regeneratorRuntime from '../../lib/runtime/runtime';

const Address_Key = 'Address_Key'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },

  /**
   * 生命周期函数--监听页面出现
   */
  onShow() {
    // 1. 获取缓存中的地址信息
    const address = wx.getStorageSync(Address_Key)
    // 2. 获得购物车数据
    const data = wx.getStorageSync('cart') || []
    // // 计算全选 every 会循环，遇到flase的时候就返回flase  但是空数组返回也是true
    // const allChecked = data.length ? data.every(v => v.checked) : false

    this.setData({
      address: address,
      cart: data,
    })
    // 设置底部工具栏
    this.setBottomTool(data)
  },
  //  ------action
  async onClickGetAddress() {
    try {
      // 1 获取权限状态
      const res1 = await getSetting()
      const scopeAddress = res1.authSetting["scope.address"]
      // 2 判断状态
      if (scopeAddress === false) {
        // 4 诱导用户打开权限页面
        const openAuth = await openSetting()
      }
      // 3 获取收获地址
      let address = await chooseAddress()
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo
      // 5 存储地址
      wx.setStorageSync(Address_Key, address)
    } catch (error) {}
  },
  setBottomTool(cart) {
    let totalPrice = 0
    let totalNum = 0
    let allChecked = true
    cart.forEach(v => {
      if (v.checked) {
        totalNum += v.num
        totalPrice += v.num * v.goods_price
      } else {
        allChecked = false
      }
    })
    if (cart.length === 0) {
      allChecked = false
    }
    this.setData({
      totalNum,
      totalPrice,
      allChecked
    })
  },
  // ------cell 代理
  onClickItemCheck(event) {
    console.log('---onClickItemCheck-----')
    const index = event.detail.index
    const key = `cart[${index}].checked`
    this.setData({
      [key]: !this.data.cart[index].checked
    })
    // 设置底部工具栏
    this.setBottomTool(this.data.cart)
  },
  async onClickChangeItemNum(event) {
    console.log('--------')
    const operate = event.detail.operate
    const index = event.detail.index
    console.log(index)
    const num_key = `cart[${index}].num`
    const endNum = this.data.cart[index].num + operate
    if (endNum <= 0) {
      // 提示 是否要删除
      try {
        const res = await showModal('是否要删除')
        if (res.confirm) {
          console.log('用户点击确定')
          this.data.cart.splice(index, 1)
          this.setData({
            cart:this.data.cart
          })
        } else {
          return
        }
      } catch (error) {
        
      }
    } else {
      this.setData({
        [num_key]: endNum
      })
    }
    // 修改之后的cart 存回银盘
    wx.setStorageSync('cart', this.data.cart)
    // 设置底部工具栏
    this.setBottomTool(this.data.cart)
  },
  // ----底部工具栏代理
  onclickPay() {
    // 1.判断是否有地址
    if (!this.data.address.cityName) {
      showToastText('请选择收货地址')
      return
    }
    // 2.判断是否选择商品
    const isChooseShop = (this.data.cart.filter(v=>v.checked).length !== 0)
    if (!isChooseShop) {
      showToastText('请选择商品')
      return
    }
    // 3.跳转支付
    wx.navigateTo({
      url: '/pages/pay/index',
    })
  }
})