import {
  request
} from "../../request/index"
import regeneratorRuntime from '../../lib/runtime/runtime';
import {
  login,getUserProfile
} from "../../utils/asyncwx"

// pages/auth/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // ----------action-----
  async getUserProfile(event) {
    // 获取token
    try {
      // 1.获取用户信息
      const { encryptedData, iv, rawData, signature } = await getUserProfile('获取用户信息')
      // 2.获取登录后的code
      const code  = await login();
      const loginParams={ encryptedData, rawData, iv, signature ,code};
      //  3 发送请求 获取用户的token

      console.log(token)
    } catch (error) {
      console.log(error)
    }
  }
})