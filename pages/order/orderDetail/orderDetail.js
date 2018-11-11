function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = t(require("../../../utils/util.js")), a = t(require("../../../utils/request.js")), n = t(require("../../../utils/dg.js"));

Page({
    data: {
        id: 0,
        navStatus: -1,
        orderInfo: [],
        businessInfo: []
    },
    onLoad: function(t) {
        var e = t.id || 1056;
        this.setData({
            id: e
        }), this.getOrderInfo(e);
    },
    onPullDownRefresh: function() {
        this.getOrderInfo(this.data.id);
    },
    getOrderInfo: function(t) {
        var n = this;
        a.default.post("getOrderDetailInfo", {
            id: t
        }, function(t) {
            var a = e.default.transformCode(t.data), o = e.default.code2navStatus(t.data.code), s = a.businessInfo;
            n.setData({
                orderInfo: a,
                businessInfo: s || [],
                navStatus: o
            });
        });
    },
    NavigateTap: function(t) {
        var e = t.currentTarget.dataset.type, a = this.data.id;
        n.default.navigateTo({
            url: "/pages/service/cancel/cancel?type=" + e + "&id=" + a
        });
    },
    setOrderComplete: function() {
        var t = this;
        wx.showModal({
            title: "操作提醒",
            content: "确定要完成您的服务吗?",
            confirmText: "确认完成",
            success: function(e) {
                e.confirm && a.default.post("userSetComplete", {
                    id: t.data.id
                }, function(e) {
                    n.default.showToast({
                        title: "操作成功",
                        mask: !0,
                        duration: 1e3
                    }), t.onPullDownRefresh();
                });
            }
        });
    },
    WeChatPay: function() {
        var t = this, e = this;
        a.default.post("WeChatPay", {
            trade_no: this.data.orderInfo.number
        }, function(a) {
            a.data ? wx.requestPayment(Object.assign(a.data, {
                success: function(t) {
                    n.default.showToast({
                        title: "支付成功",
                        icon: "success",
                        mask: !0,
                        duration: 1e3
                    });
                },
                fail: function(t) {
                    n.default.showToast({
                        title: "支付失败",
                        icon: "none",
                        mask: !0,
                        duration: 1e3
                    });
                },
                complete: function(a) {
                    t.setData({
                        prevent: !1
                    }), setTimeout(function() {
                        e.onPullDownRefresh();
                    }, 1e3);
                }
            })) : e.onPullDownRefresh();
        });
    },
    previewImage: function(t) {
        var e = this.data.orderInfo.commentInfo.image, a = e[t.currentTarget.dataset.index];
        n.default.previewImage({
            urls: e,
            current: a
        });
    }
});