function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

e(require("../../../utils/util.js"));

var a = e(require("../../../utils/request.js")), i = e(require("../../../utils/dg.js"));

Page({
    data: {
        id: 0,
        operationType: "",
        orderInfo: [],
        isSubmit: !1,
        refundType: 0
    },
    onLoad: function(e) {
        var a, i = e.id;
        this.setData((a = {
            id: i
        }, t(a, "id", i), t(a, "operationType", e.type), a)), this.getOrderInfo(i);
    },
    onShow: function() {},
    checked: function(e) {
        for (var t = e.currentTarget.dataset.index, a = this.data.cancel, i = 0; i < a.length; i++) a[i].choose_class = "";
        a[t].choose_class = "active", this.setData({
            cancel: a
        });
    },
    getOrderInfo: function(e) {
        var t = this;
        a.default.post("getOrderDetailInfo", {
            id: e
        }, function(e) {
            t.setData({
                orderInfo: e.data
            });
        });
    },
    onChanged: function(e) {
        this.setData({
            refundType: e.detail.value
        });
    },
    submitForm: function(e) {
        if (a.default.pushFormId(e.detail.formId), !this.data.isSubmit) {
            var t = this, r = e.detail.value.remark, n = {
                tradeNo: this.data.orderInfo.number,
                source: this.data.orderInfo.source,
                cancelType: this.data.operationType,
                refundType: this.data.refundType,
                remark: r,
                business: this.data.orderInfo.business
            };
            this.setData({
                isSubmit: !0
            }), a.default.post("cancelOrder", n, function(e) {
                i.default.showToast({
                    title: ""
                }), i.default.navigateTo({
                    url: "/pages/order/orderDetail/orderDetail?id=" + t.data.id
                });
            }, {
                complete: function(e) {
                    t.setData({
                        isSubmit: !1
                    });
                }
            });
        }
    }
});