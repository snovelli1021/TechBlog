const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    }).catch((err) => {
      res.json(err);
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

module.exports = router;
