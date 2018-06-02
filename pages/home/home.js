  var app = getApp();
  Page({
    data:{
      inTheaters:[]
    },

    onLoad(option){
      wx.showToast({
        title: '请稍等',
        icon :'loading',
        duration:30000
      })
      var url = app.globalData.doubanBase + app.globalData.inTheater + '?start=0&count=10';
      this.getMovieLists(url)

    },
  bindToSearch:function(){
      wx.navigateTo({
        url: '../search/search',
      })
  },
  getMovieLists(url){
    wx.request({
      url,
      method: 'GET',
      header: { 'content-type': 'json' },
      success : res=>{
        console.log(res)
        this.setData({inTheaters:res.data.subjects})
      },
      fail(err){

      },
      complete() {
        wx.hideToast()
      }
    })
  },
  bindToMore(e){
    console.log(e)
    wx.navigateTo({
      url: '../more/more?typeId='+e.target.dataset.typeId,
    })
  }
})