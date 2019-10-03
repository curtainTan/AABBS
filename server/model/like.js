const Sequelize = require("sequelize")


module.exports = ( sequelize, DataTypes ) => {
    class Like extends Sequelize.Model{}

    Like.init({
      phoneAndArticle: {
        type: DataTypes.STRING(56),
        allowNull: false
      }
    },{
        sequelize,
        timestamps: true,
        underscored: true,
        updatedAt: false,
        comment: "我是喜欢表"
    })

    return Like
}