// pages/user/components/ai-user-order-cell/ai-user-order-cell.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

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
    onclickItem(event){
      const {type} = event.currentTarget.dataset
      this.triggerEvent('onclickItem',{"type":type})
    }
  }
})
