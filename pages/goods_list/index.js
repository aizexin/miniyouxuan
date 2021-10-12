import {
  request
} from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime';
import { showToastText } from "../../utils/toast.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"综合",
        isActive:true
      },
      {
        id:1,
        value:"销量",
        isActive:false
      },
      {
        id:2,
        value:"价格",
        isActive:false
      }
    ],
    currentIndex:0,
    goodsList:[],
    // 总页数
    totalPage:0
  },
  // 接口需要的参数
  QueryParams:{
    query:'',
    cid:'',
    pagenum:1,
    pagesize:10
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.QueryParams.cid = options.cid
    this.getGoodsList()
  },
  onReachBottom(){
    // 1. 判断是否还有下一页
    if( this.QueryParams.pagenum >= this.data.totalPage) {
      showToastText('没有下一页了')
    } else {
      console.log('还有下一页')
      this.loadmoreGoodsList()
    }
  },
  // 下啦刷新
  onPullDownRefresh() {
    console.log('1111')
    // // 1。重置数组
    // 2.重置页码
    this.QueryParams.pagenum = 1
    // 3.发送请求
    this.getGoodsList()
  },
  // -----------net work
  // 获取商品列表
  async getGoodsList(){
    const res = await request({url:'/goods/search',data: this.QueryParams})
    this.setData({
      goodsList:res.goods,
      totalPage:Math.ceil(res.total/this.QueryParams.pagesize)
    })
    // 关闭下拉窗口  没有调用下拉刷新 直接关闭不会报错
    wx.stopPullDownRefresh()
  },
   // 获取下一页列表
   async loadmoreGoodsList(){
     this.QueryParams.pagenum += 1
    const res = await request({url:'/goods/search',data: this.QueryParams})
    this.setData({
      goodsList:[...this.data.goodsList,...res.goods],
      totalPage:Math.ceil(res.total/this.QueryParams.pagesize)
    })
  },
  // -----action----
  itemChange(event) {
    const {index} = event.detail
    const activeKey = `tabs[${index}].isActive`
    const oldActiveKey = `tabs[${this.data.currentIndex}].isActive`
    this.setData({
      currentIndex : index,
      [activeKey] :true,
      [oldActiveKey] :false
    })
  }
})