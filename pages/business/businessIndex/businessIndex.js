function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

t(require("../../../utils/util.js"));

var e = t(require("../../../utils/request.js")), a = t(require("../../../utils/dg.js"));

Page({
    data: {
        businessId: 0,
        isShare: 1,
        businessInfo: {
            headimg: "/images/find/companyHeadImageCircular.png",
            companytitle: "加载中",
            rate: 5,
            order_count: 0,
            is_auth: 1,
            description: "加载中...",
            blameadress: "加载中...",
            businessImg: [],
            company: 3,
            businessphoto: "",
            businesshead: "http://xrs.duoguan.com/store_default_top_img.png",
            businessServer: []
        },
        navigationBar: [ {
            title: "服务",
            show: !1,
            active: "",
            hasSubmenu: !1,
            subscript: 0
        }, {
            title: "评价",
            show: !0,
            active: "active",
            hasSubmenu: !0,
            subscript: 1
        }, {
            title: "活动",
            show: !1,
            active: "",
            hasSubmenu: !1,
            subscript: 2
        }, {
            title: "商家",
            show: !0,
            active: "",
            hasSubmenu: !1,
            subscript: 3
        } ],
        commentTips: [ {
            title: "全部",
            subscript: 0,
            count: 0,
            active: "active"
        }, {
            title: "有图",
            subscript: 1,
            count: 0,
            active: ""
        }, {
            title: "好评",
            subscript: 2,
            count: 0,
            active: ""
        }, {
            title: "一般",
            subscript: 3,
            count: 0,
            active: ""
        }, {
            title: "差评",
            subscript: 4,
            count: 0,
            active: ""
        } ],
        currentCommentPage: 0,
        currentCommentSubscript: 0,
        commentList: [],
        hasMore: !0,
        isPreviewImage: !1,
        isloading: !1,
        rate: 0
    },
    onLoad: function(t) {
        var e = this.data.navigationBar;
        void 0 !== t.isshare && 0 == t.isshare ? (e[0].show = !0, e[0].active = "active", 
        e[1].active = "", t.isshare = 0) : t.isshare = 1, this.setData({
            businessId: t.bid || t.id,
            navigationBar: e,
            isShare: t.isshare
        }), this.getBusinessInfo();
    },
    onShow: function() {
        this.data.isPreviewImage ? this.setData({
            isPreviewImage: !1
        }) : this.onPullDownRefresh();
    },
    onPullDownRefresh: function() {
        this.setData({
            hasMore: !0,
            commentList: [],
            currentCommentPage: 0,
            isloading: !0
        }), this.getCommentList(), a.default.stopPullDownRefresh();
    },
    onReachBottom: function() {
        "active" == this.data.navigationBar[1].active && this.getCommentList();
    },
    changeNavigationBar: function(t) {
        for (var e = t.currentTarget.dataset.index, a = this.data.navigationBar, s = 0; s < a.length; s++) a[s].active = "";
        a[e].active = "active", this.setData({
            navigationBar: a
        });
    },
    onCatchTip: function(t) {
        for (var e = t.currentTarget.dataset.index, a = this.data.commentTips, s = 0; s < a.length; s++) a[s].active = s == e ? "active" : "";
        this.setData({
            currentCommentSubscript: e,
            commentTips: a,
            hasMore: !0,
            commentList: [],
            currentCommentPage: 0,
            isloading: !0
        }), this.getCommentList();
    },
    getBusinessInfo: function() {
        var t = this;
        e.default.post("getBusinessInfo", {
            businessId: this.data.businessId,
            getBusinessServer: 0 == this.data.isShare ? 1 : 0
        }, function(e) {
            var a = t.data.navigationBar;
            "1" == e.data.arbitrarily_uesr_can && (a[0].show = !0, a[0].active = "active", a[1].active = "");
            var s = parseFloat(e.data.rate);
            t.setData({
                navigationBar: a,
                businessInfo: e.data,
                rate: s
            });
        });
    },
    getCommentList: function() {
        var t = this;
        this.data.hasMore && e.default.post("getBusinessCommentInfo", {
            businessId: this.data.businessId,
            commentType: this.data.currentCommentSubscript,
            _p: this.data.currentCommentPage + 1
        }, function(e) {
            var a = t.data.commentTips;
            0 == t.data.currentCommentSubscript && t.data.currentCommentPage + 1 == 1 && (a[0].count = null == e.data.commentCount.countAllComment ? 0 : e.data.commentCount.countAllComment, 
            a[1].count = null == e.data.commentCount.countHasImageComment ? 0 : e.data.commentCount.countHasImageComment, 
            a[2].count = null == e.data.commentCount.countGoodComment ? 0 : e.data.commentCount.countGoodComment, 
            a[3].count = null == e.data.commentCount.countSimpleComment ? 0 : e.data.commentCount.countSimpleComment, 
            a[4].count = null == e.data.commentCount.countBadComment ? 0 : e.data.commentCount.countBadComment);
            var s = t.data.commentList.concat(e.data.commentList);
            t.setData({
                commentTips: a,
                commentList: s,
                currentCommentPage: t.data.currentCommentPage + 1,
                hasMore: e.data.commentList.length > 0,
                isloading: !1
            });
        });
    },
    onShareAppMessage: function() {
        return a.default.hideShareMenu(), {
            title: this.data.businessInfo.companytitle,
            path: "/pages/business/businessIndex/businessIndex?isshare=0&bid=" + this.data.businessId
        };
    },
    onPriviewImage: function(t) {
        var e = t.currentTarget.dataset.imagetype, s = t.currentTarget.dataset.index, n = [];
        n = 1 == e ? this.data.commentList[t.currentTarget.dataset.commentindex].image : 2 == e ? this.data.businessInfo.businessImg : 3 == e ? [ this.data.businessInfo.businessphoto ] : [ this.data.businessInfo.businesshead ], 
        this.setData({
            isPreviewImage: !0
        }), a.default.previewImage({
            current: n[s],
            urls: n
        });
    }
});