// pages/search/search.js
Page({
  data : {
    movieLists : []
  },
  bindToHome: function () {
    wx.navigateBack({
      url: '../home/home'
    })
  },

  getSearchData: function (e) {
    console.log(e)
    var value = e.detail.value
    var url = 'http://localhost/v2/movie/search?q=' + value
    wx.request({
       url,
      method: 'GET',
      header: { 'content-type': 'json' },
      success: res => this.arrangeData(res.data.subjects),
      fail: err => console.log(err)
    })
  },
  
  arrangeData(lists) {
    var movieLists = []
    lists.forEach(item => {
      var allDirectors = item.directors.map(i => i.name).join('/')
      var desc = item.rating.average + '分/' + item.year +'/' + allDirectors
      movieLists.push({
        image : item.images.small,
        title : item.title,
        desc
      })
    })
    // console.log(movieLists)
    this.setData({movieLists})
  }

})
