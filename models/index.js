const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");
const Books = require("./Books");

User.hasMany(Post, Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Post.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Post.belongsTo(User, {
  foreignKey: "user_id",
});

Comment.hasMany(User, {
  foreignKey: "user_id",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});
Books.hasMany(User, Comment, {
  foreignKey: "user_id",
});

model.exports = { User, Post, Comment, Books };
