// pages/feedback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"体验问题",
        isActive:true
      },
      {
        id:1,
        value:"商家投诉",
        isActive:false
      }
    ],
    upImageUrls:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // ----action
  itemChange(e){

  },
  onClickAddImage() {
    wx.chooseImage({
      count: 9,
      success:(res)=> {
        console.log(res)
        this.setData({
          upImageUrls:[...this.data.upImageUrls,...res.tempFilePaths]
        })
      }
    })
  },
  onClickDelte(e) {
    const {index} = e.detail
    let array = this.data.upImageUrls
    array.splice(index,1)
    this.setData({
      upImageUrls:array
    })
  }
})