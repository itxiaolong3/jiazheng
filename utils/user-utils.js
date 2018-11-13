function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = e(require("./dg")), r = e(require("./util")), t = e(require("./listener")), s = e(require("./request")), my = e(require("./myrequest"));

e(require("../config"));
exports.default = {
    getUserInfo: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        return new Promise(function(n, r) {
            var t = getApp();
            !t.userInfo || e ? s.default.get("getUserInfo", null, null, {
                needAuth: !0
            }).then(function(e) {
                t.userInfo = e.data, n(t.userInfo);
            }, r) : n(t.userInfo);
        });
    },
    getSysUserInfo: function() {
        return new Promise(function(e, r) {
            n.default.os.isWechat() ? n.default.getUserInfo({
                lang: "zh_CN",
                success: e,
                fail: function(n) {
                    console.error(n), e(new Promise(function(e, n) {
                        t.default.addEventListener("sys.user.info", function(r) {
                            r ? e(r) : n({
                                errMsg: "取消授权"
                            });
                        }, !0), t.default.fireEventListener("sys.user.auth");
                    }));
                }
            }) : n.default.getUserInfo({
                success: e,
                fail: r
            });
        });
    },
    saveUserInfo: function(e) {
      console.log('user-utils里面的');
      console.log(e);
      console.log(my);
      wx.login({
        success(res) {
          if (res.code) {
            var data = {
              code: res.code,
              nickname: e.nick_name,
              headerimg: e.avatar
            };
            
            //发起网络请求
            my.default.postReq('doLogin',
              data, (ret) => {
                console.log(ret);
                wx.setStorageSync('openid', ret.userinfo.openId);
                t.default.fireEventListener("user.info.update", ret.userinfo)
                
              })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
     
        // return s.default.post("saveUserInfo", e, null, {
        //     needAuth: !0
        // }).then(function(e) {
        //     return t.default.fireEventListener("user.info.update", e.data), e;
        // });
    },
    saveUserInfoBySys: function(e) {
        var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
        return this.saveUserInfo({
            nick_name: e.nickName,
            avatar: e.avatarUrl || e.avatar,
            gender: 1 == e.gender ? "m" : "f",
            province: e.province,
            city: e.city,
            extend: JSON.stringify(e),
            is_sync_info: n
        });
    },
    syncUserInfo: function() {
        var e = this;
        return this.getSysUserInfo(function(n) {
            return e.saveUserInfoBySys(n);
        });
    },
    syncOneUserInfo: function() {
        var e = this;
        return r.default.callbacksTransformPromise(wx.getSetting).then(function(n) {
            var r = n.authSetting["scope.userInfo"];
            return e.getSysUserInfo().then(function(n) {
                return r || e.saveUserInfoBySys(n.userInfo, 2), n;
            });
        });
    }
};