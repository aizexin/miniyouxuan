import { hidenLoading, showLoadingText } from "../utils/toast"

// 同时发送异步请求的次数
let ajxTimes = 0

export const request=(params)=> {
  ajxTimes++
  // 定义公共的url
  const baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1'
  return new Promise((resolve,reject)=> {
    showLoadingText('正在加载...')
    wx.request({
      ...params,
      url: baseUrl + params.url,
      success:(result)=> {
        resolve(result.data.message)
      },
      fail:(err)=> {
        reject(err)
      },
      complete:()=> {
        ajxTimes--
        if(ajxTimes === 0) {
          hidenLoading()
        }
      }
    })
  } )
}