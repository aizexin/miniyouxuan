// pages/cart/components/ai-cart-cell/ai-cart-cell.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data:{
      type:Object,
      value:null
    },
    cell_index:{
      type:Number,
      value:0
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
    // 点击勾选
    onClickCheck(){
      this.triggerEvent('onClickItemCheck',{"index":this.data.cell_index})
    },
    // 点击加减
    onClickChangeNum(event) {
      const operate = event.currentTarget.dataset.operate
      console.log(this.data.cell_index)
      this.triggerEvent('onClickChangeItemNum',{"operate":operate,"index":this.data.cell_index})
    }
  }
})
