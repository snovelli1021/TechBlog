const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

//Gets all the post data.
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["email"],
        },
      ],
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    console.log(posts);
    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Displays the post and comment data on the dashboard.
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: { userId: req.session.user_id },
    });
    const commentData = await Comment.findAll({
      commentBody: req.body.commentBody,
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    const comments = commentData.map((comment) => comment.get({ plain: true }));
    console.log(posts, comments);
    res.render("dashboard", { posts, comments });
  } catch (error) {}
});

//Displays the posts on your homepage.
router.get("/homepage", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: { userId: req.session.user_id },
    });
    const commentData = await Comment.findAll({
      commentBody: req.body.commentBody,
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    const comments = commentData.map((comment) => comment.get({ plain: true }));
    console.log(posts, comments);
    res.render("homepage", { posts, comments });
  } catch (error) {}
});

module.exports = router;
