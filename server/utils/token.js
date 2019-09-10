const jwt = require("jsonwebtoken")

const tokenTime = 1000 * 60 * 60 * 24


module.exports = {
    setToken( data ){
        var token = jwt.sign( { userName: data.userId }, "tan", {
            expiresIn: tokenTime
        } )
        return token
    },
    checkToken( token ){
        var userId = null
        try{
            var data = jwt.verify( token, "tan" )
            userId = data.userId
        }catch( e ){

        }
        return userId
    }
}








