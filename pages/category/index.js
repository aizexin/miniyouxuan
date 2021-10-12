import {
  request
} from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime';

const Cates_Key = 'Cates_Key'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧菜单数据
    leftMenuList: [],
    // 右侧数据
    rightContent: [],
    categoryList: [],
    // 被电击的菜单
    currentIndex: 0,
    // 右侧内容滚动条距离顶部的距离
    scrollTop: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 1.先判断有没有本地存储的数据， 数据过期没
    const cates = wx.getStorageSync(Cates_Key)
    // 2.判断有没有数据
    if (!cates) {
      // 不存在请求数据
      showToastText('不存在本地')
      this.getCategoryData()
    } else {
      // 判断有没有过期  定义过期时间10s
      if (Date.now() - cates.time > 1000 * 10) {
        // 重新请求
        this.getCategoryData()
      } else {
        // 可以使用老数据
        this.categoryList = result.data.message
        // 左侧大菜单数据
        let leftMenuList = this.categoryList.map(v => v.cat_name)
        // 右侧商品数据
        let rightContent = this.categoryList[0].children
        this.setData({
          leftMenuList: leftMenuList,
          rightContent: rightContent
        })
      }
      showToastText('存在本地数据')
    }
  },
  // net work
  async getCategoryData() {
    const result = await request({
      url: '/categories'
    })
    this.categoryList = result
    // 把接口数据存到本地
    wx.setStorageSync(Cates_Key, {
      time: Date.now(),
      data: this.categoryList
    });
    // 左侧大菜单数据
    let leftMenuList = this.categoryList.map(v => v.cat_name)
    // 右侧商品数据
    let rightContent = this.categoryList[0].children
    this.setData({
      leftMenuList: leftMenuList,
      rightContent: rightContent
    })

  },
  // ----------action
  onclickItem(event) {
    // 1.获取点击的索引
    const {
      index
    } = event.currentTarget.dataset
    // 获取不同索引右边的值
    let rightContent = this.categoryList[index].children
    this.setData({
      currentIndex: index,
      rightContent,
      scrollTop: 0
    })
  }
})