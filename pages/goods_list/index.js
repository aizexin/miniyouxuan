import {
  request
} from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime';

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
    goodsList:[]
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
  // -----------net work
  // 获取商品列表
  async getGoodsList(){
    const res = await request({url:'/goods/search',data: this.QueryParams})

    this.setData({
      goodsList:res.goods
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