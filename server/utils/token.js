const jwt = require("jsonwebtoken")

const tokenTime = 60 * 60 * 24


module.exports = {
    setToken( data ){
        var token = jwt.sign( { phone: data }, "tan", {
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








