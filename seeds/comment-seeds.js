const { Comment } = require('../models');

const commentData = [
    {
        user_id:1,
        post_id: 5, 
        body: "This book really is a wonderful read and the characters are delightful. I spend several weekend days curled up with it and escaped."
    },
    {
        user_id: 2,
        post_id: 1,
        body: " Love it (except a few scenes - no spoilers)."
    },
    {
        user_id: 3,
        post_id: 2,
        body: "This was a quick reread for me. Enjoyed it as much the second go-around as the first.",
    }, 
    {
        user_id: 4,
        post_id: 4, 
        body: "4.5*"

    },
    {
        user_id: 5,
        post_id: 3,
        body: "An eye opening and inspiring story."
    },
    {
        user_id: 6,
        post_id: 6,
        body: "I've binge read it!"  
    },
  
]


const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment; 