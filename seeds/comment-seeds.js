const { Comment } = require('../models');

const commentData = [
    {
        user_id:1,
        post_id: 5, 
        comment_text: "This book really is a wonderful read and the characters are delightful. I spend several weekend days curled up with it and escaped."
    },
    {
        user_id: 2,
        post_id: 1,
        comment_text: " Love it (except a few scenes - no spoilers)."
    },
    {
        user_id: 3,
        post_id: 2,
        comment_text: "This was a quick reread for me. Enjoyed it as much the second go-around as the first.",
    }, 
    {
        user_id: 4,
        post_id: 4, 
        comment_text: "4.5*"

    },
    {
        user_id: 5,
        post_id: 3,
        comment_text: "An eye opening and inspiring story."
    },
    {
        user_id: 6,
        post_id: 6,
        comment_text: "I've binge read it!"  
    },
  
]


const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment; 