function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}
const app = getApp()
t(require("../../../utils/util.js"));

var e = t(require("../../../utils/request.js")), a = (t(require("../../../utils/dg.js")), 
t(require("../../../wxParse/wxParse.js")));

Page({
    data: {
        noticeId: 0
    },
    onLoad: function(t) {
        var i = this;
        this.setData({
            noticeId: t.id
        }), 
          app.http_post('Getonehot', 
          {id: this.data.noticeId}, (ret) => {
            //console.log(ret);
            if (ret.status == 1) {
              i.setData({
                noticeInfo: ret.result
              }), a.default.wxParse("content", "html", ret.result.contents, i);
            }
          })
        // e.default.post("getNoticeInfoById", {
        //     id: this.data.noticeId
        // }, function(t) {
        //     i.setData({
        //         noticeInfo: t.data
        //     }), a.default.wxParse("content", "html", t.data.content, i);
        // });
    },
    onShareAppMessage: function() {
        return {
            title: this.data.title,
            path: "/pages/message/noticeDetail/noticeDetail"
        };
    }
});