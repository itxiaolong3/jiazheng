Page({
    openSetting: function(t) {
        var e = t.currentTarget.dataset.name;
        "wechat_setting" == e ? wx.openSetting({}) : "wechat_clear" == e && (wx.showToast({
            title: "正在清理中...",
            icon: "loading",
            duration: 10
        }), wx.clearStorageSync(), wx.showToast({
            title: "清理完成",
            icon: "success",
            duration: 1500
        }));
    }
});