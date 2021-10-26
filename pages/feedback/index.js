const { showToastText } = require("../../utils/toast")

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
    upImageUrls:[],
    feedbackText:''
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
  },
  blurText(e) {
    this.setData({
      feedbackText:e.detail.value
    })
  },
  onClickSubmit() {
    const tab = wx.createSelectorQuery().select('#tabs')

    // 验证text
    if(this.data.feedbackText.length === 0) {
      showToastText('请输入文字')
      return
    }
    // 上传图片服务器用wx, 成功后传到后台服务器
    // wx.uploadFile({
    //   filePath: 'filePath',
    //   name: 'name',
    //   url: 'url',
    // })
    // 清空
    this.setData({
      feedbackText:'',
      upImageUrls:[]
    })
    // 返回
    wx.navigateBack({
      delta: 1,
    })
  }
})