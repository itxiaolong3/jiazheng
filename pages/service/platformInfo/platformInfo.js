function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

e(require("../../../utils/util.js"));

var t = e(require("../../../utils/request.js")), a = (e(require("../../../utils/dg.js")), 
e(require("../../../wxParse/wxParse.js")));

Page({
    data: {
        info: ""
    },
    onLoad: function(e) {
        var r = this;
        t.default.get("getPlatformIntroduction", {}, function(e) {
            r.setData({
                info: e.data
            }), a.default.wxParse("content", "html", e.data, r);
        });
    },
    onShareAppMessage: function() {
        return {
            title: "附近家政平台介绍",
            path: "/pages/service/index/index"
        };
    }
});