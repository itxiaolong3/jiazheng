function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

e(require("../../../utils/util.js"));

var t = e(require("../../../utils/request.js")), n = e(require("../../../utils/user-utils.js")), u = e(require("../../../utils/listener"));

getApp();

Page({
    data: {
        userInfo: null,
        isShowAuth: !0,
        isShowTip: !1,
        count: []
    },
    onLoad: function(e) {},
    onShow: function() {
        u.default.addEventListener("user.info.update", this.onUserInfoUpdate), this.onPullDownRefresh();
    },
    onUserInfoUpdate: function(e) {
        var t = !1;
        e.mobile || (t = !0), this.setData({
            userInfo: e,
            isShowTip: t
        });
    },
    onUnload: function() {
        u.default.removeEventListener("user.info.update", this.onUserInfoUpdate);
    },
    onPullDownRefresh: function() {
        var e = this;
        n.default.getUserInfo(!0).then(function(e) {
            u.default.fireEventListener("user.info.update", e);
        }).finally(function() {
            wx.stopPullDownRefresh();
        }), t.default.get("getStatistics", {}, function(t) {
            e.setData({
                count: t.data
            });
        });
    }
});