const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");
const Books = require("./Books");

User.hasMany(Post,{
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Post.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

User.hasMany(Comment,{
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Books.hasMany(Post,{
  foreignKey: "book_isbn",
});

Post.belongsTo(Books, {
  foreignKey: "book_isbn", 
}); 

Post.hasMany(Comment, {
  foreignkey: "post_id",
}); 
Comment.belongsTo(Post, {
  foreignKey: "post_id",
}); 

model.exports = { User, Post, Comment, Books };
