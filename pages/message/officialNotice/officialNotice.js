function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

t(require("../../../utils/util.js"));

var e = t(require("../../../utils/request.js")), i = t(require("../../../utils/dg.js"));

Page({
    data: {
        noticeList: [],
        currentPage: 0,
        hasMore: !0,
        noData: !1,
        isLoading: !1
    },
    onShow: function() {
        this.onPullDownRefresh();
    },
    onPullDownRefresh: function() {
        this.setData({
            noticeList: [],
            currentPage: 0,
            hasMore: !0,
            isLoading: !0
        }), this.getNoticeList(), i.default.stopPullDownRefresh();
    },
    onReachBottom: function() {
        this.getNoticeList();
    },
    onShareAppMessage: function() {
        return {
            title: "附近家政通知中心",
            path: "/pages/message/officialNotice/officialNotice"
        };
    },
    getNoticeList: function() {
        var t = this;
        this.data.hasMore && e.default.get("getNoticeList", {
            _p: this.data.currentPage + 1
        }, function(e) {
            var i = e.data.length > 0, a = t.data.noticeList.concat(e.data);
            t.setData({
                isLoading: !1,
                noticeList: a,
                hasMore: i,
                currentPage: t.data.currentPage + 1
            });
        });
    }
});