const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const jwt = require( "koa-jwt" )
var cors = require('koa2-cors')


const index = require('./routes/index')
const auth = require('./routes/auth')
const article = require('./routes/article')


// error handler
onerror(app)

app.use( cors() )

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// Custom 401 handling if you don't want to expose koa-jwt errors to users
app.use(function(ctx, next){
    return next().catch((err) => {
        if (401 == err.status) {
            ctx.status = 401;
            ctx.body = 'Protected resource, use Authorization header to get access\n';
        } else {
            throw err;
        }
    });
});

app.use( jwt({
    secret: "tan",
    key: "token",                       // ctx.state.token来拿取token的数据
    // passthrough: true,                 // 始终能next，即使token错误
}).unless({
    path: [                           // 过滤的路径
        /^\/public/,
        /^\/auth\/login/,
        /^\/auth\/phoneCode/,
        /^\/auth\/captcha/,
        /^\/auth\/register/,
        /^\/article\/allowAllUpload/,
        /^\/$/
    ]
})
)

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(auth.routes(), auth.allowedMethods())
app.use(article.routes(), article.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
