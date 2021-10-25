import { hidenLoading, showLoadingText } from "../utils/toast"

// 同时发送异步请求的次数
let ajxTimes = 0
const TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo'

export const request=(params)=> {
  ajxTimes++
  let header = params.header
  header["Authorization"] = TOKEN
  // 定义公共的url
  const baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1'
  return new Promise((resolve,reject)=> {
    showLoadingText('正在加载...')
    wx.request({
      ...params,
      header:header,
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