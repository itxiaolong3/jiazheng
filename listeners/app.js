function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, n = t(require("../config")), a = t(require("../utils/listener.js")), r = t(require("../utils/dg")), u = t(require("../utils/util")), o = t(require("../utils/request")), s = t(require("../utils/user-utils")), i = t(require("../utils/uploader")), d = {
    linkToTap: function(t) {
        u.default.open(t.currentTarget.dataset);
    },
    callPhoneTap: function(t) {
        var e = t.currentTarget.dataset.phone;
        this.pushFormIdSubmit(t), wx.makePhoneCall({
            phoneNumber: e
        });
    },
    onOperateEmpty: function() {},
    setDataTap: function(t) {
        var n = JSON.parse(t.currentTarget.dataset.data || "{}"), a = this.data;
        this.pushFormIdSubmit(t);
        var r = {};
        for (var u in n) n.hasOwnProperty(u) && ("object" !== e(a[u]) ? a[u] = n[u] : "object" === e(a[u]) && "object" === e(a[u]) ? Object.deepAssign(a[u], n[u]) : a[u] = n[u], 
        r[u] = a[u]);
        this.setData(r);
    },
    pushFormIdSubmit: function(t) {
        var e = t.detail, n = e.formId, a = void 0 === n ? null : n, r = e.target, s = void 0 === r ? null : r;
        a && o.default.pushFormId(t.detail.formId), s && s.dataset && u.default.open(s.dataset);
    }
}, l = Page;

Page = function(t) {
    return t.data = Object.deepAssign({
        hostUrl: n.default.hostUrl
    }, t.data), l(Object.assign({}, d, t));
};

var f = Component;

Component = function(t) {
    return t.data = Object.deepAssign({
        hostUrl: n.default.hostUrl
    }, t.data), t.methods = Object.assign({}, d, t.methods || {}), f(t);
}, u.default.getLocation = function() {
    var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
    return new Promise(function(e, n) {
        var r = getApp();
        !r.location || t ? wx.getLocation({
            success: function(t) {
                r.location = t, e(t);
            },
            fail: function(t) {
                -1 !== t.errMsg.indexOf("auth deny") ? wx.showModal({
                    title: "温馨提示",
                    content: "此操作需要你开启定位权限，现在是否立即开启？",
                    success: function(t) {
                        t.cancel || a.default.fireEventListener("sys.setting.auth");
                    }
                }) : wx.showModal({
                    title: "温馨提示",
                    content: "定位失败，请检查你的网络或是否禁止了定位权限（" + t.errMsg + ")",
                    showCancel: !1
                }), n(t);
            }
        }) : e(r.location);
    });
}, a.default.addEventListener("app.init", function(t) {
    wx.util = t.app.util = u.default, t.app.request = wx.http = o.default, t.app.Uploader = wx.Uploader = i.default, 
    wx.listener = t.app.listener = a.default, wx.userUtils = t.app.userUtils = s.default;
}), a.default.addEventListener("app.init", function(t) {
    a.default.addEventListener("sys.user.auth", function() {
        var t = getCurrentPages(), e = t[t.length - 1];
        if ("pages/user/userIndex/userIndex" === e.route) return e.setData({
            isShowAuth: !0
        }), !1;
    });
    var e = !1;
    a.default.addEventListener("sys.user.auth", function() {
        e || (e = !0, r.default.navigateTo({
            url: "/pages/user/authUserInfo/authUserInfo"
        }));
    }), a.default.addEventListener("sys.user.info", function(t) {
        s.default.saveUserInfoBySys(t.userInfo), e = !1;
    });
}), a.default.addEventListener("app.init", function(t) {
    var e = !1;
    a.default.addEventListener("sys.setting.auth", function() {
        e || (e = !0, r.default.navigateTo({
            url: "/pages/user/authSettings/authSettings"
        }));
    }), a.default.addEventListener("sys.setting.info", function() {
        e = !1;
    });
}), a.default.addEventListener("app.show", function(t) {
    var e = t.options;
    if (e.query._path) {
        var n = decodeURIComponent(e.query._path);
        wx.navigateTo({
            url: n
        });
    }
}), a.default.addEventListener("app.error", function(t) {
    wx.getLogManager().warn("app.error", t);
});