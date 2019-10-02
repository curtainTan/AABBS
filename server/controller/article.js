const articleFun = require( "../model/article_fun" )
const userFun = require( "../model/user_fun" )



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
        msg: "操作成功---"
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

// 通过页码获取文章       按时间排序
const getArticlesByPage = async ctx => {
  var data = ctx.request.body

}

// 通过页码和标签获取文章
const getArticleByPageAndLabel = async ctx => {
  const data = JSON.parse( JSON.stringify( ctx.query ) )
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
const modificationArticle = async ctx => {

}

// 

module.exports = {
  createArticle,
  uploadImage,
  getArticlesByPage,
  getArticleByPageAndLabel,
  searchByTitle,
  modificationArticle
}

