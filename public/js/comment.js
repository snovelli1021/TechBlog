//Handler used to create a comment
const newCommentHandler = async (event) => {
  event.preventDefault();
  console.log("hello");
  const id = event.target.getAttribute("data-id");
  const commentBody = document.getElementById(`commentBody${id}`).value;

  if (commentBody) {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ commentBody, commentPostId: id }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Adding a new comment failed.");
    }
  }
};

//Handler used to delete a comment
const deleteCommentHandler = async (event) => {
  event.preventDefault();
  const id = event.target.getAttribute("data-id");
  console.log(id);
  const response = await fetch(`/api/comments/${id}`, {
    method: "DELETE",
    body: JSON.stringify({
      id: id,
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

document.querySelectorAll(".newComment-form").forEach((item) => {
  item.addEventListener("submit", newCommentHandler);
});

document.querySelectorAll(".deleteComment").forEach((item) => {
  item.addEventListener("submit", deleteCommentHandler);
});
