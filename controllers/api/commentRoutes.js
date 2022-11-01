const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

//Gets all the comments
router.get("/", (req, res) => {
  Comment.findAll({})
    .then((dbCommentData) => res.json(dbCommentData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Creates a comment
router.post("/", withAuth, async (req, res) => {
  try {
    const comment = await Comment.create({
      commentBody: req.body.commentBody,
      userId: req.session.user_id,
      commentPostId: req.body.commentPostId,
    });
    res.json({ comment, message: "Your comment has been created." });
  } catch (error) {
    res.status(500).json({ message: "Your comment failed to create." });
    return;
  }
});

//Deletes a comment
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const deleteComment = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteComment) {
      res
        .status(404)
        .json({ message: "Please select a comment with a valid Id." });
      return;
    }
    res.status(200).json(deleteComment);
  } catch (error) {
    res.status(500).json(err);
  }
});

module.exports = router;
