const router = require("express").Router();
const { Post } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  try {
    const post = await Post.create({
      postTitle: req.body.postTitle,
      postBody: req.body.postBody,
      userId: req.session.user_id,
    });
    res.json({ post, message: "Your post has been created." });
  } catch (error) {
    res.status(500).json({ message: "Your post failed to create." });
    return;
  }
});

module.exports = router;
