function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}
const app=getApp();
var a = t(require("../../../utils/util.js")), e = t(require("../../../utils/request.js")), i = t(require("../../../utils/dg.js"));

Page({
    data: {
        option: [ "店铺", "服务" ],
        searchTip: !1,
        searchOption: "",
        searchOptionId: 0,
        latitude: 0,
        longitude: 0,
        hotServiceInfo: [],
        hotBusinessInfo: [],
        displaySearchInfo: [],
        isSearch: !1,
        haveSearchResult: !1
    },
    onLoad: function(t) {
    
    },
    onShow: function() {
        
    },
    onShareAppMessage: function() {
        return {
            title: "搜索服务",
            path: "/pages/service/search/search"
        };
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

    submitSearch: function(t) {
      wx.showLoading({
        title: '搜索中...',
      })
        var a = this;
      let fdata = {
        openid: wx.getStorageSync('openid'),
        form_id: t.detail.formId
      }
      app.http_post('AddFormId',
        fdata, (ret) => {
          console.log('已保存formid');
        })
        var i = {
            keyword: t.detail.value.content
        };
      app.http_post("getSearchResult", i, function(t) {
            var e = a.data.haveSearchResult;
            wx.hideLoading();
            e = !Array.isArray(t) || 0 !== t.length, a.setData({
                isSearch: !0,
                displaySearchInfo: t,
                haveSearchResult: e
            });
        });
    }
});