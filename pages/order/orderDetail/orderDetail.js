function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}
const app=getApp();
var e = t(require("../../../utils/util.js")), a = t(require("../../../utils/request.js")), n = t(require("../../../utils/dg.js"));

Page({
    data: {
        id: 0,
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
        app.http_post("getOrderDetail", {
            id: t
        }, function(t) {
            console.log(t);
            //  s = a.businessInfo;
            n.setData({
                orderInfo: t.Data,
                // businessInfo: s || [],
              
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
    previewImage: function(t) {
        var e = this.data.orderInfo.imgs, a = e[t.currentTarget.dataset.index];
        n.default.previewImage({
            urls: e,
            current: a
        });
    }
});