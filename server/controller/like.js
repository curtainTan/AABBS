const likeFun = require("../model/like_fun")



const addLike = async ctx => {
  var data = {
    articleId: ctx.params.articleId,
    phone: ctx.state.token.phone
  }
  var res = await likeFun.addLike( data )
  ctx.body = {
    msg: "成功--"
  }
}



const getUserLike = async ctx => {
  var data = ctx.params
  console.log( "获取喜欢的数据" )
  console.log( data )
  var list = await likeFun.getLikeByUser( data )
  console.log( list )
  ctx.body = {
    likeList: list
  }
}



const getArtLike = async ctx => {
  var likeList = await likeFun.getLikeByArt( ctx.params )
  ctx.body = {
    likeList
  }
}


module.exports = {
  addLike,
  getUserLike,
  getArtLike
}



