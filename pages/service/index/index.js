function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}
const app = getApp()
var e = t(require("../../../utils/util.js")), i = t(require("../../../utils/request.js")), s = t(require("../../../utils/dg.js"));

Page({
    data: {
        loading: !1,
        active: "",
        city: "定位中...",
        configInfo: [],
        navigate:[],
        businessInfo: [],
        businessPage: 1,
        businessHasMore: !0,
        orderList: []
    },
    onLoad: function(t) {
        //this.getConfig();
      this.getnavigate();
    },
    onShow: function() {
        //this.getLocation(),
         this.getOrderList();
    },
    onShareAppMessage: function() {
        return {
            title: "附近家政",
            path: "/pages/service/index/index"
        };
    },
    onPageScroll: function(t) {
        var e = "";
        t.scrollTop > 0 && (e = "active"), this.setData({
            active: e
        });
    },
    getLocation: function() {
        var t = this, i = s.default.getStorageSync("addressInfo") || {};
        "undefined" == i.latitude || "undefined" == i.longitude || void 0 == i.latitude || void 0 == i.longitude ? e.default.getLocation(!0).then(function(e) {
          t.code2Address(114.031856, 22.624491), t.setData({
            latitude: 114.031856,
            longitude: 22.624491
            });
        }) : (this.code2Address(114.031856,22.624491), this.setData({
            latitude: 114.031856,
            longitude: 22.624491
        }));
    },
    getConfig: function() {
        var t = this;
        i.default.get("getConfig", {}, function(e) {
            t.setData({
                configInfo: e.data,
                loading: !1
            });
        });
    },
    getAroundGoodBusiness: function() {
        var t = this;
        //114.031856,22.624491
        this.data.businessPage, this.data.businessInfo;
        i.default.post("getAroundGoodBusiness", {
            _p: 1,
          latitude: 114.031856,
          longitude: 22.624491
        }, function(e) {
            t.setData({
                businessInfo: e.data
            });
        });
    },
    // 我的函数
    getOrderList: function() {
      let t=this;
      app.http_get('Getad', (ret) => {
        if (ret.status == 1) {
          t.setData({
            configInfo: ret.result
          })
        }
      })
      
    },
    getnavigate:function(){
      let t = this;
      app.http_get('Gettype', (ret) => {
       /// console.log(ret);
        if (ret.status == 1) {
          t.setData({
            navigate: ret.result
          })
        }
      })
    },

    code2Address: function(t, e) {
        var a = this;
        i.default.post("code2Address", {
          latitude: 114.031856,
          longitude: 22.624491
        }, function(t) {
            a.setData({
                city: t.data.city
            }), s.default.setStorageSync("addressInfo", t.data), a.getAroundGoodBusiness();
        });
    }
});