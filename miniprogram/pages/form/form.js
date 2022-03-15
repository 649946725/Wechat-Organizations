
const app = getApp()
const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color:'#B2B2B2',
    color_leixing: '#B2B2B2',
    color_shetuan: '#B2B2B2',
    index:0,
    index_leixing:0,
    index_shetuan: 0,
    array: ['选择所在学院','农学院', '植物保护学院','动物科学学院', '动物医学学院', '草业学院', '资源环境学院', '园艺学院', '食品科学与工程学院', '农业经济管理学院','生命科学学院', '林学院', '农业工程学院', '信息科学与工程学院',  '公共管理学院', '软件学院', '城乡建设学院', '马克思主义学院','基础部','体育部'],
    leixing: ['选择社团类型', '思想政治类', '学术科技类', '创新创业类', '文化体育类','志愿公益类'],
    shetuan:['请先选择类型']
  },

  bindPickerChange: function (e) {
    var that=this
    that.setData({
      index: e.detail.value
    })
    if(that.data.index!=0)
    {
      that.setData({
        color:'black'
      })
    }
    else{
      that.setData({
        color: '#B2B2B2'
      })
    }
  },
  bindPickerChange_shetuan: function (e) {
    console.log(e.detail.value)
    var that = this
    that.setData({
      index_shetuan: e.detail.value
    })
    if (that.data.index_shetuan!= 0) {
      that.setData({
        color_shetuan: 'black'
      })
    }
    else {
      that.setData({
        color_shetuan: '#B2B2B2'
      })
    }
  },
  bindPickerChange_leixing: function (e) {
    var that = this
    that.setData({
      index_leixing: e.detail.value
    })
    if (that.data.index_leixing != 0) {
      that.setData({
        color_leixing: 'black'
      })
    }
    else {
      that.setData({
        color_leixing: '#B2B2B2'
      })
    }
    if (that.data.index_leixing ==0)
    {
      that.setData({
        shetuan: ['请先选择类型'],
        index_shetuan: 0,
        color_shetuan: '#B2B2B2'
      })
    }
    else if (that.data.index_leixing==1)
    {
      that.setData({
        shetuan: ['选择社团','社会主义新青年社团', '新时代理论社','习近平新时代中国特色社会主义'],
        index_shetuan: 0,
        color_shetuan:'#B2B2B2'
      })
    }
    else if (that.data.index_leixing ==2) {
      that.setData({
        shetuan: ['选择社团','Python爱好者协会', '功能农业社', '昆虫爱好者协会', '草木年华', '野物语自然爱好者协会', '园艺协会', '食品科技协会', '葡萄酒协会', '软件社', '电子设计创新社', '法律爱好者协会', '天问社','创客俱乐部'],
        index_shetuan: 0,
        color_shetuan: '#B2B2B2'
      })
    }
    else if (that.data.index_leixing == 3) {
      that.setData({
        shetuan: ['选择社团', '创业协会', '无人机创新团队', 'ERP协会'],
        index_shetuan: 0,
        color_shetuan: '#B2B2B2'
      })
    }
    else if (that.data.index_leixing == 4) {
      that.setData({
        shetuan: ['选择社团', '大学生英语爱好者协会', '剪韵艺社', '飞羽毽球社', '天行健合唱团', '海马文学社', '跆健社', 'Tvfamily', '葡萄酒协会', '樱奈物语动漫社', '墨轩书法协会', '民族器乐爱好者协会', '林苑文学社', '芳土文学社', '羽毛球协会', '足球爱好者协会', 'sky逐日骑滑社', '排球爱好者协会', '中国结艺社', '板羽协会', '影梦协会', '艺美绘画社', '武术协会', '极速轮滑协会', '乒乓球协会', 'DIY创意社', '青墨汉服社', '茗贤茶学社', 'CheerBoom', 'Boss街舞社', '知微国学社', '爱悠悠', '沐音吉他社', '棋弈协会', '心声演讲社', '乘风网球社', '魔方社', '幻彩魔术社', '鬼谷曳舞社', '说唱社团','古建风韵社','印橡坊','I-English英语播音社','Flying话剧协会',],
        index_shetuan: 0,
        color_shetuan: '#B2B2B2'
      })
    }
    else if (that.data.index_leixing == 5) {
      that.setData({
        shetuan: ['选择社团', '农民之子', '植爱青年', '流浪动物救助协会', '绿色方阵', '心绿环保协会', '冰激凌微公益社团', '支农队', '薪火研习与支教协会', '微光社', '大学生支教协会', '红丝带协会',],
        index_shetuan: 0,
        color_shetuan: '#B2B2B2'
      })
    }
  },
  info(e)
  {
console.log(e)
var that=this
var info=e.detail.value
if(info.name==''||info.banji==''||info.leixing=='选择社团类型'||info.xueyuan=='请选择所在学院'||info.shetuan=='请先选择类型' ||info.shetuan=='选择社团')
{
  wx.showToast({
    title: '请填写完整信息',
    icon: 'none',
    duration: 2000
  })
}
  else if (info.name == ' ' || info.banji == ' ') {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none',
        duration: 2000
      })
    }
else {
  
  wx.showLoading({
    mask: 'true',
    title: '正在提交中',
  })
  wx.cloud.callFunction({
    name: 'login',
    data: {
    },
    success: res => {
      wx.cloud.callFunction({
        name: 'add_student',
        data: {
          jihe: 'student',
          openid: res.result.openid,
          name: info.name,
          banji: info.banji,
          xueyuan: info.xueyuan,
          leixing:info.leixing,
          mingzi: info.shetuan,
        },
        success: res => {
          console.log('添加成功')
          wx.hideLoading()
          wx.showToast({
            title: '提交成功',
            icorn: 'success'
          })
          that.setData({
            name: '',
            banji: '',
            xuehao: '',
            index: 0,
            index_leixing: 0,
            index_shetuan: 0,
            color: '#B2B2B2',
            color_leixing: '#B2B2B2',
            color_shetuan: '#B2B2B2',
            shetuan: ['请先选择类型']
          })
        }
      })
      that.onLoad()
    }
  })
 
}
  },
  judge()
  {
    var that=this
    wx.cloud.callFunction({
      name: 'login',
      data: {
      },
      success: res => {
        db.collection('student').where({
          _openid: res.result.openid,
        })
          .get({
            success: function (res) {
              console.log(res.data)
              if(res.data.length==2)
              {
                that.setData({
                  test:true
                })
              }
              else{
                that.setData({
                  test: false
                })
              }
            }
          })  
      }
    })
  },
  onLoad: function (options) {
 var that=this
 that.judge()
 console.log('1111')
  },

 
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    that.judge()
 
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