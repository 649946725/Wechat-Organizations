const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection(event.jihe).add({
    data: {
      _openid: event.openid,
      name: event.name,
      banji:event.banji,
      leixing:event.leixing,
      xueyuan:event.xueyuan,
      mingzi:event.mingzi
    }
  })
}