const { User } = require('../models');

const userData = [
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

const seedUser = () => User.bulkCreate(userData, {individualHooks: true});
module.exports = seedUser; 