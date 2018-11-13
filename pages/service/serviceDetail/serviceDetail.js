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
      prevent: !1,//我的参数开始
      infoarr: [],
      allinfo:[],
      price: 0,
      grage: '',
      uploadimgurl: '',//图片上传
      uploaded_pic_list: [],
      publisherarticle: [],
      serverimglist: [],//保存服务器返回的地址
      postimgurl: '',//当需要提交的时候就拼接数组放到这里提交保存即可
    },
    onLoad: function(e) {
      let id = e.docId;
      let t = this;
      app.http_post('Getservice', 
        { sid: id }, (ret) => {
          console.log(ret);
          let info = ret.grage;
          info.forEach((value, index, array) => {
            if (index == 0) {
              value.checked = true//如果checked属性没有就创建一个
              t.setData({
                infoarr: info,
                price: value.price,
                grage: value.grage,
                allinfo: ret.allinfo
              })
            }
          });
      })
       
    },
  radio: function (e) {
    console.log(e.currentTarget.dataset.id)
    console.log("价格=" + e.currentTarget.dataset.price)
    this.setData({
      price: e.currentTarget.dataset.price
    });
  },
  // 发货地址选择,获取用户选择的单选框的值
  radioChange: function (e) {
    console.log('等级=' + e.detail.value)
    this.setData({
      grage: e.detail.value
    });
  },
  // 上传图片
  chooseimage: function () {
    var _this = this;
    var uploaded_pic_list = _this.data.uploaded_pic_list
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        console.log(res)
        let tempFiless = res.tempFiles
        //遍历选择的图片
        tempFiless.forEach((value, index, array) => {
          console.log(value['path']);
          uploaded_pic_list.push(value['path']);//把选择的临时路径追加到数组中 
        })
        //刷新数组
        _this.setData({
          uploaded_pic_list: uploaded_pic_list
        })
        //遍历存放临时路径的数组进行依次上传
        uploaded_pic_list.forEach((value, index, array) => {
          console.log(index);
          _this.upload_img(_this, uploaded_pic_list, index)
        })
      }
    })
  },
  //上传图片方法
  upload_img: function (that, uploaded_pic_list, j) {
    console.log("开始上传第" + j + "张图片");//remove
    console.log(uploaded_pic_list[j]);
    let temppaths = uploaded_pic_list[j];
    let serverimglist = that.data.serverimglist;
    wx.showLoading({
      title: '上传中...',
      mask: true,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
    wx.uploadFile({
      //pj.dede1.com/tp3/gongzhong/index.php/Admin/image/uploadfortp
      url: 'https://jin.itxiaolong.cn/app/index.php?i=3&c=entry&a=wxapp&m=jiaju&do=Postuploadimg',
      filePath: temppaths,
      name: 'file',
      success: function (res) {
        wx.hideLoading();
        console.log(res);
        let filename = "http://www.tplaydhm.com/" + res.data
        console.log('图片上传' + j + "到服务器完成");
        //console.log(JSON.parse(res.data).data);
        console.log(uploaded_pic_list[j]);
        console.log('返回的图片' + JSON.parse(res.data).data.imgpath);
        serverimglist.push(JSON.parse(res.data).data.imgpath);
        //清空已经上传的图片
        uploaded_pic_list.splice(0, uploaded_pic_list.length);
        that.setData({
          uploaded_pic_list: uploaded_pic_list,
          serverimglist: serverimglist
        })
        console.log(serverimglist);
      },
      fail: function (e) {
        console.log(e)
      }
    })
  },
  //删除图片
  delete: function (e) {
    let imgsArray = this.data.serverimglist
    // let imgs_oldArray = this.data.imgs_old
    var t = this;
    Array.prototype.indexOf = function (e) {
      for (var t = 0; t < this.length; t++) if (this[t] == e) return t;
      return -1
    }, Array.prototype.remove = function (e) {
      var t = this.indexOf(e);
      t > -1 && this.splice(t, 1)
    };
    var a = e.currentTarget.dataset.inde;
    imgsArray.remove(imgsArray[a]), t.setData({
      serverimglist: imgsArray
    })
  },
    onShow: function() {
        var e = this, t = this;
        let openid=wx.getStorageSync('openid');
        if(!openid){
          wx.switchTab({
            url: '/pages/user/userIndex/userIndex'
          })
        }

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
    },
    
});