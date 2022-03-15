const app = getApp()
const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shetuan: ['社会主义新青年社团', '新时代理论社', '习近平新时代中国特色社会主义', 'Python爱好者协会', '功能农业社', '昆虫爱好者协会', '草木年华', '野物语自然爱好者协会', '园艺协会', '食品科技协会', '葡萄酒协会', '软件社', '电子设计创新社', '法律爱好者协会', '天问社', '创客俱乐部', '创业协会', '无人机创新团队', 'ERP协会','大学生英语爱好者协会', '剪韵艺社', '飞羽毽球社', '天行健合唱团', '海马文学社', '跆健社', 'Tvfamily', '葡萄酒协会', '樱奈物语动漫社', '墨轩书法协会', '民族器乐爱好者协会', '林苑文学社', '芳土文学社', '羽毛球协会', '足球爱好者协会', 'sky逐日骑滑社', '排球爱好者协会', '中国结艺社', '板羽协会', '影梦协会', '艺美绘画社', '武术协会', '极速轮滑协会', '乒乓球协会', 'DIY创意社', '青墨汉服社', '茗贤茶学社', 'CheerBoom', 'Boss街舞社', '知微国学社', '爱悠悠', '沐音吉他社', '棋弈协会', '心声演讲社', '乘风网球社', '魔方社', '幻彩魔术社', '鬼谷曳舞社', '说唱社团', '古建风韵社', '印橡坊', 'I-English英语播音社', 'Flying话剧协会', '农民之子', '植爱青年', '流浪动物救助协会', '绿色方阵', '心绿环保协会', '冰激凌微公益社团', '支农队', '薪火研习与支教协会', '微光社', '大学生支教协会', '红丝带协会',],
    index:0
  },

 type: function (e) {
    var that = this
    that.setData({
      index: e.detail.value
    })
   console.log(e.detail.value)
 },
  onLoad: function (options) {
   
  },
  info(e) {
    var that=this
    var info = e.detail.value
    console.log(info.type)
    wx.cloud.callFunction({
      name: 'get_data',
      data: {
        jihe: 'student',
        where: {
          mingzi: info.type
        }
      },
      success: res => {
        console.log('搜索成功 ', res)
        console.log(res.result.data.length)
        var array=res.result.data
        that.getget(array, info.type)
      },
      fail: res => {
        console.log('搜索成功 ', res)
      }
    })
  },
  getget(e,i) {
    var self = this
    wx.showLoading({
      title: '导出中...',
    })
    self.savaExcel(e,i)
  },
  //把数据保存到excel里，并把excel保存到云存储
  savaExcel(userdata,i) {
    let that = this
    var dateqyz = new Date()
    wx.cloud.callFunction({
      name: "excel",
      data: {
        name:i+'报名表',
        userdata: userdata
      },
      success(res) {
        console.log("保存成功", res)
        that.getFileUrl(res.result.fileID)
      },
      fail(res) {
        wx.hideLoading()
        wx.showToast({
          title: '失败',
          icon: 'none',
          duration: 2000
        })
        console.log("保存失败", res)
      }
    })
  },
  //获取云存储文件下载地址，这个地址有效期一天
  getFileUrl(fileID) {
    let that = this;
    wx.cloud.getTempFileURL({
      fileList: [fileID],
      success: res => {
        console.log("文件下载链接", res.fileList[0].tempFileURL)
        that.setData({
          fileUrl: res.fileList[0].tempFileURL
        })
        wx.hideLoading()
        wx.showToast({
          title: '导出成功',
        })
      },
      fail: err => {
        wx.hideLoading()
        that.setData({
          temp: res.fileList[0].tempFileURL
        })
      }
    })
  },
  fuzhi(e) {
    var self = this
    wx.setClipboardData({
      data: self.data.fileUrl,
      success(res) {
        wx.getClipboardData({
          success(res) {
            console.log(res.data)
          }
        })
      }
    })
  },

 obtain(e)
 {
   wx.cloud.callFunction({
     name: 'get_data',
     data: {
       jihe: 'student',
       where: {
         mingzi: e
       }
     },
     success: res => {
       console.log('搜索成功 ', res)
     },
     fail: res => {
       console.log('搜索成功 ', res)
     }
   })
 },
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})