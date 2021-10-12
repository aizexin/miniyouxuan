import {
  request
} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧菜单数据
    leftMenuList:[],
    // 右侧数据
    rightContent:[],
    categoryList:[],
    // 被电击的菜单
    currentIndex:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCategoryData()
  },
  // net work
  getCategoryData() {
    request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/categories'
    })
    .then(result => {
      this.categoryList = result.data.message
      // 左侧大菜单数据
      let leftMenuList = this.categoryList.map(v=>v.cat_name)
      // 右侧商品数据
      let rightContent = this.categoryList[0].children
      this.setData({
        leftMenuList: leftMenuList,
        rightContent: rightContent
      })
    })
  },
  // ----------action
  onclickItem(event){
    console.log(event)
    // 1.获取点击的索引
    const {index} = event.currentTarget.dataset
    // 获取不同索引右边的值
    let rightContent = this.categoryList[index].children
    this.setData ({
      currentIndex: index,
      rightContent
    })
  }
})