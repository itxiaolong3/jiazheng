Component({
    properties: {
        showBindTip: Boolean,
        showClose: Boolean
    },
    data: {},
    methods: {
        linkToTap: function() {
            wx.navigateTo({
                url: "/pages/user/bindTel/bindTel"
            });
        },
        hiddenTip: function() {
            this.setData({
                showBindTip: !1
            });
        }
    }
});