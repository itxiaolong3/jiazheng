function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

t(require("../../../utils/util.js"));
const app=getApp()
var e = t(require("../../../utils/request.js")), a = t(require("../../../utils/dg.js")), s = t(require("../../../utils/listener.js"));

Page({
    data: {
        noData: !1,
        page: 1,
        addressInfo: [],
        hasMore: !0,
        isSelect: 0,
        id:''
    },
    onLoad: function(t) {
      console.log(t);
        this.setData({
            isSelect: t.isSelect || 0,
            id:t.id
        });
    },
    onShow: function() {
        this.onPullDownRefresh();
    },
    onPullDownRefresh: function() {
      //MyAddress
        var t = this;
      app.http_get('MyAddress&openid='+wx.getStorageSync('openid'), (ret) => {
       console.log(ret.Data);
        Array.isArray(ret.Data) && 0 === ret.Data.length ? t.setData({
          noData: !0,
          addressInfo: []
        }) : t.setData({
          noData: !1,
          addressInfo: ret.Data
        });
      })
    },
    onReachBottom: function() {
        var t = this;
        this.data.hasMore && e.default.get("getAddressList", {
            _p: this.data.page + 1
        }, function(e) {
            var a = t.data.addressInfo;
            Array.isArray(e.data) && 0 === e.data.length ? t.setData({
                hasMore: !1
            }) : t.setData({
                page: t.data.page + 1,
                addressInfo: a.concat(e.data)
            });
        });
    },
    deleteAddress: function(t) {
      var a = this;//DelAdd
        wx.showModal({
            title: "操作提示",
            content: "您确定要删除改地址吗？",
            success: function(s) {
                if (!0 !== s.cancel) {
                    var n = t.currentTarget.id;
                  app.http_get("DelAdd&id="+n,(ret) =>{
                      wx.showToast({
                        title: "删除成功",
                        mask: !0
                      }), setTimeout(function () {
                        a.onPullDownRefresh();
                      }, 1e3);
                    })
                   
                }
            }
        });
    },
    backPage: function(t) {
        var e = this.data.isSelect, n = t.currentTarget.id;
        //console.log(n);
      app.data.typeid = this.data.id;
      app.data.addid=n;
      console.log('保存到全局的数据addid'+app.data.addid);
      console.log('保存到全局的数据typeid' + app.data.typeid);
      wx.navigateBack({
        delta:1
      })
        // wx.redirectTo({
        //   url: '/pages/service/serviceDetail/serviceDetail?n=' + n +'&docId='+this.data.id,
        // })
    }
});