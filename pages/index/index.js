import {
  request
} from "../../request/index.js"
Page({
  data: {
    swiperList: [],
    categoryList:[],
    // 楼层数据
    floorList:[]
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
   this.getswiperList()
   this.getCategoryList()
   this.getFloorList()
  },

  // net work
  // 获取轮播图数据
  getswiperList(){
    request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata'
    })
    .then(result => {
      this.setData({
        swiperList: result.data.message
      })
    })
  },
  // 获取分类导航数据
  getCategoryList(){
    request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems'
    })
    .then(result => {
      this.setData({
        categoryList: result.data.message
      })
    })
  },
  // 获取楼层数据
  getFloorList(){
    request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/floordata'
    })
    .then(result => {
      this.setData({
        floorList: result.data.message
      })
    })
  }
})