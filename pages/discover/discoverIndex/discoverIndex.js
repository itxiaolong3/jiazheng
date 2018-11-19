function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}
const app=getApp()
var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, i = t(require("../../../utils/util.js")), a = t(require("../../../utils/request.js")), o = t(require("../../../utils/dg.js"));

Page({
    data: {
        categoryList: [ {
            id: 0,
            title: "全部",
            maindoc_id: 0,
            checked: !0
        } ],
        discoverList: [],
        currentCategory: 0,
        currentPage: 0,
        latitude: 0,
        longitude: 0,
        hasMore: !0,
        isPreviewImage: !1,
        isLoading: !1
    },
    onLoad: function(t) {
       // this.getLocation(),
      
    },
    onShow: function() {
      this.getCategoryList();
        this.data.isPreviewImage ? this.setData({
            isPreviewImage: !1
        }) : this.onPullDownRefresh();
    },
    onPullDownRefresh: function() {
        this.setData({
            discoverList: [],
            currentPage: 0,
            hasMore: !0,
            isLoading: !0
        }), this.getDiscoverList(), o.default.stopPullDownRefresh();
    },
    onReachBottom: function() {
        this.getDiscoverList();
    },
    
    getCategoryList: function() {
      //获取导航分类
        var t = this;
      app.http_get("GetTCtype", (e)=> {
       // console.log(e);
            t.setData({
              categoryList: t.data.categoryList.concat(e.result)
            });
        });
    },
    changeCheckCategory: function(t) {
        for (var e = t.currentTarget.dataset.index, i = this.data.categoryList, a = 0; a < i.length; a++) i[a].checked = !1;
        i[e].checked = !0, this.setData({
            categoryList: i,
            currentCategory: e,
            discoverList: [],
            currentPage: 0,
            hasMore: !0,
            isLoading: !0
        }), this.getDiscoverList();
    },
    getDiscoverList: function() {
        var t = this;
      
      let id = this.data.categoryList[this.data.currentCategory].tid ? this.data.categoryList[this.data.currentCategory].tid:0
      this.data.hasMore && app.http_post("Getonetype", {
        mainDocId: id,
            _p: this.data.currentPage + 1
        }, (e)=> {
          console.log(e);
          var i = e.Data.length > 0, a = t.data.discoverList.concat(e.Data);
            t.setData({
                isLoading: !1,
                discoverList: a,
                hasMore: i,
                currentPage: t.data.currentPage + 1
            });
        });
    },
    previewImage: function(t) {
        this.setData({
            isPreviewImage: !0
        });
        var e = this.data.discoverList[t.currentTarget.dataset.index].image, i = e[t.currentTarget.dataset.index2];
        o.default.previewImage({
            urls: e,
            current: i
        });
    },
    onShareAppMessage: function() {
        return {
            title: "发现更多新生活-附近家政!",
            path: "/pages/discover/discoverIndex/discoverIndex"
        };
    }
});