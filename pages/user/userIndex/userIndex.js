function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

e(require("../../../utils/util.js"));

var t = e(require("../../../utils/request.js")), n = e(require("../../../utils/user-utils.js")), u = e(require("../../../utils/listener"));

const app = getApp()

Page({
    data: {
        userInfo: [],
        isShowAuth: !0,
        isShowTip: !1,
        count: []
    },
    onLoad: function(e) {
      console.log('执行onload');
    },
    onShow: function() {
        this.onPullDownRefresh();
      console.log('执行onShow');
    },
    
    onUnload: function() {
      console.log('执行onUnload');
    },
    onPullDownRefresh: function() {
        var e = this;
      e.getordercount();
      e.getuserinfo();
      
    },
    getuserinfo:function(){
      let t = this;
      app.http_get('Getuserinfo&openid='+wx.getStorageSync('openid'), (ret) => {
        wx.stopPullDownRefresh();
        console.log(ret);
        if (ret.code==1){
          
          t.setData({
            userInfo: ret.result,
            isShowAuth:!1
          })
        }else{
            console.log('没有用户授权');
        }
      })
    },
    getordercount:function(){
      let t = this;
      app.http_get('Getordercount&openid=' + wx.getStorageSync('openid'), (ret) => {
        console.log(ret);
        t.setData({
          count: ret.Data
        })
      })
    },
    waitsh:function(){
      wx.showToast({
        title: '等待审核中',
        image:'../../../images/user/weixiao.png'
      })
    },
    onHide:function(){
      console.log('执行onHide');
    }
    
});