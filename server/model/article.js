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
        brief:{
          type: DataTypes.STRING(256),
        },
        artType: {
          type: DataTypes.STRING(34),
          allowNull: false
        },
        mdContent: {
          type: DataTypes.TEXT,
        }
    },{
        sequelize,
        timestamps: true,
        paranoid: true,
        updatedAt: false,
        underscored: true,
        comment: "我是文章表"
    })
    
    return Article
}


