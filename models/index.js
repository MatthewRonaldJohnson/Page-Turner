const User = require ('./User');
const Post = require ('./Post');
const Comment = require ('./Comment');
const Books = require ('./Books');

User.hasMany(Post, Comment, {
    foreignKey: 'user_id',
    onDelete: "CASCADE"
});


Post.belongsTo(User, {
 foreignKey: 'user_id'
});

Comment.hasMany(   {
foreignKey: 


}); 

Books.





model.exports = { User, Post, Comment, Books };