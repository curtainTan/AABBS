const { 
  User,
  Article,
  Discuss
} = require( "./index" )


// --------------------------------文章相关------------------------------
// 文章的增删查改
// 获取文章列表
// 文章的查找




// 创建一篇文章
const createArticle = async data => {
  console.log( "创建一篇文章获取的数据" )
  console.log( data )
  const article = await Article.create({
    title: data.title,
    caogao: data.caogao,
    titleImage: data.headerPic,
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
    titleImage: data.headerPic,
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
// 阅览量 +
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
  var res = await article.update({
    lookNum: article.dataValues.lookNum + 1
  })
  return res.dataValues
}


// ---------------------------评论相关-------------------------------
// 评论的添加和获取
// 获取用户的评论

// 增加一条评论
const addDiscuss = async data => {
  var discuss = await Discuss.create({
    content: data.content
  })
  var article = await Article.findByPk( data.articleId )
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
  console.log( "获取平路-----传进来的参数" )
  console.log( data )
  var discussList = await Discuss.findAndCountAll({
    where: {
      "article_id": parseInt( data.articleId )
    },
    include: [
      {
        model: User,
        attributes: ['user_name', 'headImg', 'signature']
      }
    ],
    offset: parseInt( data.page || 0 ) * 7,
    limit: 7,
    order: [
      ['created_at', 'DESC']
    ]
  })
  return discussList
}


module.exports = {
  createArticle,
  getArticleByPageAndLabel,
  deleteArticle,
  
  updataArt,
  searchOne,

  addDiscuss,
  getDiscuss,

}
