const collectionFun = require( "../model/collection_fun" )



const createCollection = async ctx => {
  var data = ctx.request.body
  data.phone = ctx.state.token.phone
  var res = await collectionFun.createCollection( data )
  ctx.body = {
    msg: "创建成功---"
  }
}

const getCollectionData = async ctx => {
  var data = ctx.params
  var res = await collectionFun.getCollectionData( data )
  ctx.body = {
    msg: "获取成功",
    collections: res
  }
}

const updateCollection = async ctx => {
  var data = ctx.request.body
  var res = await collectionFun.updateCollection( data )
  ctx.body = {
    msg: "修改成功",
    collections: res
  }
}

const updateImage = async ctx => {
  var data = {
    headImg: "",
    collId: ""
  }
  var res = await collectionFun.updateImage( data )
  ctx.body = {
    msg: "修改成功",
    imgUrl: ""
  }
}

const getCollectionById = async ctx => {
  var data = ctx.params
  data.page = 0
  var res = await collectionFun.getCollectionById( data )
  var list = await collectionFun.getCollectList( data )
  ctx.body = {
    collectiondata: res,
    list: list
  }
}

const getCollectList = async ctx => {
  var data = ctx.params
  var res = await collectionFun.getCollectList( data )
  ctx.body = {
    msg: "列表获取成功---",
    list: res
  }
}

const deleteOneCollect = async ctx => {
  var data = ctx.params
  var res = await collectionFun.deleteOneCollect( data )
  ctx.body = {
    msg: "单个项删除成功---"
  }
}

const addOneCollect = async ctx => {
  var data = ctx.params
  data.phone = ctx.state.token.phone
  var res = await collectionFun.addOneCollect( data )
  ctx.body = {
    msg: "单个项添加成功---"
  }
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

