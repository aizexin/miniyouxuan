import { values } from "../../../../lib/runtime/runtime";

// pages/cart/components/ai-bottom-tool/ai-bottom-tool.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    totalNum:{
      type:Number,
      values:0
    },
    totalPrice:{
      type:Number,
      values:0
    },
    allChecked:{
      type:Boolean,
      values:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onclickPay() {
       this.triggerEvent('onclickPay')
    }
  }
})
