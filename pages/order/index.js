// pages/order/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:0,
    tabs:[
      {
        id:0,
        value:"全部订单",
        isActive:true
      },
      {
        id:1,
        value:"待付款",
        isActive:false
      },
      {
        id:2,
        value:"待发货",
        isActive:false
      },
      {
        id:3,
        value:"退款/退货",
        isActive:false
      }
    ]
  },
  onShow() {
    const pages = getCurrentPages()
    let currentPage = pages[pages.length - 1]
    // 获取url上的type参数
    const {type} = currentPage.options
    console.log(type)
    // this.get
  },
  itemChange(event){
    const {index} = event.detail
  }
})