const Sequelize = require("sequelize")


module.exports = ( sequelize, DataTypes ) => {
    class Discuss extends Sequelize.Model{}

    Discuss.init({
        content: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },{
        sequelize,
        sequelize,
        timestamps: true,
        underscored: true,
        updatedAt: false,
        comment: "我是评论表"
    })


    return Discuss
}


