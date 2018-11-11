
function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}
const app = getApp()
t(require("../../../utils/util.js"));

var e = t(require("../../../utils/request.js"));

t(require("../../../utils/dg.js"));

Component({
    properties: {},
    data: {
        noticeList: []
    },
    attached: function() {
      let t = this;
      app.http_get('Gethot', (ret) => {
        //console.log(ret);
        if (ret.status == 1) {
          t.setData({
            noticeList: ret.result
          })
        }
      })
        // e.default.get("getNoticeList", {
        //     _p: 1,
        //     num: 5
        // }, function(e) {
        //     t.setData({
        //         noticeList: e.data
        //     });
        // });
    },
    methods: {}
});