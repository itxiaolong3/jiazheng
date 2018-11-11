function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

e(require("../../../utils/util.js"));

var t = e(require("../../../utils/request.js"));

e(require("../../../utils/dg.js"));

Page({
    data: {
        title: "",
        create_time: ""
    },
    onLoad: function(e) {},
    onShow: function() {
        var e = this;
        t.default.get("getNoticeNew", {}, function(t) {
            void 0 != t.data.title ? e.setData({
                title: t.data.title,
                create_time: t.data.create_time
            }) : e.setData({
                title: "",
                create_time: t.data.create_time
            });
        });
    },
    onShareAppMessage: function() {
        return {
            title: "附近家政",
            path: "/pages/message/messageIndex/messageIndex"
        };
    }
});