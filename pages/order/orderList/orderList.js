function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var a = t(require("../../../utils/util.js")), e = t(require("../../../utils/request.js"));

t(require("../../../utils/dg.js"));

Page({
    data: {
        active: 0,
        page: 1,
        hasMore: !0,
        orderList: [],
        noData: !1
    },
    onLoad: function(t) {
        var a = t.id || 0;
        this.setData({
            active: a
        });
    },
    onShow: function() {
        this.onPullDownRefresh();
    },
    onPullDownRefresh: function() {
        var t = this, i = this.data.active || 0, s = {
            active: i,
            _p: 1
        };
        e.default.post("getOrderListByActive", s, function(e) {
            var s = a.default.code2status(e.data);
            t.setData({
                active: i,
                orderList: s
            });
        });
    },
    onReachBottom: function() {
        if (this.data.hasMore) {
            var t = ++this.data.page, a = this.data.active;
            this.setData({
                page: t
            }), this.getOrderList(a, t);
        }
    },
    changeMenu: function(t) {
        this.setData({
            orderList: [],
            active: t.target.id,
            page: 1,
            noData: !1,
            hasMore: !0
        }), this.getOrderList(t.target.id, 1);
    },
    getOrderList: function(t, i) {
        var s = this, r = {
            active: t,
            _p: i
        }, o = this.data.noData;
        e.default.post("getOrderListByActive", r, function(t) {
            if (Array.isArray(t.data) && 0 === t.data.length) 1 == i && (o = !0), s.setData({
                hasMore: !1,
                noData: o
            }); else {
                var e = a.default.code2status(t.data);
                s.setData({
                    orderList: s.data.orderList.concat(e)
                });
            }
        });
    }
});