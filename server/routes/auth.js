const router = require('koa-router')()
const auth = require("../controller/auth")

router.prefix('/auth')



router.post( "/login", auth.login )




module.exports = router
