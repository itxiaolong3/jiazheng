function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

e(require("../../../utils/listener"));

var t = e(require("../../../utils/request.js")), a = e(require("../../../utils/dg.js"));

Page({
    data: {
        codeText: "获取验证码",
        phone: "",
        waitTime: 60
    },
    onShareAppMessage: function() {
        return {
            title: "附近家政申请商家入驻",
            path: "/pages/user/cooperation/cooperation"
        };
    },
    getTel: function(e) {
        var t = e.detail.value;
        this.setData({
            phone: t
        });
    },
    getCode: function(e) {
        var a = this, i = {
            phone: this.data.phone,
            type: 1
        };
        t.default.post("getCode", i, function(e) {
            wx.showToast({
                title: "发送成功",
                icon: "success",
                mask: !0
            }), a.sendAgainTime();
        });
    },
    sendAgainTime: function() {
        var e = this, t = this.data.waitTime--;
        t > 0 ? (this.setData({
            codeText: t + "s后重发"
        }), setTimeout(function() {
            e.sendAgainTime();
        }, 1e3)) : this.setData({
            codeText: "获取验证码",
            waitTime: 60
        });
    },
    formSubmit: function(e) {
        t.default.pushFormId(e.detail.formId);
        var i = {
            name: e.detail.value.name,
            tel: this.data.phone,
            code: e.detail.value.code,
            type: 1
        };
        t.default.post("addCooperation", i, function(e) {
            a.default.showToast({
                title: e.data,
                icon: "success",
                mask: !0
            }), setTimeout(function() {
                a.default.switchTab({
                    url: "/pages/user/userIndex/userIndex"
                });
            }, 1e3);
        });
    }
});