const { Model, DataTypes} = require("sequelize");
const sequelize = require("../config/connection.js");

class Post extends Model {}

Post.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.BOOLEAN,
    }, 
    body: DataTypes.TEXT,
  },

  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "post",
  }
);

module.exports = Post;
