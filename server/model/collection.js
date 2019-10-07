const Sequelize = require("sequelize")



module.exports = ( sequelize, DataTypes ) => {
  class Collection extends Sequelize.Model{}

  Collection.init({
      name: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      headImg: {
        type: DataTypes.STRING,
        defaultValue: "http://curtaintan.club/headImg/1549358122065.jpg"
      },
      introduce: {
        type: DataTypes.STRING
      }
  },{
      sequelize,
      timestamps: true,
      paranoid: true,
      updatedAt: false,
      underscored: true,
      deletedAt: "destroyTime",
      comment: "我是收藏夹表"
  })
  
  return Collection
}



