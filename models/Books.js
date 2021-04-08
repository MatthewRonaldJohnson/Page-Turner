const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection.js");

class Books extends Model {}

Books.init(
  {
    isbn: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cover_img_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "books",
  }
);

module.exports = Books;
