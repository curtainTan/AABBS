const { User } = require("./index")


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



create()