const router = require('@koa/router')()
const multer = require( "@koa/multer" )

const article = require("../controller/article")

router.prefix('/article')



var storage = multer.diskStorage({
  destination: ( req, file, cb ) => {
    cb( null, "public/public/articleImg" )
  },
  filename: ( req, file, cb ) => {
    var fileForm = (file.originalname).split('.')
    cb(null, Date.now() + '.' + fileForm[fileForm.length - 1 ])
  }
})

var upload = multer( { storage: storage } )



router.post( "/upArticleImg", upload.any(), article.uploadImage )
router.post( "/allowAllUpload", upload.any(), article.uploadImage )
router.post( "/addArticle", article.createArticle )
router.post( "/updateArticle", article.updateArticle )
router.post( "/addDiscuss", article.addDiscuss )



// 没有token就可以请求的公共接口
router.get( "/public/list", article.getArticleByPageAndLabel )
router.get( "/public/getArticle/:articleId", article.getArticleById )
router.get( "/public/getDiscuss/:articleId/:page", article.getDiscuss )




module.exports = router
