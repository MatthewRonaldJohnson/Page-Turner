const { Model, DataTypes} = require ('sequelize');
const sequelize= require('../config/connection.js');


class Books extends Model {}

Books.init(
{
    id:{
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false,
    }, 
    cover_img_url:{
      type: DataTypes.STRING,
      allowNull: false,

    }

},
{
    sequelize,


    modelName: 'books'


}

);

model.exports = Books;