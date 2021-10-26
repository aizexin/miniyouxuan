import {
  request
} from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:[],
    inputValue:'',
    isFocus:false
  },
  TimeId:-1,
  handleInput(e) {
    const {value} = e.detail
    // 检测合法性
    if(!value.trim()) {
      this.setData({
        goods:[],
        isFocus:false
      })
      return
    }
    this.setData({
      isFocus:true
    })
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
  },
  // ----action
  onClickCancle(){
    this.setData({
      goods:[],
      isFocus:false
    })
  }
})