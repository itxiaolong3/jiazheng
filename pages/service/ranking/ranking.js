function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = t(require("../../../utils/util.js")), s = t(require("../../../utils/request.js")), n = t(require("../../../utils/dg.js"));

Page({
    data: {
        businessPage: 1,
        businessInfo: [],
        businessHasMore: !0
    },
    onLoad: function(t) {
        var s = this, a = n.default.getStorageSync("addressInfo");
        a ? this.setData({
            latitude: a.latitude,
            longitude: a.longitude
        }) : e.default.getLocation().then(function(t) {
            s.setData({
                latitude: t.latitude,
                longitude: t.longitude
            });
        });
    },
    onShow: function() {
        this.onPullDownRefresh();
    },
    onPullDownRefresh: function() {
        this.getAroundGoodBusiness();
    },
    onReachBottom: function() {
        this.data.businessHasMore && this.getAroundGoodBusiness();
    },
    onShareAppMessage: function() {
        return {
            title: "附近家政优秀商家排行榜",
            path: "/pages/service/ranking/ranking"
        };
    },
    getAroundGoodBusiness: function() {
        var t = this, e = this.data.businessPage, n = this.data.businessInfo;
        s.default.get("getAroundGoodBusiness", {
            _p: e,
            latitude: this.data.latitude,
            longitude: this.data.longitude
        }, function(s) {
            if (Array.isArray(s.data) && 0 === s.data.length) t.setData({
                businessHasMore: !1
            }); else {
                var a = n.concat(s.data);
                t.setData({
                    businessInfo: a,
                    businessPage: e + 1
                });
            }
        });
    }
});