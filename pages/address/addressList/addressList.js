function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

t(require("../../../utils/util.js"));

var e = t(require("../../../utils/request.js")), a = t(require("../../../utils/dg.js")), s = t(require("../../../utils/listener.js"));

Page({
    data: {
        noData: !1,
        page: 1,
        addressInfo: [],
        hasMore: !0,
        isSelect: 0
    },
    onLoad: function(t) {
        this.setData({
            isSelect: t.isSelect || 0
        });
    },
    onShow: function() {
        this.onPullDownRefresh();
    },
    onPullDownRefresh: function() {
        var t = this;
        e.default.get("getAddressList", {
            _p: 1
        }, function(e) {
            Array.isArray(e.data) && 0 === e.data.length ? t.setData({
                noData: !0,
                addressInfo: []
            }) : t.setData({
                noData: !1,
                addressInfo: e.data
            });
        });
    },
    onReachBottom: function() {
        var t = this;
        this.data.hasMore && e.default.get("getAddressList", {
            _p: this.data.page + 1
        }, function(e) {
            var a = t.data.addressInfo;
            Array.isArray(e.data) && 0 === e.data.length ? t.setData({
                hasMore: !1
            }) : t.setData({
                page: t.data.page + 1,
                addressInfo: a.concat(e.data)
            });
        });
    },
    deleteAddress: function(t) {
        var a = this;
        wx.showModal({
            title: "操作提示",
            content: "您确定要删除改地址吗？",
            success: function(s) {
                if (!0 !== s.cancel) {
                    var n = t.currentTarget.id;
                    e.default.post("deleteAddress", {
                        id: n
                    }, function(t) {
                        wx.showToast({
                            title: "删除成功",
                            mask: !0
                        }), setTimeout(function() {
                            a.onPullDownRefresh();
                        }, 1e3);
                    });
                }
            }
        });
    },
    backPage: function(t) {
        var e = this.data.isSelect, n = t.currentTarget.id;
        if (0 == e) return !1;
        s.default.fireEventListener("selectAddress", n), a.default.navigateBack({});
    }
});