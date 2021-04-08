const { User } = require('../models');

const UserData = [
    {
     username: "RenaheartBears",
     password: "p@assword1",
    },

    {
        username: "Art_Rocks",
        password: "p@assword2",
    },
    {
        username: "Dobinator",
        password: "p@assword3",
    },
    {
        username: "SassyCass",
        password: "p@assword4",

    }, 
    {
        username: "Reader_X",
        password: "p@assword5",

    },
    {
        username: "Manu_S",
        password: "p@assword6",

    }

]

const seedUsers = () => User.bulkCreate(userData, {individualHooks: true});
module.exports = seedUsers; 