function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("./dg")), r = e(require("./qqmap-wx-jssdk.min.js")), a = [ "YX2BZ-KIACS-NZRO4-6CXHO-EHZ3Z-OCB6U", "AGIBZ-ZVRK4-RFIUB-XLQ3X-UIXPF-K5FS7", "V7BBZ-WXT6J-PQMF4-FFQZB-NVDCH-LKFUY", "EWUBZ-BTZ33-GMW3I-3FYII-XIKM2-DXBAM", "YDUBZ-ZHGC5-D65I6-QKTDH-PBM6E-SGF2M" ];

exports.default = {
    callbacksTransformPromise: function(e, t) {
        var r = {
            success: (t = t || {}).success,
            fail: t.fail,
            complete: t.complete
        };
        return this.promiseSupportCallbacks(new Promise(function(r, a) {
            e(Object.assign(t, {
                success: r,
                fail: a,
                complete: void 0
            }));
        }), r);
    },
    promiseSupportCallbacks: function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        return t.isPromiseSupportCallbacks ? e : (t.isPromiseSupportCallbacks = !0, (t.success || t.fail) && (e = e.then(t.success, t.fail)), 
        t.complete && (e = e.finally(t.complete)), e);
    },
    formatNumber: function(e) {
        return (e = e.toString())[1] ? e : "0" + e;
    },
    formatSmartNumber: function(e) {
        var t = [ "万", "亿", "兆" ], r = "";
        if (e >= 1e4) for (var a = 0; a < t.length && (r = t[a], !((e /= 1e4) < 1e4)); a++) ;
        return this.formatFloat(e) + r;
    },
    formatDistance: function(e) {
        var t = [ "m", "km" ], r = t[0], a = 1;
        if (e >= 1e4) do {
            r = t[a], e /= 1e3, a++;
        } while (e > 1e3 && t.length > a);
        return this.formatFloat(e) + r;
    },
    formatDatetime: function(e, t) {
        var r = {
            "M+": (e = e instanceof Date ? e : new Date(e)).getMonth() + 1,
            "d+": e.getDate(),
            "h+": e.getHours(),
            "m+": e.getMinutes(),
            "s+": e.getSeconds(),
            "q+": Math.floor((e.getMonth() + 3) / 3),
            S: e.getMilliseconds()
        };
        /(y+)/.test(t) && (t = t.replace(RegExp.$1, (e.getFullYear() + "").substr(4 - RegExp.$1.length)));
        for (var a in r) new RegExp("(" + a + ")").test(t) && (t = t.replace(RegExp.$1, 1 === RegExp.$1.length ? r[a] : ("00" + r[a]).substr(("" + r[a]).length)));
        return t;
    },
    formatSmartTime: function(e) {
        e = e instanceof Date ? e.getTime() : e;
        var t = new Date().getTime() - e + 2e4, r = new Date().setHours(0, 0, 0), a = r - 864e5, o = r + 864e5, i = a - 864e5, n = o + 864e5;
        if (t < 0) {
            if ((t = Math.abs(t)) < 6e4) return "一会儿";
            if (t >= 6e4 && t < 36e5) return Math.floor(t / 6e4) + "分钟后";
            if (e < o) return "今天" + this.formatDatetime(e, "hh:mm");
            if (e < n) return "明天" + this.formatDatetime(e, "hh:mm");
            if (e < n + 864e5) return "后天" + this.formatDatetime(e, "hh:mm");
        } else {
            if (t < 6e4) return "刚刚";
            if (t >= 6e4 && t < 36e5) return Math.floor(t / 6e4) + "分钟前";
            if (e > r) return "今天" + this.formatDatetime(e, "hh:mm");
            if (e > a) return "昨天" + this.formatDatetime(e, "hh:mm");
            if (e > i) return "前天" + this.formatDatetime(e, "hh:mm");
        }
        var s = new Date();
        s.setMonth(0, 0), s.setHours(0, 0, 0, 0);
        var c = new Date(e);
        return c.setMonth(0, 0), c.setHours(0, 0, 0, 0), s.getTime() === c.getTime() ? this.formatDatetime(e, "M月d日 hh:mm") : this.formatDatetime(e, "yyyy年M月d日 hh:mm");
    },
    formatFloat: function(e, t) {
        t = t || 2, "string" != typeof e && (e += "");
        var r = e.lastIndexOf(".");
        return -1 !== r ? e.substring(0, r + t + 1) : e;
    },
    getMapSdk: function() {
        var e = "";
        if (2 === Math.floor(3 * Math.random())) {
            2 === Math.floor(3 * Math.random()) && (a = a.shuffle());
            var t = Math.floor(Math.random() * (a.length - 1));
            e = a[t];
        } else e = "2X5BZ-MNHKP-UC2D5-VJQZM-7NNXV-VIB6G";
        return new r.default({
            key: e
        });
    },
    webView: function(e, r) {
        e = encodeURIComponent(e || "");
        var a = "/pages/user/web-view/index?title=" + (r = r || "网页") + "&url=" + e;
        t.default.navigateTo({
            url: a
        });
    },
    buildShareUrl: function(e) {
        return e = encodeURIComponent(e), "/" + getCurrentPages()[0].route + "?_path=" + e;
    },
    open: function(e) {
        var t = e.url, r = e.type;
        if ("redirect" === r) wx.redirectTo({
            url: t
        }); else if ("switchTab" === r) wx.switchTab({
            url: t
        }); else if ("back" === r) {
            var a = e.delta || 1;
            wx.navigateBack({
                url: t,
                delta: a
            });
        } else "reLaunch" === r ? wx.reLaunch({
            url: t
        }) : "home" === r ? wx.navigateBack({
            url: t,
            delta: getCurrentPages().length - 1
        }) : "webview" === r ? this.webView(e.webUrl) : wx.navigateTo({
            url: t
        });
    },
    calculateDistance: function(e, t, r, a) {
        var o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 2, i = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 2, n = 3.1415926, s = t * n / 180, c = a * n / 180, u = s - c, l = e * n / 180 - r * n / 180, f = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(u / 2), 2) + Math.cos(s) * Math.cos(c) * Math.pow(Math.sin(l / 2), 2)));
        return f = 6370.996 * f * 1e3, 2 == o && (f /= 1e3), Math.round(f, i);
    },
    code2status: function(e) {
        var t = this;
        return e.forEach(function(e) {
            t.transformCode(e);
        }), e;
    },
    transformCode: function(e) {
        switch (e.code) {
          case "noPay":
            e.tip = "待支付", e.color = "red";
            break;

          case "closePay":
            e.tip = "交易关闭", e.color = "hui";
            break;

          case "timeOut":
            e.tip = "订单超时关闭", e.color = "hui";
            break;

          case "waitAccept":
          case "waitOther":
            e.tip = "匹配中", e.color = "green";
            break;

          case "waitOffer":
            e.tip = "议价中", e.color = "bright-red";
            break;

          case "waitService":
            e.tip = "服务中", e.color = "sky-blue";
            break;

          case "complete":
            e.tip = "已完成", e.color = "hui";
            break;

          case "waitComment":
            e.tip = "待评价", e.color = "red";
            break;

          case "noHandle":
            e.tip = "投诉处理中", e.color = "red";
            break;

          case "handle":
            e.tip = "投诉已处理", e.color = "hui";
            break;

          case "dealRefund":
            e.tip = "退款处理中", e.color = "red";
            break;

          case "failRefund":
            e.tip = "退款失败", e.color = "red";
            break;

          case "isRefund":
            e.tip = "已退款", e.color = "hui";
            break;

          default:
            e.tip = "", e.color = "";
        }
        return e;
    },
    code2navStatus: function(e) {
        return "noPay" === e ? 1 : "waitAccept" === e || "waitOther" === e ? 2 : "waitOffer" === e ? 3 : "waitService" === e ? 4 : "waitComment" === e ? 5 : -1;
    }
};