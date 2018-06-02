// pages/more/more.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      showIntheater : true,
      showComingsoon : false,
      intheater: {},
      comingsoon: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var url = null;
      if(options.typeId == 'intheater'){
          url = app.globalData.doubanBase+app.globalData.inTheater
          this.setData({'showIntheater':true,'showComingsoon':false})
      }else{
        url = app.globalData.doubanBase + app.globalData.comingSoon
        this.setData({ 'showIntheater': false, 'showComingsoon': true })
        

        }
      this.getMovieList(url, options.typeId)

  },
  changeHandle(e){
    console.log(e)
    if (e.target.dataset.tabId == 'intheater') {
      if (!this.data.intheater.movies) {
        var url = app.globalData.doubanBase + app.globalData.inTheater
        this.getMovieList(url,e.target.dataset.tabId)
      }
      this.setData({ 'showIntheater': true, 'showComingsoon': false })
    } else {
      if (!this.data.comingsoon.movies) {
        var url = app.globalData.doubanBase + app.globalData.comingSoon
        this.getMovieList(url, e.target.dataset.tabId)
      }
      this.setData({ 'showIntheater': false, 'showComingsoon': true })
    }
  },

  getMovieList(url,_type){
    var offset = this.data[_type].offset || 0
    var total = this.data[_type].total || 9999
    var movieLists = this.data[_type].movies || []
      if( offset >= total){
          return 
      }
      url += `?start=${offset}&count=5`;
      wx.showToast({
        title: 'Loading',
        icon: 'loading',
        duration:5000
      })
      wx.request({
        url,
        method:'GET',
        header:{"content-type":"json"},
        success:res=>{
            res.data.subjects.forEach(item => {
                var allDirs = item.directors.map(i =>i.name).join('/')
                var allCasts = item.casts.map(i => i.name).join('/')
                var allGenres = item.genres.join('/')
                Object.assign(item,{allDirs,allCasts,allGenres})
            })
            this.setData({[_type]:{total:res.data.total,
            offset : offset +res.data.subjects.length,
            movies :[...movieLists,...res.data.subjects]
            }})
        },
        fail: err =>{

        },
        complete(){
          wx.hideToast()
        }
      })
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