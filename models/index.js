const User = require("./user");
const Post = require("./post");
const Comment = require("./comment");

//Defining Import Methods
Post.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

User.hasMany(Post, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Comment.belongsTo(Post, {
  foreignKey: "commentPostId",
  onDelete: "CASCADE",
});

Post.hasMany(Comment, {
  foreignKey: "commentPostId",
  onDelete: "CASCADE",
});

Comment.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

User.hasMany(Comment, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

module.exports = { User, Post, Comment };
