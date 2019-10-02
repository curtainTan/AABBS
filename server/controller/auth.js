const redis = require("../utils/redis")
const sms = require( "../utils/sms" )
const svgCaptcha = require("svg-captcha")
const userfun = require("../model/user_fun")
const tokenFun = require("../utils/token")



// 密码登录
const login = async ctx => {
  const data = ctx.request.body
  var user = await userfun.getUserByPhone( data.phone )
  if( user ){
    if( user.dataValues.psw === data.psw ){
      var nowToken = tokenFun.setToken( user.dataValues.phone )
      ctx.body = {
        status: 999,
        token: nowToken,
        username: user.dataValues.user_name,
        phone: user.dataValues.phone,
        admin: user.dataValues.admin,
        msg: user.dataValues.msg,
        headImg: user.dataValues.headImg,
        bg: user.dataValues.bg,
        introduce: user.dataValues.introduce,
        work: user.dataValues.work,
        joinTime: user.dataValues.createdAt
      }
    } else {
      ctx.body = {
        status: 13,
        msg: "密码错误----"
      }
    }
  } else {
    ctx.body = {
      status: 12,
      msg: "用户不存在--"
    }
  }
}

// 通过验证码登录
const loginByCode = async ctx => {
  const data = ctx.request.body
  var phoneCode = await getRedisPhoneCode( data.phone )
  if( phoneCode === data.phonecode ){
    var user = await userfun.getUserByPhone( data.phone )
    var nowToken = tokenFun.setToken( data.phone )
    ctx.body = {
      status: 999,
      token: nowToken,
      username: user.dataValues.user_name,
      phone: user.dataValues.phone,
      admin: user.dataValues.admin,
      msg: user.dataValues.msg,
      headImg: user.dataValues.headImg,
      bg: user.dataValues.bg,
      introduce: user.dataValues.introduce,
      work: user.dataValues.work,
      joinTime: user.dataValues.createdAt
    }
  } else {
    ctx.body = {
      status: 13,
      msg: "验证码无效---"
    }
  }
}

// 自动登录
const autoLogin = async ctx => {
  if( ctx.state && ctx.state.token ){
    // 如果token里过期时间相差3小时，就重新获取token
    var nowToken = null
    if( ctx.state.token.exp - ctx.state.token < 3 * 60 * 60 ){
      nowToken = tokenFun.setToken( ctx.state.token.phone )
    }
    var user = await userfun.getUserByPhone( ctx.state.token.phone )
    ctx.body = {
      status: 999,
      token: nowToken ? nowToken : "",
      username: user.dataValues.user_name,
      phone: user.dataValues.phone,
      admin: user.dataValues.admin,
      msg: user.dataValues.msg,
      headImg: user.dataValues.headImg,
      bg: user.dataValues.bg,
      introduce: user.dataValues.introduce,
      work: user.dataValues.work,
      joinTime: user.dataValues.createdAt
    }
  }
}

// 设置验证码
const setPhoneCode = async ctx => {
  const data = ctx.request.body
  if( data.phone ){
    var tan = await getRedisPhoneCode( data.phone )
    if( tan ){
      ctx.body = {
        msg: "验证码已经发送，请稍后再试--"
      }
    } else {
      var smsCode = Math.random().toString().slice(-6)
      var sendData = await sms.mysendmsg( parseInt( data.phone ), [ smsCode ] )
      if( sendData.result !== 0 ){
        ctx.body = {
          status: sendData.result,
          msg: sendData.errmsg
        }
      } else {
        redis.SETEX( data.phone, 60 * 60 , smsCode )
        ctx.body = {
          msg: "验证码发送"
        }
      }
    }
  } else {
    ctx.body = {
      msg: "请输入电话号码"
    }
  }
}

// 注册
const rejester = async ctx => {
  const data = ctx.request.body
  var userExist = await userfun.getUserByPhone( data.phone )
  // 判断用户是否存在
  console.log( "查询yonghu " )
  console.log( userExist )
  if( userExist && userExist.dataValues.phone ){
    ctx.body = {
      mas: "用户已经存在--"
    }
  } else {
    // 判断验证码
    var phoneCode = await getRedisPhoneCode( data.phone )
    if( phoneCode ){
      if( phoneCode === data.phonecode ){
        var tan = await userfun.register( { 
          phone: data.phone,
          psw: data.psw
        })
        ctx.body = {
          status: 999,
          msg: "用户注册成功---"
        }
      } else {
        ctx.body = {
          mas: "验证码错误---"
        }
      }
    } else {
      ctx.body = {
        mas: "验证码无效---"
      }
    }
  }
}

// 密码登录的验证码
const captcha = async ctx => {
  var captcha = svgCaptcha.create({
      ignoreChars:'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',// 排除字母，只用数字
      noise: 2 // 干扰线条的数量
  })

  ctx.cookies.set( "captcha", captcha.text, {
      maxAge: 60*1000*30,// 设置到cookie里 时效30分钟
      httpOnly:true
  } )

  ctx.body = {
    url : captcha.data,
    code: captcha.text
  }
}

// 换头像
const uploadHeader = async ctx => {
  var user = await userfun.getUserByPhone( ctx.state.token.phone )
  user.headImg = "http://localhost:3000/public/articleImg/" + ctx.request.files[0].filename
  var save = await user.save()
  console.log( "保存了" )
  console.log( save )
  ctx.body = {
    headImg: "http://localhost:3000/public/articleImg/" + ctx.request.files[0].filename
  }
}

// 修改基础信息
const modificationData = async ctx => {
  const data = ctx.request.body
  var user = await userfun.getUserByPhone( ctx.state.token.phone )
  user.user_name = data.user_name
  user.signature = data.signature
  user.introduce = data.introduce
  user.work = data.work
  console.log( "保存了" )
  console.log( save )
  ctx.body = {
    msg: "修改成功了-----"
  }
}

// 通过电话号码获取redis里面的值
function getRedisPhoneCode( phone ){
  return new Promise( ( res, rej ) => {
    redis.get( phone, ( err, data ) => {
      res( data )
    })
  })
}


module.exports = {
    login,
    setPhoneCode,
    captcha,
    rejester,
    autoLogin,
    loginByCode,
    uploadHeader,
    modificationData
}

