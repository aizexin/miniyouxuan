import {
  showToastText
} from '../../utils/toast'
import {
  getSetting,
  chooseAddress,
  openSetting
} from '../../utils/asyncwx'
import regeneratorRuntime from '../../lib/runtime/runtime';

const Address_Key = 'Address_Key'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:[],
    allChecked:false,
    totalPrice:0,
    totalNum:0
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

    let totalPrice = 0
    let totalNum = 0
    let allChecked = true
    data.forEach(v=> {
      if(v.checked) {
        totalNum += v.num
        totalPrice += v.num * v.goods_price
      } else {
        allChecked = false
      }
    })
    if (data.length === 0) {
      allChecked = false
    }

    this.setData({
      address:address,
      cart:data,
      allChecked:allChecked,
      totalNum,
      totalPrice
    })
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
    } catch (error) {
    }
  }
})