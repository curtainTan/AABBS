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



module.exports = router
