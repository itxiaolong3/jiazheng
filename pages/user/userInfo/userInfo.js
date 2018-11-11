function n(n) {
    return n && n.__esModule ? n : {
        default: n
    };
}

n(require("../../../utils/util.js")), n(require("../../../utils/request.js"));

Page({
    data: {
        array: [ "男", "女" ],
        objectArray: [ {
            id: 0,
            name: "男"
        }, {
            id: 1,
            name: "女"
        } ],
        index: 0,
        region: [ "河南", "郑州", "金水区" ],
        customItem: "全部"
    },
    bindPickerChange: function(n) {
        this.setData({
            index: n.detail.value
        });
    },
    bindRegionChange: function(n) {
        this.setData({
            region: n.detail.value
        });
    },
    onNavigateTap: function(n) {
        wx.navigateTo({
            url: n.currentTarget.dataset.url
        });
    },
    onLoad: function(n) {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});