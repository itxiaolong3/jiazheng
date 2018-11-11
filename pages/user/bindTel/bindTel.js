function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

t(require("../../../utils/util.js"));

var e = t(require("../../../utils/request.js")), i = t(require("../../../utils/dg.js"));

Page({
    data: {
        change: 1,
        userProtocol: !0,
        telActive: !1,
        codeActive: !1,
        codeText: "获取验证码",
        waitTime: 60
    },
    onLoad: function(t) {
        var i = this;
        e.default.get("isBindPhone", {}, function(t) {
            i.setData({
                change: t.data
            });
        });
    },
    agreeProtocol: function() {
        this.setData({
            userProtocol: !this.data.userProtocol
        });
    },
    onFocus: function(t) {
        var e = t.currentTarget.id, i = this.data.telActive, a = this.data.telActive;
        0 == e ? (i = !0, a = !1) : (i = !1, a = !0), this.setData({
            telActive: i,
            codeActive: a
        });
    },
    onBlur: function(t) {
        this.setData({
            telActive: !1,
            codeActive: !1
        });
    },
    getCode: function(t) {
        var i = this, a = {
            phone: this.data.phone,
            type: 2
        };
        e.default.post("getCode", a, function(t) {
            wx.showToast({
                title: "发送成功",
                icon: "success",
                mask: !0
            }), i.sendAgainTime();
        });
    },
    sendAgainTime: function() {
        var t = this, e = this.data.waitTime--;
        e > 0 ? (this.setData({
            codeText: e + "s后重发"
        }), setTimeout(function() {
            t.sendAgainTime();
        }, 1e3)) : this.setData({
            codeText: "获取验证码",
            waitTime: 60
        });
    },
    getTel: function(t) {
        var e = t.detail.value;
        this.setData({
            phone: e
        });
    },
    submitForm: function(t) {
        if (e.default.pushFormId(t.detail.formId), !this.data.userProtocol) return wx.showToast({
            title: "未同意用户手册",
            icon: "none",
            mask: !0
        }), !1;
        var a = {
            phone: t.detail.value.phone,
            code: t.detail.value.code,
            type: 2
        };
        e.default.post("bindPhone", a, function(t) {
            wx.showToast({
                title: "绑定成功",
                icon: "success",
                mask: !0
            }), setTimeout(function() {
                i.default.navigateBack();
            }, 1e3);
        });
    }
});