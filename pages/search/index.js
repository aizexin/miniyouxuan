import {
  request
} from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:[]
  },
  TimeId:-1,
  handleInput(e) {
    const {value} = e.detail
    // 检测合法性
    if(!value.trim()) {
      return
    }
    this.TimeId = setTimeout(()=> {
      // 请求网络
      this.querySearch(value)
    },1000)
  },
  // ----net work
  async querySearch(query) {
    const res = await request({url:'/goods/qsearch',data:{query}})
    console.log(res)
    this.setData({
      goods:res
    })
  }
})