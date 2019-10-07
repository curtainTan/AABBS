const router = require('@koa/router')()
const multer = require( "@koa/multer" )


const collection = require("../controller/collection")

router.prefix('/collection')

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


router.post( "/createCollection", collection.createCollection )
router.post( "/updateImage", upload.any(), collection.updateImage )
router.post( "/updateCollection", collection.updateCollection )
router.get( "/addOneCollect/:articleId", collection.addOneCollect )
router.get( "/deleteOneCollect/:collId", collection.deleteOneCollect )



router.get( "/public/getCollectionData/:uid", collection.getCollectionData )
router.get( "/public/getCollectionById/:collId", collection.getCollectionById )
router.get( "/public/getCollectList/:collId/:page", collection.getCollectList )



module.exports = router
