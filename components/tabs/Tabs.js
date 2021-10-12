// components/tabs/Tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs:{
      type: Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击事件
    onClickItem(event) {
      // 1, 获取点击的索引
      const {index} = event.currentTarget.dataset;
      // 修改cunrrentindex
      this.setData({
        currentIndex: index
      })
      // 2 触发 获取父组件的事件 自定义
      this.triggerEvent('itemChange',{index})
    }
  }
})
