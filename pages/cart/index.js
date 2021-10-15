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
    cart:[]
  },

  /**
   * 生命周期函数--监听页面出现
   */
  onShow() {
    // 1. 获取缓存中的地址信息
    const address = wx.getStorageSync(Address_Key)
    console.log(address)
    this.setData({
      address:address
    })
    this.readCartData()
  },
  // ---dataSource
  readCartData() {
    const data = wx.getStorageSync('cart')
    this.setData({
      cart:data
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