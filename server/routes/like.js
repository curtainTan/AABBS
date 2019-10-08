const router = require('@koa/router')()

const like = require("../controller/like")

router.prefix('/like')



router.get( "/addLike/:articleId", like.addLike )


router.get( "/public/getUserLike/:uid/:page", like.getUserLike )
router.get( "/public/getArtLike/:articleId", like.getArtLike )



module.exports = router
