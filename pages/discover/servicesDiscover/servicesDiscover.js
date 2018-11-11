function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, i = t(require("../../../utils/util.js")), a = t(require("../../../utils/request.js")), s = t(require("../../../utils/dg.js"));

Page({
    data: {
        discoverList: [],
        serviceInfo: {
            mainDocId: 0
        },
        currentPage: 0,
        latitude: 0,
        longitude: 0,
        hasMore: !0,
        isPreviewImage: !1,
        isLoading: !1,
        businessId: 0
    },
    onLoad: function(t) {
        this.setData({
            businessId: void 0 == t.businessId ? 0 : t.businessId,
            serviceInfo: {
                mainDocId: t.mainDocId,
                id: 0,
                cover: "",
                title: "加载中"
            }
        }), this.getLocation(), this.getServiceInfo();
    },
    onShow: function() {
        this.data.isLoading || this.onPullDownRefresh();
    },
    onPullDownRefresh: function() {
        this.setData({
            discoverList: [],
            currentPage: 0,
            hasMore: !0,
            isLoading: !0
        }), this.getDiscoverList(), s.default.stopPullDownRefresh();
    },
    onReachBottom: function() {
        this.getDiscoverList();
    },
    getLocation: function() {
        var t = this, a = s.default.getStorageSync("addressInfo");
        "object" != (void 0 === a ? "undefined" : e(a)) || "undefined" == a.latitude || void 0 == a.latitude ? i.default.getLocation().then(function(e) {
            t.setData({
                latitude: e.latitude,
                longitude: e.longitude
            }), t.onPullDownRefresh();
        }) : (this.setData({
            latitude: a.latitude,
            longitude: a.longitude
        }), this.onPullDownRefresh());
    },
    getServiceInfo: function() {
        var t = this;
        a.default.post("getDiscoverServicesInfo", {
            mainDocId: this.data.serviceInfo.mainDocId
        }, function(e) {
            e.data.mainDocId = e.data.maindoc_id, t.setData({
                serviceInfo: e.data
            });
        });
    },
    getDiscoverList: function() {
        var t = this;
        0 != this.data.latitude && this.data.hasMore && a.default.post("getDiscoverList", {
            latitude: this.data.latitude,
            longitude: this.data.longitude,
            mainDocId: this.data.serviceInfo.mainDocId,
            businessId: this.data.businessId,
            _p: this.data.currentPage + 1
        }, function(e) {
            var i = e.data.length > 0;
            t.setData({
                discoverList: t.data.discoverList.concat(e.data),
                hasMore: i,
                currentPage: t.data.currentPage + 1,
                isLoading: !1
            });
        });
    },
    previewImage: function(t) {
        this.setData({
            isPreviewImage: !0
        });
        var e = this.data.discoverList[t.currentTarget.dataset.index].image, i = e[t.currentTarget.dataset.index2];
        s.default.previewImage({
            urls: e,
            current: i
        });
    },
    onShareAppMessage: function() {
        return {
            title: this.data.serviceInfo.title + "-附近家政!",
            path: "/pages/discover/discoverIndex/discoverIndex"
        };
    }
});