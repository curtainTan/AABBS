const articleFun = require( "../model/article_fun" )
const userFun = require( "../model/user_fun" )
const likeFun = require( "../model/like_fun" )


// 发表一篇文章
const createArticle = async ctx => {
  if( ctx.state && ctx.state.token ){
    var data = ctx.request.body
    const user = await userFun.getUserByPhone( ctx.state.token.phone )
    data.user = user
    var addRes = await articleFun.createArticle( data )
    if( addRes ){
      ctx.body = {
        success: true,
        msg: "操作成功---",
        articleId: addRes.dataValues.id
      }
    } else {
      ctx.body = {
        success: false,
        msg: "操作失败---"
      }
    }
  } else {
    ctx.body = {
      msg: "用户错误---"
    }
  }
}

// 上传文章的图片
const uploadImage = async ctx => {
  ctx.body = {
    success: true,
    imgUrl: "http://localhost:3000/public/articleImg/" + ctx.request.files[0].filename
  }
}

// 通过页码获取文章(所有文章)       按时间排序
const getArticlesByPage = async ctx => {
  var data = ctx.request.body

}

// 通过页码和标签获取文章
const getArticleByPageAndLabel = async ctx => {
  const data = JSON.parse( JSON.stringify( ctx.query ) )
  console.log( data )
  var ss = await articleFun.getArticleByPageAndLabel( data )
  ctx.body = {
    success: true,
    lists: ss
  }
}

// 通过标题搜索文章
const searchByTitle = async ctx => {

}

// 修改文章
const updateArticle = async ctx => {
  var data = ctx.request.body
  var upRes = await articleFun.updataArt( data )
  if( upRes ){
    ctx.body = {
      msg: "更新成功---"
    }
  } else {
    ctx.body = {
      msg: "更新失败---"
    }
  }
}

// 通过id获取一篇文章
const getArticleById = async ctx => {
  var data = ctx.params
  // 一个参数： articleId
  var article = await articleFun.searchOne( data )
  var discuss = await articleFun.getDiscuss( data )
  var likeList = await likeFun.getLikeByArt( data )
  // console.log( "获取一篇文章的参数" )
  // console.log( article )
  ctx.body = {
    article : article,
    msg: "文章获取成功",
    discuss: discuss,
    likeList: likeList
  }
}


// 添加评论
const addDiscuss = async ctx => {
  var data = ctx.request.body
  // 参数
  //    content， articleId,  phone
  data.phone = ctx.state.token.phone
  var res = await articleFun.addDiscuss( data )
  ctx.body = {
    msg: res
  }
}

// 获取评论
const getDiscuss = async ctx => {
  var data = ctx.params
  // 参数
  // 页码-page   文章id--articleId
  var discussList = await articleFun.getDiscuss( data )
  ctx.body = {
    discussList: discussList
  }
}

module.exports = {
  createArticle,
  uploadImage,
  getArticlesByPage,
  getArticleByPageAndLabel,
  searchByTitle,
  updateArticle,
  getArticleById,


  addDiscuss,
  getDiscuss
}

