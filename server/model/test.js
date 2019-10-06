const { User, Article } = require("./index")


var create = () => {
    // console.log( "数据表结构" )
    // console.dir( User )
    User.create({
        user_name: "yu",
        psw: "yu",
        phone: "13882628313",
        admin: 3
    }).then( res => {
        console.log( "-数据创建---创建成功---" )
        console.log( res );
    }).catch( err => {
        console.log( "出错了" )
        console.log( err.fields )
        if( err.fields.phone ){
            // 电话号码重复
        }
        // console.log( "-----dir错误------" )
        // console.dir( err )
    } )
}

// create()



var arAndUser = async () => {
    const user = await User.findByPk(1)
    const article = await Article.create({
        title: "我是标题22",
        content: "我是内容，测试22",
        label: "css"
    })
    const adduser = await article.setUser( user )
    console.log( adduser )
    console.log( "-数据创建---创建成功---" )
    console.log( article )
}

// arAndUser()


var search = async () => {
    // const user = await User.findByPk(1)
    // const art = await user.getArticle()
    const data = await Article.findAll({
        include: [{
            model: User,
            where: { id: 1 }
        }]
    })
    console.log( "-数据查询成功---" )
    // console.log( data )
    console.log( data[0].User )
}

// search()

var addDiscuss = async () => {
    
}


// 测试软删除一篇文章

var testDelete = async () => {
  console.log( "开始了---" )
  var art = await Article.findByPk( 1 )
  var res = await art.destroy()
  console.log( "删除成功----" )
  console.log( res )
}


testDelete()
