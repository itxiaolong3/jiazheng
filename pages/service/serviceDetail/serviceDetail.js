function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}
const app = getApp()
e(require("../../../utils/util.js"));

var a = e(require("../../../utils/request.js")), t = e(require("../../../utils/dg.js")), s = e(require("../../../utils/listener.js"));

Page({
    data: {
        isShare: 0,
        businessId: 0,
        addressId: 0,
        docId: 0,
        latitude: "",
        longitude: "",
        isBind: !0,
        docInfo: [],
        addressInfo: [],
        aroundBusinessNum: 0,
        reserveDate: [],
        time: [],
        nowTime: "",
        canSubmit: !1,
        prevent: !1
    },
    onLoad: function(e) {
        
       
    },
    onShow: function() {
        var e = this, t = this;
        // s.default.addEventListener("selectAddress", function(e) {
        //     var s = {
        //         docId: t.data.docId,
        //         addressId: e
        //     };
        //     a.default.post("selectAddress", s, function(a) {
        //         t.setData({
        //             addressId: e,
        //             addressInfo: a.data.addressInfo || [],
        //             aroundBusinessNum: a.data.aroundBusinessNum,
        //             canSubmit: !(!a.data.addressInfo.id || !a.data.aroundBusinessNum)
        //         });
        //     });
        // }),
        
        //  a.default.get("checkBind", {}, function(a) {
        //     e.setData({
        //         isBind: a.data
        //     });
        // });
    },
    onUnload: function() {
        s.default.removeEventListener("selectAddress");
    },
   
    submitForm: function(e) {
        var t = this;
        if (a.default.pushFormId(e.detail.formId), !this.data.prevent) {
            this.setData({
                prevent: !0
            });
            var s = new Date(), d = {
                doc_id: this.data.docId,
                business: this.data.businessId,
            
                selectAddress: this.data.addressId,
                num: 1,
                true_name: this.data.addressInfo.name,
                mobile: this.data.addressInfo.mobile,
                address: this.data.addressInfo.address + this.data.addressInfo.detail_info,
                remark: e.detail.value.remark
            };
            a.default.post("submitOrder", d, function(e) {
                0 == e.data.status ? t.WeChatPay(e.data.number) : t.navigateTap();
            });
        }
    },
    navigateTap: function() {
        t.default.navigateTo({
            url: "/pages/order/orderList/orderList"
        });
    }
});