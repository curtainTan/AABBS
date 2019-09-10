var config = {
    dbname: "seqdemo",
    uname: "root",
    upwd: "123456",
    host: "localhost",
    port: 3306,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
}



module.exports = config
