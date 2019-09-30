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
    label: data.label
  })
  const addAuth = await article.setUser( data.user )
  console.log( "创建成功----" )
  console.log( addAuth )
}





module.exports = {
  createArticle
}
