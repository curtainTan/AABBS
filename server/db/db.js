const Sequelize = require("sequelize")
const mysqlConfig = require("./config")


const db = new Sequelize( mysqlConfig.dbname, mysqlConfig.uname, mysqlConfig.upwd, {
    host: mysqlConfig.host,
    dialect: mysqlConfig.dialect,
    pool: mysqlConfig.pool
} )


module.exports = db