const Sequelize = require("sequelize")

module.exports = ( sequelize, DataTypes ) => {
    class User extends Sequelize.Model{}
    User.init({
        user_name: {
            type: DataTypes.STRING(32),
            allowNull: false,
        },
        psw: {
            type: DataTypes.STRING(64),
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING(32),
            allowNull: false,
            unique: true,
            validate: {
                isEven( value ){
                    if( /^[1][345789][0-9]{9}$/.test( value ) ){
                        
                    } else {
                        throw new Error("电话号码不符合标准")
                    }
                }
            }
        },
        admin: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        signature: DataTypes.STRING,
        msg: { 
            type:DataTypes.INTEGER,
            defaultValue: 0
        },
        headImg: {
            type: DataTypes.STRING,
            defaultValue: "http://curtaintan.club/headImg/1549358122065.jpg"
        },
        bg: DataTypes.STRING,
        introduce: DataTypes.STRING,
        work: DataTypes.STRING,
    }, {
        sequelize,
        timestamps: true,
        paranoid: true,
        underscored: true,
        updatedAt: false,
        deletedAt: "destroyTime",
        comment: "我是user表"
    })
    return User
}

