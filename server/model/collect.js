const Sequelize = require("sequelize")



module.exports = ( sequelize, DataTypes ) => {
  class Collect extends Sequelize.Model{}

  Collect.init({

  },{
      sequelize,
      timestamps: true,
      paranoid: true,
      updatedAt: false,
      underscored: true,
      comment: "我是收藏的表"
  })
  
  return Collect
}



