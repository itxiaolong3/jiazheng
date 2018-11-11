function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

e(require("../../../utils/util.js"));

var t = e(require("../../../utils/request.js")), i = e(require("../../../utils/dg.js"));

Page({
    data: {
        discoverInfo: {
            anonymous: "0",
            avatar: "https://www.ixiaochengxu.cc/temp_pic/people_fill.png",
            nick_name: "加载中",
            image: [],
            comment: "加载中",
            business_price: "0",
            star: 5,
            businessid: 0,
            companytitle: "加载中",
            rate: 100,
            order_count: 0,
            title: "加载中",
            headimg: "/images/find/companyHeadImageCircular.png"
        },
        currentImage: 1
    },
    onLoad: function(e) {
        this.getDsicoverInfo(e.orderid);
    },
    onChange: function(e) {
        var t = e.detail.current + 1;
        this.setData({
            currentImage: t
        });
    },
    getDsicoverInfo: function(e) {
        var i = this;
        t.default.post("getDiscoverInfo", {
            orderId: e
        }, function(e) {
            i.setData({
                discoverInfo: e.data
            });
        });
    },
    previewImage: function(e) {
        this.setData({
            isPreviewImage: !0
        });
        var t = this.data.discoverInfo.image, a = this.data.discoverInfo.image[e.currentTarget.dataset.index];
        i.default.previewImage({
            urls: t,
            current: a
        });
    },
    onShareAppMessage: function() {
        return {
            title: "干的漂亮-附近家政!",
            path: "/pages/discover/discoverIndex/discoverIndex"
        };
    }
});