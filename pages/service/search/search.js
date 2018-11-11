function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var a = t(require("../../../utils/util.js")), e = t(require("../../../utils/request.js")), i = t(require("../../../utils/dg.js"));

Page({
    data: {
        option: [ "店铺", "服务" ],
        searchTip: !1,
        searchOption: "",
        searchOptionId: 1,
        latitude: 0,
        longitude: 0,
        hotServiceInfo: [],
        hotBusinessInfo: [],
        displaySearchInfo: [],
        isSearch: !1,
        haveSearchResult: !1
    },
    onLoad: function(t) {
        var e = this, s = i.default.getStorageSync("addressInfo");
        s ? this.setData({
            latitude: s.latitude,
            longitude: s.longitude
        }) : a.default.getLocation().then(function(t) {
            e.setData({
                latitude: t.latitude,
                longitude: t.longitude
            });
        }), this.getSearchDefaultInfo();
    },
    onShow: function() {
        var t = this.data.searchOptionId, a = this.data.option;
        this.setData({
            searchOption: a[t]
        });
    },
    onShareAppMessage: function() {
        return {
            title: "搜索您的服务",
            path: "/pages/service/search/search"
        };
    },
    changeOption: function(t) {
        var a = t.currentTarget.dataset.optionId, e = 0 == +a ? this.data.hotBusinessInfo : this.data.hotServiceInfo, i = this.data.option;
        this.data.isSearch && (e = []), this.setData({
            searchOption: i[a],
            displaySearchInfo: e,
            searchOptionId: a
        });
    },
    showOption: function() {
        var t = this.data.searchTip;
        this.setData({
            searchTip: !t
        });
    },
    NavigateTap: function(t) {
        var a = t.currentTarget.dataset.id, e = "/pages/business/businessIndex/businessIndex?id=" + a;
        1 == +this.data.searchOptionId && (e = "/pages/service/serviceDetail/serviceDetail?docId=" + a), 
        i.default.navigateTo({
            url: e
        });
    },
    inputFocus: function() {
        this.setData({
            searchTip: !1
        });
    },
    getSearchDefaultInfo: function() {
        var t = this, a = {
            latitude: this.data.latitude,
            longitude: this.data.longitude
        };
        e.default.post("getSearchDefaultInfo", a, function(a) {
            var e = 0 == +t.data.searchOptionId ? a.data.businessInfo : a.data.hotService;
            t.setData({
                hotServiceInfo: a.data.hotService,
                hotBusinessInfo: a.data.businessInfo,
                displaySearchInfo: e
            });
        });
    },
    submitSearch: function(t) {
        var a = this;
        if (e.default.pushFormId(t.detail.formId), this.setData({
            searchTip: !1
        }), !t.detail.value.content) return !1;
        var i = {
            content: t.detail.value.content,
            optionId: this.data.searchOptionId,
            latitude: this.data.latitude,
            longitude: this.data.longitude
        };
        e.default.post("getSearchResult", i, function(t) {
            var e = a.data.haveSearchResult;
            e = !Array.isArray(t.data) || 0 !== t.data.length, a.setData({
                isSearch: !0,
                displaySearchInfo: t.data,
                haveSearchResult: e
            });
        });
    }
});