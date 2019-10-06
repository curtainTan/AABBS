const { 
  User,
  Article,
  Like
} = require( "./index" )



// ----------------------------喜欢----------------------------------

// 添加和删除喜欢(对文章)
const addLike = async data => {
  var alike = await Like.findOne({
    where: {
      phoneAndArticle: data.phone + data.articleId
    }
  })
  if( alike ){
    await alike.destroy()
  } else {
    var nowLike = await Like.create({
      phoneAndArticle: data.phone + data.articleId
    })
    var user = await User.findOne({
      where: {
        phone: data.phone
      }
    })
    var art = await Article.findByPk( parseInt( data.articleId ) )
    await nowLike.setUser( user )
    await nowLike.setArticle( art )
  }
  return "操作成功"
}


// 获取用户喜欢的文章只获取id
const getAllLike = async data => {
  var likeList = await Like.findAll({
    where: {
      "user_id": data.uid
    },
    attributes: ['id']
  })
  var likeSet = []
  for( var i = 0; i < likeList.length; i ++ ){
    likeSet.push( likeList[i].dataValues.id )
  }
  return likeSet
}


// 获取用户喜欢的文章(含有文章信息)
const getLikeByUser = async data => {
  var likeList = await Like.findAndCountAll({
    where: {
      "user_id": data.uid
    },
    include: [
      {
        model: Article,
        where: {
          caogao: 0
        },
        attributes: ['title', 'title_image', 'label'],
        include: [
          {
            model: User,
            attributes: ['user_name', 'headImg', 'signature']
          }
        ]
      }
    ],
    offset: parseInt( data.page || 0 ) * 10,
    limit: 10,
    order: [
      ['created_at', 'DESC']
    ]
  })
  return likeList
}

// 获取文章的喜欢
const getLikeByArt = async data => {
  var likeList = await Like.findAndCountAll({
    where: {
      "article_id": data.articleId
    },
    include: [
      {
        model: User,
        attributes: ['user_name', 'headImg']
      }
    ],
    attributes: ['createdAt'],
    order: [
      ['created_at', 'DESC']
    ]
  })
  return likeList
}



module.exports = {
  addLike,
  getLikeByUser,
  getLikeByArt,
  getAllLike
}

