const Sequelize = require("sequelize")


module.exports = ( sequelize, DataTypes ) => {
    class Article extends Sequelize.Model{}

    Article.init({
        title: {
            type: DataTypes.STRING(64),
            allowNull: false,
        },
        caogao: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        titleImage: {
            type: DataTypes.STRING,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        label: {
            type: DataTypes.STRING(34),
            allowNull: false
        },
    },{
        sequelize,
        timestamps: true,
        paranoid: true,
        underscored: true,
        updatedAt: false,
        deletedAt: "destroyTime",
        comment: "我是文章表"
    })
    
    return Article
}


