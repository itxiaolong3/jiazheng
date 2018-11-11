function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

t(require("../../../utils/util.js"));

var e = t(require("../../../utils/request.js")), a = t(require("../../../utils/dg.js"));

Page({
    data: {
        evaluateList: [],
        isShowImage: !1,
        currentPage: 0,
        hasMore: !0,
        isLoading: !1
    },
    onShow: function() {
        this.data.isShowImage ? this.setData({
            isShowImage: !1
        }) : this.onPullDownRefresh();
    },
    onPullDownRefresh: function() {
        this.setData({}), this.getSelfEvaluateList();
    },
    onReachBottom: function() {
        this.getSelfEvaluateList();
    },
    onShareAppMessage: function() {
        return {
            title: "我的评价",
            path: "/pages/message/myEvaluate/myEvaluate"
        };
    },
    getSelfEvaluateList: function() {
        var t = this;
        this.data.hasMore && e.default.post("getUserEvaluateList", {
            _p: this.data.currentPage + 1
        }, function(e) {
            var a = e.data.length > 0, s = t.data.evaluateList.concat(e.data);
            t.setData({
                isLoading: !1,
                evaluateList: s,
                hasMore: a,
                currentPage: t.data.currentPage + 1
            });
        });
    },
    previewImage: function(t) {
        this.setData({
            isPreviewImage: !0
        });
        var e = this.data.evaluateList[t.currentTarget.dataset.index].image, s = e[t.currentTarget.dataset.index2];
        a.default.previewImage({
            urls: e,
            current: s
        });
    },
    deleteEvaluate: function(t) {
        var s = this;
        a.default.confirm("您确定要删除这条评价吗?", function(i) {
            if (i.confirm) {
                var r = t.currentTarget.dataset.orderid;
                e.default.post("deleteUserEvaluate", {
                    orderId: r
                }, function(e) {
                    var i = s.data.evaluateList, r = t.currentTarget.dataset.index;
                    i.splice(r, 1), a.default.showToast({
                        content: "删除成功!"
                    }), s.setData({
                        evaluateList: i
                    });
                });
            }
        }, "温馨提示");
    }
});