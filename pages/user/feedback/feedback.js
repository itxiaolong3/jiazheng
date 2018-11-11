function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

e(require("../../../utils/listener"));

var t = e(require("../../../utils/request.js")), u = e(require("../../../utils/dg.js"));

Page({
    data: {},
    submitForm: function(e) {
        t.default.pushFormId(e.detail.formId);
        var s = {
            remark: e.detail.value.remark,
            mobile: e.detail.value.mobile
        };
        t.default.post("addSuggest", s, function(e) {
            wx.showToast({
                title: e.data,
                icon: "success",
                mask: !0
            }), setTimeout(function() {
                u.default.switchTab({
                    url: "/pages/user/userIndex/userIndex"
                });
            }, 1e3);
        });
    }
});