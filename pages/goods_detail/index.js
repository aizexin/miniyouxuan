import {
  request
} from "../../request/index"
import { showToastText } from "../../utils/toast"

// pages/goods_detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsDetailObj: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const goods_id = options.goods_id
    console.log(goods_id)
    this.getGoodsDetail(goods_id)
  },
  onShow(option){
    const info = wx.getLaunchOptionsSync()
    const shareTicket = info.shareTicket
    console.log(info)
    console.log('onshow')
    wx.getShareInfo({
      shareTicket: shareTicket,
      success:(res)=> {
        console.log(res)
        console.log('分享返回')
      },
      fail:(err)=> {
        console.log('分享错误')
        console.log(err)
      }
    })
  },
  // -----net work
  async getGoodsDetail(good_id) {
    const res = await request({
      'url': '/goods/detail',
      'data': {
        goods_id: good_id
      }
    })

    this.setData({
      goodsDetailObj: {
        goods_name: res.goods_name,
        goods_price: res.goods_price,
        goods_introduce: res.goods_introduce.replace(/\.webp/g,'.jpg'),
        goods_id: res.goods_id,
        pics: res.pics
      }
    })
  },
  // ----action
  handlePrevewImage(event){
    const urls = this.data.goodsDetailObj.pics.map(v=>v.pics_mid)
    const currenturl = event.currentTarget.dataset.currenturl
    console.log(currenturl)
    wx.previewImage({
      urls: urls,
      current: currenturl
    })
  },
  // tool -action 
  // 点击购物车
  onclickAddShopCart() {
    console.log('------')
    // 1. 获取缓存中的购物车
    let cart = wx.getStorageSync('cart') || [];
    // 2.判断 商品对象是否存在
    let index = cart.findIndex(v=>v.goods_id === this.data.goodsDetailObj.goods_id) 
    if (index === -1 ) { 
      // 不存在  第一次添加
      this.data.goodsDetailObj.num = 1
      this.data.goodsDetailObj.checked = true
      cart.push(this.data.goodsDetailObj)
    } else {
      cart[index].num++
    }
    // 把购物车重新添加回缓存
    wx.setStorageSync('cart', cart)
    // 提示
    showToastText('加入成功')
  }
})