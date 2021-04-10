const { User } = require('../models');

const userData = [
    {
     username: "RenaheartBears",
     password: "p@assword1",
     bio: "Rena owns a used bookstore in downtown Hanover. She enjoys poetry and fiction.",
    
    },

    {
        username: "Art_Rocks",
        password: "p@assword2",
        bio: "Sarah is a practicing artist and a high school art teacher, who likes to listen to her favorite books by checking them out on Libby.",
    },  
    {
        username: "Dobinator",
        password: "p@assword3",
        bio: "Emily likes nonfiction travel and humor books. She is also a fan of walking down the library aisle and picking a random book of the shelves.", 
       
    },
    {
        username: "SassyCass",
        password: "p@assword4",
        bio: "Cassandra likes to break records with her reading, 250 books last year! AND, she's a new mom... What can't she do?",
    },   
    {
        username: "Reader_X",
        password: "p@assword5",
        bio: "DeVaughn likes to read historical fiction, especially anything that has zombies or witches.",
    
    },
    {
        username: "Manu_S",
        password: "p@assword6",
        bio: "Manjur likes to read mystery and detective novels- and thinks more often than not, that the books are way better than the tv series or movies.", 
    },    

]

const seedUser = () => User.bulkCreate(userData, {individualHooks: true});
module.exports = seedUser; 