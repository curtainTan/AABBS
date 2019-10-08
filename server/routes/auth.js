const router = require('@koa/router')()
const auth = require("../controller/auth")
const multer = require( "@koa/multer" )

router.prefix('/auth')

var storage = multer.diskStorage({
  destination: ( req, file, cb ) => {
    cb( null, "public/public/headImg" )
  },
  filename: ( req, file, cb ) => {
    var fileForm = (file.originalname).split('.')
    cb(null, Date.now() + '.' + fileForm[fileForm.length - 1 ])
  }
})

var upload = multer( { storage: storage } )



router.post( "/login", auth.login )
router.post( "/phoneCode", auth.setPhoneCode )
router.get( "/captcha", auth.captcha )
router.post( "/register", auth.rejester )
router.get( "/autoLogin", auth.autoLogin )
router.post( "/loginByCode", auth.loginByCode )
router.post( "/uploadHeadImg", upload.any(), auth.uploadHeader )
router.post( "/modificationData", auth.modificationData )


router.get( "/userInfo/:uid", auth.getUserInfo )



module.exports = router
