const app = getApp()
Page({

  data: {
    shop: '',
    sshop: '',
    people: '',
    start: '',
    end: '',
    address: '',
    latitude: '',
    longitude: '',
    img_6: '',
    img_7: '',
    ver: '获取验证码',
    code: '',
    ccode: '',
    idcard: '',
    checked: true,
    ispost:!1,//防止多次提交
    brdata: '1990-09',
    IDnum:'',
    name: '',
    tel: '',
    goodat:''
  },

  onLoad: function (options) {
    if(options.isw){

    }
    this.get_type()
  },

  change: function (event) {
    this.setData({
      checked: !this.data.checked
    })
  },

  get_type: function (event) {
    app.http_get('Getrange', (ret) => {
      if (ret.status == 1) {
        this.setData({
          area_data: ret.data
        })
      }
    })
  },

  tap_load: function (event) {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        wx.showLoading({
          title: '上传中...',
        })
        wx.uploadFile({
          url: `${app.data.url}Postuploadimg`,
          filePath: res.tempFilePaths[0],
          name: 'file',
          success: (res) => {
            wx.hideLoading();  
            let name = `img_${event.currentTarget.dataset.id}`
            this.setData({
              [name]: JSON.parse(res.data).data.imgpath
            })
          },
          fail: (err) => {
            console.log(err)
          }
        })
      }
    })
  },
  bindDateChange: function (e) {
    console.log('选择的日期', e.detail.value)
    this.setData({
      brdata: e.detail.value
    })
  },
  tap_btn: function (event) {
    let name = this.data.name
    let tel = this.data.tel
    let IDnum = this.data.IDnum
    let brdata = this.data.brdata
    let img_0 = this.data.img_6
    let img_1 = this.data.img_7
    let goodat = this.data.goodat
    let checked = this.data.checked
    if (!name || !tel || !IDnum || !brdata || !img_0 || !img_1 || !goodat) {
      wx.showToast({
        title: '请把信息填写完整',
        icon: 'none'
      })
    } 
    // else if (code != ccode) {
    //   wx.showToast({
    //     title: '手机验证码不正确',
    //     icon: 'none'
    //   })
    // }
     else if (!checked) {
      wx.showToast({
        title: '同意协议才能申请',
        icon: 'none'
      })
    } else {
      let reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/
      if (!reg.test(tel)) {
        wx.showToast({
          title: '请输入有效的手机号',
          icon: 'none'
        })
        return
      } 
    if(!this.data.ispost){
       wx.showLoading({
          title: '正在申请',
          mask: true
          })
      this.setData({
        ispost: !0
      });
      app.http_post('Postsq', {
          openid: wx.getStorageSync('openid'),
          name: name,
          tel: tel,
          IDnum: IDnum,
          brdata: brdata,
          idimg1: img_0,
          idimg2: img_1,
          goodat: goodat,
        }, (ret) => {
          wx.hideLoading()
          if (ret.status == 1) {
            wx.showToast({
              title: '申请成功',
              mask: true
            })
            setTimeout(() => {
              wx.navigateBack()
            }, 1000)
          } else {
            wx.showToast({
              title: '申请失败',
              icon: 'none'
            })
          }
        })
      }
      
      
    }
  },

  input_value: function (event) {
    let name = ''
    switch (Number(event.currentTarget.dataset.id)) {
      case 1:
        name = 'IDnum'
        break
      case 2:
        name = 'name'
        break
      case 3:
        name = 'tel'
        break
      case 4:
        name = 'goodat'
        break
      case 5:
        name = 'brdata'
    }
    this.setData({
      [name]: event.detail.value
    })
  },

  tap_ver: function (tel) {
    let ver = this.data.ver
    let reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/
    if (!reg.test(tel)) {
      wx.showToast({
        title: '请输入有效的手机号',
        icon: 'none'
      })
      return
    } 
    // else if (ver == '获取验证码' || ver == '重新获取') {
    //   wx.showToast({
    //     title: '验证码已发送',
    //     icon: 'none'
    //   })
    //   this.setData({
    //     ver: '30s'
    //   })
    //   let i = 30
    //   let time = setInterval(() => {
    //     if (i > 1) {
    //       i--
    //       this.setData({
    //         ver: i < 10 ? '0' + i + 's' : i + 's'
    //       })
    //     } else {
    //       this.setData({
    //         ver: '重新获取'
    //       })
    //       clearInterval(time)
    //     }
    //   }, 1000)
    //   app.http_post('SendSms', {
    //     tel: tel
    //   }, (ret) => {
    //     if (ret.errno == 0) {
    //       this.setData({
    //         ccode: ret.data.code
    //       })
    //     }
    //   })
    // }
  },

  tap_agree: function (event) {
    wx.navigateTo({
      url: '/pages/user/agree/agree'
    })
  }

})