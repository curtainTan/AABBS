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



