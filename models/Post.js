const { Model} = require("sequelize");
const sequelize = require("../config/connection.js");

class Post extends Model {}

Post.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: DataTypes.STRING,
  },

  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "post",
  }
);

model.exports = Post;
