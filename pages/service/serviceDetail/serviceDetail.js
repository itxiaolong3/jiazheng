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
      bili:0,
      uploadimgurl: '',//图片上传
      uploaded_pic_list: [],
      publisherarticle: [],
      serverimglist: [],//保存服务器返回的地址
      postimgurl: '',//当需要提交的时候就拼接数组放到这里提交保存即可
      thisid:''
    },
    onLoad: function(e) {

      console.log('加载进来');
      console.log(e);
      let t = this;
      let id = e.docId;
      let seleaddid=app.data.addid;
     
      if(id==''||id==0){
        id = app.data.typeid;
      }
      if(seleaddid){
        t.getselectaddress(seleaddid);
      }else{
        t.getselectaddress(0);
      }
      this.setData({
        thisid:id
      });
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
                bili:value.bili,
                allinfo: ret.allinfo
              })
            }
          });
      })
       
    },
  radio: function (e) {
    console.log(e.currentTarget.dataset.id)
    console.log("价格=" + e.currentTarget.dataset.price)
    console.log("比例=" + e.currentTarget.dataset.bili)
    this.setData({
      price: e.currentTarget.dataset.price,
      bili: e.currentTarget.dataset.bili
    });
  },
  //获取用户选择的单选框的值
  radioChange: function (e) {
    console.log('等级=' + e.detail.value)
    this.setData({
      grage: e.detail.value,
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
        let postpath='';
        serverimglist.forEach((value, index, array) => {
          
          postpath +=value+','
        })
        that.setData({
          uploadimgurl: postpath.substr(0, postpath.length - 1)
        })
        console.log('需要上传的图片路径' + that.data.uploadimgurl);
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
    let postpath = '';
    imgsArray.forEach((value, index, array) => {
      postpath += value + ','
    })
    t.setData({
      uploadimgurl: postpath.substr(0, postpath.length - 1)
    })
    console.log('删除后提交的图片路径' + postpath.substr(0, postpath.length - 1));
  },
    onShow: function() {
      console.log("执行onShow");
        var e = this, t = this;
        let openid=wx.getStorageSync('openid');
      let id = t.data.thisid;
        if(!openid){
          wx.switchTab({
            url: '/pages/user/userIndex/userIndex'
          })
        }
      console.log('下单里面获取app中的addid=' + seleaddid);
      console.log('下单里面获取app中的typeid=' + app.data.typeid);
      let seleaddid = app.data.addid;
      if (id == '' || id == 0) {
        id = app.data.typeid;
      }
      if (seleaddid) {
        t.getselectaddress(seleaddid);
      } else {
        t.getselectaddress(0);
      }
    },
    onUnload: function() {
      console.log("执行onUnload");
    },
   
    submitForm: function(e) {
        var t = this;           
        var s = new Date();
        let gender="";
        let alladdress = this.data.addressInfo.address + this.data.addressInfo.detail_info;
      if (this.data.addressInfo.gender==1){
           gender="先生";
          }else{
          gender = "女士";
          }
          let truename = this.data.addressInfo.name+"("+gender+")",
          d = {
            doc_id: this.data.thisid,
            true_name: truename ,
            mobile: this.data.addressInfo.mobile,
            address: alladdress,
            remark: e.detail.value.remark,
            price: t.data.price,
            grage: t.data.grage,
            bili:t.data.bili,
            imgs: t.data.uploadimgurl,
            openid:wx.getStorageSync('openid')
        };
      let fid = e.detail.formId;
      //保存formid用户发送模板消息
      let fdata = {
        openid: wx.getStorageSync('openid'),
        form_id: fid
      }
      app.http_post('AddFormId',
        fdata, (ret) => {
          console.log('已保存formid');
        })
      if (e.detail.value.remark==''){
          wx.showToast({
            title: '请输入问题描述',
          })
      } else if (alladdress==''){
        wx.showToast({
          title: '请选择地址',
        })
      } else if (t.data.uploadimgurl == '') {
        wx.showToast({
          title: '问题图片最少一张',
        })
      } else if (this.data.thisid == '') {
        wx.showToast({
          title: '发送未知错误',
        })
      }else{
        console.log(e.detail.formId); 
        if (!this.data.prevent) {
          wx.showLoading({
            title: '提交中...',
          })
          this.setData({
            prevent: !0
          });
          console.log(d);
          app.http_post('SubmitOrder',
            d, (ret) => {
              wx.hideLoading();
              console.log(ret);
              wx.showToast({
                title:  "提交成功",
                mask: !0
              }), setTimeout(function () {
               
                wx.navigateBack({
                  delta:1
                })
              }, 1e3);
            })
        } 
      }  
            
        
    },
    getselectaddress:function(t){
      let openid='';
      if(t==0){
        openid = wx.getStorageSync('openid');
      }  
      app.http_get('getoneAdd&id=' + t + '&openid=' + openid, (ret) => {
        console.log(ret.Data);
        app.data.addid='';
        this.setData({
          addressInfo:ret.Data
        });
      })
    },
    linkToTap:function(i){
      
      console.log('要跳转');
      //data-url="/pages/address/addressList/addressList?isSelect=1&id={{thisid}}"
      wx.navigateTo({
        url: '/pages/address/addressList/addressList?isSelect=1&id='+this.data.thisid,
      })
    }
    // navigateTap: function() {
    //   let a=this;
    //   console.log('传到地址列表的栏目id='+a.data.thisid);
    //     t.default.navigateTo({
    //         url: "/pages/order/orderList/orderList?id="+a.data.thisid
    //     });
    // },
    
});