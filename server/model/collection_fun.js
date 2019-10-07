const { 
  User,
  Article,
  Collection,
  Collect
} = require( "./index" )

// ----------功能描述--------------

// 创建一个收藏夹
// 修改收藏夹
// 修改收藏夹的图片
// 通过用户的id获取收藏夹列表的基本信息

// 获取单个收藏夹的信息
// collId

// 获取收藏列表
// collId     page

// 删除一个收藏的项目

// 添加一个收藏项
// articleId   phone




// 创建一个收藏夹
// name  introduce phone
const createCollection = async data => {
  var collection = await Collection.create({
    name: data.name,
    introduce: data.introduce
  })
  var user = await User.findOne({
    where: {
      phone: data.phone
    }
  })
  var res = await collection.setUser( user )
  console.log( "创建成功---" )
  console.log( res )
  return res.dataValues
}

// 修改收藏夹
// name  introduce  collId
const updateCollection = async data => {
  var res = await Collection.update(
    {
      name: data.name,
      introduce: data.introduce
    },{
      where: {
        "id": data.collId
      }
    }
  )
  console.log( "修改后的结果" )
  console.log( res )
  return res
}

// 修改收藏夹的图片
// headImg    collId
const updateImage = async data => {
  var res = await Collection.update(
    {
      headImg: data.headImg
    },{
      where: {
        "id": data.collId
      }
    }
  )
  console.log( "修改后的结果" )
  console.log( res )
  return res
}

// 通过用户的id获取收藏夹列表的基本信息
// uid    page
const getCollectionData = async data => {
  var res = await Collection.findAndCountAll({
    where: {
      "user_id": data.uid
    },
    offset: parseInt( data.page ) * 5,
    limit: 5,
    order: [
      ['created_at', 'DESC']
    ]
  })
  console.log( "查询后列表的结果" )
  console.log( res )
  return res
}

// 获取单个收藏夹的信息
// collId
const getCollectionById = async data => {
  var res = await Collection.findByPk( parseInt( data.collId ), {
    include: [
      {
        model: User,
        attributes: ['user_name', 'headImg', 'signature', 'id']
      }
    ]
  })
  console.log( "获取单个收藏夹的结果" )
  console.log( res )
  return res
}

// 获取收藏列表
// collId     page
const getCollectList = async data => {
  var res = await Collect.findAndCountAll({
    where: {
      "collection_id": data.collId
    },
    include: [
      {
        model: Article,
        attributes: ['title', 'title_image', 'label', 'brief'],
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
  console.log( "获取单个收藏夹列表的结果" )
  console.log( res )
  return res
}

// 删除一个收藏的项
const deleteOneCollect = async data => {
  var res = await Collect.destroy({
    where: {
      "id": data.collId
    }
  })
  console.log( "删除单个收藏项的结果" )
  console.log( res )
  return res
}

// 添加一个收藏项
// articleId   phone
const addOneCollect = async data => {
  var collect = await Collect.create({
    "article_id": data.articleId
  })
  var user = await User.findOne({
    where: {
      phone: data.phone
    }
  })
  var res = await collect.setUser( user )
  console.log( "添加单个收藏项的结果" )
  console.log( res )
  return res
}


module.exports = {
  createCollection,
  updateCollection,
  updateImage,
  getCollectionById,
  getCollectList,
  deleteOneCollect,
  addOneCollect,
  getCollectionData
}

