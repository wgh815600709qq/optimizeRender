Page({

  /**
   * 页面的初始数据
   */
  data: {
    showList: [], // 渲染数组
    total: 0,
    currentPage: 0, // 页面实际的值
    page: 0,
    swiperIndex: 0 // 轮播图当前索引值
  },
  pageMax: 0,
  pageMin: 0,
  list: [], // 总数组
  touchstartX: 0,
  // 跳转页面
  setPage(currentPage) {
    // 非正常情形
    if (currentPage < 0 || currentPage >= this.data.total) {
      console.log('非正常情形')
      return
    }
    console.log('pageMin', this.pageMin)
    console.log('pageMax', this.pageMax)
    // 触发重新渲染
    // 计算pageMin、pageMax
    if (this.data.total < 3) { // 头只渲染2张
      this.pageMin = 0
      this.pageMax = this.data.total - 1
    } else if (currentPage < 1) {
      this.pageMin = 0
      this.pageMax = 1
    } else if (currentPage > this.data.total - 2) { // 尾全部渲染
      this.pageMin = currentPage - 1
      this.pageMax = this.data.total
    } else { // 中部渲染n+1张, 
      this.pageMin = currentPage - 1
      this.pageMax = currentPage + 1
    }
    var showList = this.list.slice(this.pageMin, this.pageMax + 1)
    showList = this.virtualRender(showList)
    this.setData({
      showList: showList
    })

  },
  // 虚渲染 0 [1 2 【3】 4 5] 6
  virtualRender(showList) {
    for (var i = 0; i < this.pageMin; i++) {
      showList.unshift(null) // 塞空
    }
    return showList
  },
  // 从入口进去
  fromBegin() {
    this.pageMin = 0;
    this.pageMax = 1;
    var showList = this.list.slice(this.pageMin, this.pageMax + 1)
    this.setData({
      showList: showList,
      swiperIndex: this.data.currentPage - this.pageMin
    })
  },

  onTouchStart(e) {
    this.touchstartX = e.changedTouches[0].clientX
    console.log('touchstartX', this.touchstartX)
  },
  onTouchEnd(e) {
    console.log('move', e.changedTouches[0].clientX - this.touchstartX) //
    var moveXDistance = e.changedTouches[0].clientX - this.touchstartX
    if (moveXDistance < -50) {// < 0 向左
      if (this.data.currentPage + 1 < this.list.length) {
        this.setData({
          currentPage: this.data.currentPage + 1,
          swiperIndex: this.data.swiperIndex + 1
        })
        this.loading().then(() => {
          this.setPage(this.data.currentPage)
        })

      }
    } else if (moveXDistance > 50) {
      if (this.data.currentPage - 1 > 0) {
        this.setData({
          currentPage: this.data.currentPage - 1,
          swiperIndex: this.data.swiperIndex - 1
        })
        this.loading().then(() => {
          this.setPage(this.data.currentPage)
        })

      }
    }
  },
  bindInput(e) {
    this.setData({
      page: e.detail.value
    })
  },
  turnPage() {
    if (+this.data.page + 1 > this.data.total) {
      return
    }
    this.setData({
      currentPage: +this.data.page,
      swiperIndex: +this.data.page
    })
    this.loading().then(() => {
      this.setPage(+this.data.page)
    })

  },
  loading() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
        // wx.showLoading({
        //   title:'正在加载...',
        //   mask: true
        // })
        // setTimeout(() => {
        //   wx.hideLoading()
        // }, 500)
      }, 500)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var list = []
    for (var i = 0; i < 1000; i++) {
      list.push({value:1})
    }
    this.list = list
    this.setData({
      total: list.length
    })
    this.fromBegin()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})