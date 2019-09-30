const articleFun = require( "../model/article_fun" )
const userFun = require( "../model/user_fun" )

const createArticle = async ctx => {
  if( ctx.state && ctx.state.token ){
    var data = ctx.request.body
    const user = await userFun.getUserByPhone( ctx.state.token.phone )
    data.user = user
    var addRes = await articleFun( data )
    console.log( "创建完成后，在外面的信息为：" )
    console.log( addRes )
  } else {
    ctx.body = {
      msg: "用户错误---"
    }
  }
}

const uploadImage = async ctx => {
  ctx.body = {
    success: true,
    imgUrl: "http://localhost:3000/articleImg/" + ctx.request.files[0].filename
  }
}


module.exports = {
  createArticle,
  uploadImage
}

