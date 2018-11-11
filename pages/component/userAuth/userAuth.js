var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../utils/listener"));

Component({
    properties: {
        isShow: Boolean
    },
    data: {},
    methods: {
        onUserInfo: function(s) {
            var t = s.detail;
            t.userInfo ? (this.userInfo = t, this.setData({
                isShow: !1
            }), e.default.fireEventListener("sys.user.info", this.userInfo)) : console.error("授权失败：", s);
        }
    }
});