function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

t(require("../../../utils/util.js"));

var e = t(require("../../../utils/request.js")), a = t(require("../../../utils/dg.js")), s = t(require("../../../utils/uploader"));

Page({
    uploader: null,
    data: {
        orderId: 0,
        businessInfo: [],
        full: 5,
        line: 0,
        anonymouse: !1,
        imgs: []
    },
    onLoad: function(t) {
        var e = this, a = t.id;
        this.uploader = new s.default(), this.uploader.onUploadChange = function() {
            e.setData({
                imgs: e.uploader.toArray()
            });
        }, this.getBusinessInfo(a);
    },
    getBusinessInfo: function(t) {
        var a = this;
        e.default.post("getBusinessInfoByOrderId", {
            id: t
        }, function(e) {
            a.setData({
                orderId: t,
                businessInfo: e.data
            });
        });
    },
    onAddStart: function(t) {
        var e = t.currentTarget.dataset.index, a = this.data.full, s = this.data.line;
        this.setData({
            full: a + (e + 1),
            line: s - (e + 1)
        });
    },
    onReduceStart: function(t) {
        var e = t.currentTarget.dataset.index + 1, a = 5 - e;
        this.setData({
            full: e,
            line: a
        });
    },
    onAnonymousComment: function() {
        this.setData({
            anonymouse: !this.data.anonymouse
        });
    },
    onRemoveImgTap: function(t) {
        var e = t.currentTarget.dataset.index;
        this.uploader.remove(e), this.setData({
            imgs: this.uploader.toArray()
        });
    },
    onPreviewTap: function(t) {
        var e = t.currentTarget.dataset.index, s = this.data.imgs.map(function(t) {
            return t.path;
        });
        a.default.previewImage({
            current: s[e],
            urls: s
        });
    },
    onAddImgTap: function() {
        var t = this, e = this.data.imgs;
        a.default.chooseImage({
            count: 6 - e.length,
            success: function(e) {
                e.tempFilePaths.forEach(function(e) {
                    return t.uploader.add(e, !1);
                }), t.uploader.upload(), t.setData({
                    imgs: t.uploader.toArray()
                });
            }
        });
    },
    onPushSubmit: function(t) {
        e.default.pushFormId(t.detail.formId);
        var s = this, i = this.uploader.getUploadedFiles(), n = new Array();
        n = i.join("##");
        var r = {
            businessid: this.data.businessInfo.id,
            orderid: this.data.orderId,
            star: this.data.full,
            comment: t.detail.value.comment,
            service_price: t.detail.value.servicePrice || 0,
            image: n,
            type: 1,
            anonymous: this.data.anonymouse ? 1 : 0
        };
        e.default.post("commentOrder", r, function(t) {
            a.default.showToast({
                title: "评价成功",
                icon: "success",
                mask: !0,
                duration: 1e3
            }), setTimeout(function() {
                a.default.navigateTo({
                    url: "/pages/order/orderDetail/orderDetail?id=" + s.data.orderId
                });
            }, 1e3);
        });
    }
});