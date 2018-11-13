var rootDocment = 'https://jin.itxiaolong.cn/app/index.php?i=3&c=entry&a=wxapp&m=jiaju&do=';
var header = {
  'content-type': 'application/x-www-form-urlencoded'
}
function getReq(url, cb) {
  wx.showLoading({
    title: '加载中',
  })
  wx.request({
    url: rootDocment + url,
    method: 'GET',
    header: {
      'content-type': 'json'
    },
    success: (ret) => {
      wx.hideLoading();
      callback(ret.data)
    },
    fail: (err) => {
      wx.hideLoading();
      wx.showModal({
        title: '网络错误',
        content: '网络出错，请刷新重试',
        showCancel: false
      })
      console.log(err)
    }
  })
}

function postReq(url, data, cb) {
  wx.showLoading({
    title: '加载中',
  })
  console.log("header=="),
    console.log(header),
    wx.request({
      url: rootDocment + url,
      header: header,
      data: data,
      method: 'post',
      success: function (res) {
        wx.hideLoading();
        return typeof cb == "function" && cb(res.data)
      },
      fail: function () {
        wx.hideLoading();
        wx.showModal({
          title: '网络错误',
          content: '网络出错，请刷新重试',
          showCancel: false
        })
        return typeof cb == "function" && cb(false)
      }
    })

}
module.exports = {
  getReq: getReq,
  postReq: postReq,
  header: header,
}