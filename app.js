function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

require("./utils/native-extension.js"), require("./listeners/index.js");

var i = e(require("./utils/listener.js")), t = e(require("./config"));

App({
  data: {
    url: 'https://jin.itxiaolong.cn/app/index.php?i=3&c=entry&a=wxapp&m=jiaju&do='
  },
  http_get: function (method, callback) {
    wx.request({
      url: `${this.data.url}${method}`,
      method: 'GET',
      header: {
        'content-type': 'json'
      },
      success: (ret) => {
        callback(ret.data)
      },
      fail: (err) => {
        console.log(err)
      }
    })
  },

  http_post: function (method, params, callback) {
    let basic = {
      i: '3',
      c: 'entry',
      a: 'wxapp',
      m: 'jiaju',
      do: method
    }
    wx.request({
      url: this.data.url.substr(0, this.data.url.indexOf('?')),
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: this.merge(basic, params),
      success: (ret) => {
        callback(ret.data)
      },
      fail: (err) => {
        console.log(err)
      }
    })
  },
  merge: function (target, source) {
    for (var obj in source) {
      target[obj] = source[obj]
    }
    return target
  },
    onLaunch: function(e) {
        this.config = t.default, this.options = e, i.default.fireEventListener("app.init", {
            app: this,
            options: e
        });
    },
    onShow: function(e) {
        i.default.fireEventListener("app.show", {
            app: this,
            options: e
        });
    },
    onHide: function(e) {
        i.default.fireEventListener("app.hide", {
            app: this,
            options: e
        });
    },
    onError: function(e) {
        i.default.fireEventListener("app.error", {
            app: this,
            msg: e
        });
    }
});