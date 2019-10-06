const likeFun = require("../model/like_fun")



const addLike = async ctx => {
  console.log( "船机来的数据" )
  console.log( ctx.params )
  var data = {
    articleId: ctx.params.articleId,
    phone: ctx.state.token.phone
  }
  var res = await likeFun.addLike( data )
  console.log( "获取到的数据是" )
  console.log( res )
  ctx.body = {
    msg: "成功--"
  }
}



const getUserLike = async ctx => {
  
}



const getArtLike = async ctx => {
  
}







module.exports = {
  addLike,
  getUserLike,
  getArtLike
}



