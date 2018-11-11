function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(t) {
    return 2 === t.code;
}

function n() {
    return u.default.utoken || (u.default.utoken = r.default.getStorageSync("__UTOKEN__")), 
    u.default.utoken;
}

function o(t, e) {
    if (d.push(t), !l) {
        l = !0;
        var o = function(t, e) {
            d.forEach(function(n) {
                n[t] && n[t].call(null, e);
            }), d = [], l = !1;
        }, a = function(t) {
            r.default.request({
                url: u.default.loginUrl,
                method: "POST",
                data: {
                    code: t.code,
                    token: u.default.token,
                    utoken: n()
                },
                success: function(t) {
                    if (1 !== (t = t.data).code) return o("fail", {
                        errMsg: t.info
                    })
                    u.default.utoken = t.utoken, r.default.setStorageSync("__UTOKEN__", t.utoken), getApp().userInfo = t.data, 
                    o("success", t.data);
                },
                fail: function(t) {
                    return o("fail", t);
                }
            });
        };
        r.default.authLogin({
            success: function(t) {
                e ? f.default.syncOneUserInfo().then(function() {
                    a(t);
                }, function(t) {
                    return o("fail", t);
                }) : a(t);
            },
            fail: function(t) {
                return o("fail", t);
            }
        });
    }
}

var u = t(require("../config")), a = require("../utils/request"), i = t(a), r = t(require("../utils/dg")), f = t(require("../utils/user-utils")), l = (t(require("../utils/listener.js")), 
!1), d = [];

i.default.defaults.baseURL = u.default.apiUrl, i.default.addRequestInterceptor(function(t) {
    t.isShowLoading = !1 !== t.isShowLoading, t.isShowLoading && wx.showLoading({
        title: "请稍后...",
        mask: !0
    });
    var e = t.filePath || t.isUpload ? t.formData = t.formData || {} : t.data = t.data || {};
    return e.utoken = n(), e.token = u.default.token, t;
});

var s = [];

i.default.pushFormId = function(t) {
    t && (s.length >= 100 && s.shift(), s.push(t));
}, i.default.addRequestInterceptor(function(t) {
    return s.length && (t.method && "get" !== t.method ? t.data.__form_id__ = s.splice(0, 20) : t.data.__form_id__ = s.shift()), 
    t;
}), i.default.addResponseInterceptor(function(t) {
    wx.hideLoading();
    var n = t.config, u = !!n.needAuth && n.needAuth, r = t.data;
    if ((n.filePath || n.isUpload) && (r = JSON.parse(r)), 1 === r.code) return n.onlyReturnData = !1 !== n.onlyReturnData, 
    n.onlyReturnData ? r : t;
    if (e(r)) return n.loginInvalidCount ? wx.showModal({
        title: "温馨提示",
        content: "网络错误，请稍后再试~",
        showCancel: !1
    }) : (n.loginInvalidCount = 1, new Promise(function(t, e) {
        o({
            success: function() {
                t((0, i.default)(n));
            },
            fail: e
        }, u);
    }));
    throw !0 !== t.config.ignoreErrorTip && wx.showToast({
        title: r.info || "请求错误",
        icon: "none"
    }), new a.HttpException(r.code, r.info, n, t);
}, function(t) {
    return wx.hideLoading(), wx.showToast({
        title: "网络连接失败，请稍后再试~",
        icon: "none"
    }), wx.getLogManager().warn("request.fail", t), Promise.reject(t);
});