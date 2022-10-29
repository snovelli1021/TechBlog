//Handler used to create a comment
const newCommentHandler = async (event) => {
  event.preventDefault();
  console.log("hello");
  const commentBody = document.getElementById("commentBody").value;

  if (commentBody) {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ commentBody }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Adding a new comment failed.");
    }
  }
};

document
  .querySelector(".addCommentBtn")
  .addEventListener("submit", newCommentHandler);

//Handler used to delete a comment
const deleteCommentHandler = async (event) => {
  event.preventDefault();

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const response = await fetch(`/api/comments/${id}`, {
    method: "DELETE",
    body: JSON.stringify({
      comment_id: id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    console.log(err);
  }
};

document
  .querySelector(".commentDeleteBtn")
  .addEventListener("delete", deleteCommentHandler);
