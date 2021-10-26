// components/ai-upImage/ai-upImage.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imageUrl:{
      type:String,
      value:''
    },
    index:{
      type:Number
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
    onClickDelte() {
      this.triggerEvent('onClickDelte',{'index':this.data.index})
    }
  }
})
