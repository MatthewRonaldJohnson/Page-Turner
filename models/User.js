const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      alllowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
    profile_pic: {
      type: DataTypes.STRING,
      defaultValue: "https://res.cloudinary.com/dh5xladkz/image/upload/v1618078037/Page-Turner/default-profile_bfibgv.png",
    },
    bio: {
      type: DataTypes.TEXT
    }
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        console.log('hit==========================================================================================================================')
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (newUserData) => {
        console.log('hit==========================================================================================================================')
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "User",
  }
);

module.exports = User;