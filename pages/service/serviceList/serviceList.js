function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}
const app = getApp()
e(require("../../../utils/util.js"));

var t = e(require("../../../utils/request.js"));

e(require("../../../utils/user-utils.js"));

Page({
    data: {
        serviceList: [],
        navigationList: [],
        showService: [],
        selectedId: 0,
        selectedIndex: 0
    },
    onLoad: function(e) {
        var t = e.id || 0;
        this.getServiceList(t);
    },
    onShareAppMessage: function() {
        return {
            title: "武穴家政服务列表",
            path: "/pages/service/serviceList/serviceList"
        };
    },
    selectNavigation: function(e) {
        var t = e.currentTarget.id;
        var i = this.data.serviceList[t].Datas,
         s = this.data.selectedIndex, 
         r = this.data.navigationList;
      console.log(i);
         r[s].color = "hui",
         r[t].color = "black",
         r[0].color = "red", 
          this.setData({
            selectedIndex: t,
           selectedId: this.data.serviceList[t].tid,
            showService: i,
            navigationList: r
        });
    },
    getServiceList: function(e) {
        var i = this;
      app.http_get('AllType', (t) => {
       // console.log(t.data);
            var s = t.data,
            r = [],
            a = [],
            c = {},
            o = 0, 
            n = 0;
            s.forEach(function(t,index) {
              console.log(e);
                c.id = t.tid,
                c.title = t.name,
                c.color = "hui",
                0 === o && (c.color = "red"),
                  e == t.tid && 0 != e ? (c.color = "black", a = t.Datas, n = o) : 0 == e && (a = s[0].Datas, n = o),
                r[o] = c,
                c = {},
                o++;
            }),
            
             i.setData({
                selectedId: e,
                selectedIndex: n,
                serviceList: s,
                navigationList: r,
                showService: a || r
            });
      })
    }
});