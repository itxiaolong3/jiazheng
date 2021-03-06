function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}
const app = getApp()
t(require("../../../utils/util.js"));

var a = t(require("../../../utils/request.js")), e = t(require("../../../utils/dg.js"));

Page({
    data: {
        addressId: 0,
        addressData: {},
        latitude: 0,
        longitude: 0,
        gender: 1,
        label: 1,
        is_default: !1
    },
    onLoad: function(t) {
        var a = t.id || 0;
        a && (this.getAddressInfo(a), e.default.setNavigationBarTitle({
            title: "编辑地址"
        }));
    },
    onShow: function() {},
    getAddressInfo: function(t) {
        var e = this;
        //getoneAdd
      app.http_get('getoneAdd&id=' + t, (ret) => {
        console.log(ret.Data);
        e.setData({
          addressId: t,
          addressData: ret.Data,
          gender: ret.Data.gender,
          label: ret.Data.label,
          is_default: ret.Data.is_default
        });
      })
    },
    submitForm: function(t) {
        var d = this;
      let fid = t.detail.formId;
      //保存formid用户发送模板消息
      let fdata = {
        openid: wx.getStorageSync('openid'),
        form_id: fid
      }
      app.http_post('AddFormId',
        fdata, (ret) => {
          console.log('地址中已保存formid');
        })
        var s = t.detail.value, i = {
            id: this.data.addressId,
            name: s.name,
            phone: s.mobile,
            gender: this.data.gender,
            label: this.data.label,
            address: this.data.addressData.address,
            detailadd: s.detail_info,
            latitude: this.data.addressData.latitude,
            longitude: this.data.addressData.longitude,
            openid: wx.getStorageSync('openid'),
            is_default: this.data.is_default ? 1 : 0
        };
        console.log(i);
      app.http_post('Saveadd',
        i, (ret) => {
          console.log(ret);
          wx.showToast({
            title: 0 == d.data.addressId ? "添加成功" : "编辑成功",
            mask: !0
          }), setTimeout(function () {
            e.default.navigateBack({});
          }, 1e3);
        })
        
    },
    chooseLocation: function() {
        var t = this, a = t.data.addressData;
        e.default.chooseLocation({
            success: function(e) {
              console.log(e);
                a.address = e.address, a.latitude = e.latitude, a.longitude = e.longitude, t.setData({
                    address: e.address,
                    latitude: e.latitude,
                    longitude: e.longitude,
                    addressData: a
                });
            }
        });
    },
    inputBlur: function(t) {
        var a = t.detail.value, e = t.currentTarget.id, d = this.data.addressData;
        d[e] = a, this.setData({
            addressData: d
        });
    },
    selectGenderLabel: function(t) {
        this.setData({
            gender: t.target.id
        });
    },
    selectAddressLabel: function(t) {
        this.setData({
            label: t.target.id
        });
    },
    setDefaultAddress: function(t) {
        this.setData({
            is_default: t.detail.value
        });
    }
});