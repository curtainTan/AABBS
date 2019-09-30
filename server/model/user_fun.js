const { User } = require("../model/index")


var userFun = {
  register( data ){
    return User.create({
      phone: data.phone,
      user_name: data.phone,
      psw: data.psw
    })
  },
  getUserByPhone( phone ){
    return User.findOne({
      where: {
        phone: phone
      }
    })
  },
  
}


module.exports = userFun
