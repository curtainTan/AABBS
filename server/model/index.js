const db = require("../db/db")
const User = db.import("./user.js")
const Article = db.import("./article.js")
const Like = db.import("./like.js")
const Discuss = db.import("./discuss.js")


Article.belongsTo( User )
Like.belongsTo( User )
Like.belongsTo( Article )
Discuss.belongsTo( Article )
Discuss.belongsTo( User )



//  运行前执行一次此文件即可，同步表结构
// var option = {
//     force: false,     // 强制建表，会删除表的所有数据，重新建表
//     alter: true,      // 修改表结构以适应模型，会删除模型中没有的字段
// }
// db.sync( option ).then( res => {
//     console.log( "创建成功----" )
//     console.log( res )
// } ).catch( err => {
//     console.log( "出错了" )
//     console.log( res )
// } )




module.exports = {
    User,
    Article,
    Like,
    Discuss
}
