const { 
  User,
  Article,
  Like,
  Discuss
} = require( "./index" )

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

const getArticleByPageAndLabel = async data => {
  const artList = await Article.findAndCountAll({
    where: {
      label: data.label,
      caogao: 0
    },
    include: [
      {
        model: User,
        attributes: ['user_name', 'headImg', 'signature']
      }
    ],
    offset: parseInt( data.page ),
    limit: 10,
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


module.exports = {
  createArticle,
  getArticleByPageAndLabel
}
