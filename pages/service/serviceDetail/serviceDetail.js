function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

e(require("../../../utils/util.js"));

var a = e(require("../../../utils/request.js")), t = e(require("../../../utils/dg.js")), s = e(require("../../../utils/listener.js"));

Page({
    data: {
        isShare: 0,
        businessId: 0,
        addressId: 0,
        docId: 0,
        latitude: "",
        longitude: "",
        isBind: !0,
        docInfo: [],
        addressInfo: [],
        aroundBusinessNum: 0,
        reserveDate: [],
        time: [],
        nowTime: "",
        canSubmit: !1,
        prevent: !1
    },
    onLoad: function(e) {
        var s = this, d = e.docId, i = e.businessId || 0, n = e.isShare || 0, r = t.default.getStorageSync("addressInfo");
        this.setData({
            docId: d,
            isShare: n,
            businessId: i,
            latitude: r.latitude,
            longitude: r.longitude
        });
        var u = {
            docId: d,
            businessId: i,
            latitude: r.latitude,
            longitude: r.longitude
        };
        a.default.post("getSubmitOrderConfig", u, function(e) {
            var a = e.data.time, t = new Array(), d = new Array(), i = new Array();
            a.forEach(function(e) {
                d.push(e.date + " (" + e.week + ") ");
                var a = [], t = e.time;
                for (var s in t) a.push(t[s]);
                i.push(a);
            }), t[0] = d, t[1] = i[0], s.setData({
                reserveDate: t,
                time: i,
                nowTime: d[0] + i[0][0],
                isBind: e.data.isBind,
                docInfo: e.data.docInfo,
                addressId: e.data.addressInfo.id || 0,
                addressInfo: e.data.addressInfo || [],
                businessInfo: e.data.businessInfo || [],
                aroundBusinessNum: e.data.aroundBusinessNum,
                canSubmit: !(!e.data.addressInfo.id || !e.data.aroundBusinessNum)
            });
        });
    },
    onShow: function() {
        var e = this, t = this;
        s.default.addEventListener("selectAddress", function(e) {
            var s = {
                docId: t.data.docId,
                addressId: e
            };
            a.default.post("selectAddress", s, function(a) {
                t.setData({
                    addressId: e,
                    addressInfo: a.data.addressInfo || [],
                    aroundBusinessNum: a.data.aroundBusinessNum,
                    canSubmit: !(!a.data.addressInfo.id || !a.data.aroundBusinessNum)
                });
            });
        }), a.default.get("checkBind", {}, function(a) {
            e.setData({
                isBind: a.data
            });
        });
    },
    onUnload: function() {
        s.default.removeEventListener("selectAddress");
    },
    changeTimeColumnPicker: function(e) {
        var a = e.detail.column, t = e.detail.value, s = this.data.reserveDate, d = this.data.time;
        0 === a && (s[1] = d[t], this.setData({
            reserveDate: s
        }));
    },
    changeTimePicker: function(e) {
        var a = e.detail.value, t = a[0], s = a[1], d = this.data.reserveDate[0], i = this.data.time;
        i = 0 === a[0] ? i[0] : i[1], this.setData({
            nowTime: d[t] + i[s]
        });
    },
    submitForm: function(e) {
        var t = this;
        if (a.default.pushFormId(e.detail.formId), !this.data.prevent) {
            this.setData({
                prevent: !0
            });
            var s = new Date(), d = {
                doc_id: this.data.docId,
                business: this.data.businessId,
                reseve_time: s.getFullYear() + "年" + this.data.nowTime,
                selectAddress: this.data.addressId,
                num: 1,
                true_name: this.data.addressInfo.name,
                mobile: this.data.addressInfo.mobile,
                address: this.data.addressInfo.address + this.data.addressInfo.detail_info,
                remark: e.detail.value.remark
            };
            a.default.post("submitOrder", d, function(e) {
                0 == e.data.status ? t.WeChatPay(e.data.number) : t.navigateTap();
            });
        }
    },
    WeChatPay: function(e) {
        var s = this, d = this;
        a.default.post("WeChatPay", {
            trade_no: e
        }, function(e) {
            e.data ? wx.requestPayment(Object.assign(e.data, {
                success: function(e) {
                    t.default.showToast({
                        title: "支付成功",
                        icon: "success",
                        mask: !0,
                        duration: 1e3
                    });
                },
                fail: function(e) {
                    t.default.showToast({
                        title: "支付失败",
                        icon: "none",
                        mask: !0,
                        duration: 1e3
                    });
                },
                complete: function(e) {
                    s.setData({
                        prevent: !1
                    }), setTimeout(function() {
                        d.navigateTap();
                    }, 1e3);
                }
            })) : d.navigateTap();
        });
    },
    navigateTap: function() {
        t.default.navigateTo({
            url: "/pages/order/orderList/orderList"
        });
    }
});