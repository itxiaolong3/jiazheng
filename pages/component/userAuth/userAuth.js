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
            
          t.userInfo ? (this.userInfo = t, console.log('能到这不'), wx.switchTab({
            url: '/pages/service/index/index'
          }),this.setData({
             
                isShow: !1
            }), e.default.fireEventListener("sys.user.info", this.userInfo)) : console.error("授权失败：", s);
        }
    }
});