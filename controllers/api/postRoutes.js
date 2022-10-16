const router = require("express").Router();
const { Post } = require("../../models");
const withAuth = require("../../utils/auth");

//Creates a blog post
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

//Edits a blog post
router.put("/:id", withAuth, (req, res) => {
  Post.update(
    {
      postTitle: req.body.postTitle,
      postBody: req.body.postBody,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((editPost) => {
      if (!editPost) {
        res
          .status(404)
          .json({ message: "Please select a post with a valid id" });
        return;
      }
      res.json(editPost);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Deletes a blog post
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const deletePost = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deletePost) {
      res
        .status(404)
        .json({ message: "Please select a post with a valid Id." });
      return;
    }
    res.status(200).json(deletePost);
  } catch (error) {
    res.status(500).json(err);
  }
});

module.exports = router;
