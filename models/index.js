const User = require("./user");
const Post = require("./post");
const Comment = require("./comment");

//Defining Import Methods
Post.belongsTo(User, {
  foreignKey: "userId",
});

User.hasMany(Post, {
  foreignKey: "userId",
});

Comment.belongsTo(Post, {
  foreignKey: "commentPostId",
});

Post.hasMany(Comment, {
  foreignKey: "commentPostId",
});

Comment.belongsTo(User, {
  foreignKey: "userId",
});

User.hasMany(Comment, {
  foreignKey: "userId",
});

module.exports = { User, Post, Comment };
