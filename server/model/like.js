const Sequelize = require("sequelize")


module.exports = ( sequelize, DataTypes ) => {
    class Like extends Sequelize.Model{}

    Like.init({

    },{
        sequelize,
        timestamps: true,
        underscored: true,
        updatedAt: false,
        comment: "我是喜欢表"
    })

    return Like
}