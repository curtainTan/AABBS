const { 
  User,
  Article,
  Like,
  Discuss
} = require( "./index" )


// --------------------------------文章相关------------------------------
// 文章的增删查改
// 获取文章列表
// 文章的查找




// 创建一篇文章
const createArticle = async data => {
  const article = await Article.create({
    title: data.title,
    caogao: data.caogao,
    titleImage: data.titleImage,
    content: data.content,
    brief: data.brief,
    label: data.label,
    artType: data.artType,
    mdContent: data.mdContent ? data.mdContent : ""
  })
  const addAuth = await article.setUser( data.user )
  return addAuth
}

// 更新一篇文章
const updataArt = async data => {
  var aArticle = await Article.findByPk( parseInt( data.articleId ) )
  var res = await aArticle.update({
    title: data.title,
    caogao: data.caogao,
    titleImage: data.titleImage,
    content: data.content,
    brief: data.brief,
    label: data.label,
    mdContent: data.mdContent ? data.mdContent : ""
  })
  return res.dataValues
}

// 删除一篇文章
const deleteArticle = async data => {
  const article = await Article.findByPk( parseInt( data.artId ) )
  var res = article.destroy()
  console.log( "删除一篇文章的结果" )
  console.log( res )
}

// 获取文章列表
const getArticleByPageAndLabel = async data => {
  const artList = await Article.findAndCountAll({
    where: {
      label: data.label,
      caogao: 0
    },
    attributes: {
      exclude: ['content', 'md_content']
    },
    include: [
      {
        model: User,
        attributes: ['user_name', 'headImg', 'signature', 'id']
      }
    ],
    offset: parseInt( data.page ) * 5,
    limit: 5,
    order: [
      ['created_at', 'DESC']
    ]
  })
  // console.log( "文章列表结果" )
  // console.log( artList )
  // console.log( "这里是一个数据的内容" )
  // console.log( artList.rows[0].dataValues )
  return artList
}

// 查找，返回一篇文章的内容
const searchOne = async data => {
  var article = await Article.findOne({
    where: {
      id: parseInt( data.articleId )
    },
    include: [
      {
        model: User,
        attributes: ['user_name', 'headImg', 'signature']
      }
    ]
  })
  return article.dataValues
}

// 增加阅览量
const addLookNum = async data => {
  const artc = await Article.findByPk( parseInt( data.id ) )
  console.log( "查询一篇文章的结果" )
  // artc.lookNum
}



// ---------------------------评论相关-------------------------------
// 评论的添加和获取
// 获取用户的评论

// 增加一条评论
const addDiscuss = async data => {
  var discuss = await Discuss.create({
    content: data.content
  })
  var article = await Article.findByPk( data.artId )
  var user = await User.findOne({
    where: {
      phone: data.phone
    }
  })
  discuss.setArticle( article )
  discuss.setUser( user )
  return "成功---"
}

// 获取一片文章的评论
const getDiscuss = async data => {
  var discussList = await Discuss.findAndCountAll({
    where: {
      "article_id": parseInt( data.articleId )
    },
    include: [
      {
        model: User,
        attributes: ['user_name', 'headImg', 'signature']
      }
    ]
  })
  console.log( "查询评论成功" )
  console.log( discussList )
  return discussList
}



// ----------------------------喜欢----------------------------------

// 添加和删除喜欢
const addLike = async data => {
  var alike = await Like.findOrCreate({
    where: {
      phoneAndArticle: data.phone + data.articleId
    }
  })
  console.log( "查询到的数据是" )
  console.log( alike )
  // if( alike ){
  //   alike.destroy()
  // }
}
// 获取用户喜欢的文章


module.exports = {
  createArticle,
  getArticleByPageAndLabel,
  deleteArticle,
  
  addLookNum,
  updataArt,
  addLike,
  searchOne,

  addDiscuss,
  getDiscuss
}
