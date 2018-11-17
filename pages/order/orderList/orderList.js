function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}
const app = getApp()
var a = t(require("../../../utils/util.js")), e = t(require("../../../utils/request.js"));

t(require("../../../utils/dg.js"));

Page({
    data: {
        active: 0,
        page: 1,
        hasMore: !0,
        orderList: [],
        noData: !1
    },
    onLoad: function(t) {
        var a = t.id || 0;
        this.setData({
            active: a
        });
    },
    onShow: function() {
        this.onPullDownRefresh();
    },
    onPullDownRefresh: function() {
      let openid=wx.getStorageSync('openid');
      var t = this, i = this.data.active || 0, s = {
        active: i,
        openid:openid,
        page:1
      };
      app.http_post('UserOrder', s, (ret) => {
        wx.stopPullDownRefresh();
        //console.log(ret.Data);
        t.setData({
          active: i,
          orderList: ret.Data,
          page:1,
          hasMore: !0,
        });
      }) 
    },
    onReachBottom: function() {
        if (this.data.hasMore) {
            var t = ++this.data.page, a = this.data.active;
            
            this.setData({
                page: t
            }),
             wx.showLoading({
               title: '加载中...',
             }) 
             this.getOrderList(a, wx.getStorageSync('openid'), t);
        }
    },
    changeMenu: function(t) {
        this.setData({
            orderList: [],
            active: t.target.id,
            page: 1,
            noData: !1,
            hasMore: !0
        }), this.getOrderList(t.target.id,wx.getStorageSync('openid'), 1);
    },
    getOrderList: function(t, openid,i) {
      var s = this, r = {
        active: t,
        openid: openid,
        page:i
      }, o = this.data.noData; console.log('页码数' + i);
      app.http_post('UserOrder', r, (t) => {
        console.log(t);
        wx.hideLoading();
        if (Array.isArray(t.Data) && 0 === t.Data.length) 1 == i && (o = !0),
         s.setData({
          hasMore: !1,
          noData: o
        }),
          wx.showToast({
            title: '无更多数据',
          image:'../../../images/user/weixiao.png'
          }),
        setTimeout(function(){
            wx.hideToast();
        },500);
        else {
          s.setData({
            orderList: s.data.orderList.concat(t.Data)
          });
        }
      })
      
    }
});