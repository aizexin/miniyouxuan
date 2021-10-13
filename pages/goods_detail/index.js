import {
  request
} from "../../request/index"

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
        pics: res.pics
      }
    })
  }
})