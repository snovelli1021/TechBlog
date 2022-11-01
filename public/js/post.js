//Handler used to create a post
const postFormHandler = async (event) => {
  event.preventDefault();
  console.log("hello");
  const postTitle = document.querySelector("#post-title").value.trim();
  const postBody = document.querySelector("#post-body").value.trim();

  if (postTitle && postBody) {
    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({ postTitle, postBody }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Adding a new post failed.");
    }
  }
};

//Handler used to delete a post
const deletePostHandler = async (event) => {
  event.preventDefault();
  console.log(event.target.getAttribute("data-id"));
  const id = event.target.getAttribute("data-id");
  console.log(id);
  const response = await fetch(`/api/posts/${id}`, {
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

document
  .querySelector(".post-form")
  .addEventListener("submit", postFormHandler);

document.querySelectorAll(".form2").forEach((item) => {
  item.addEventListener("submit", deletePostHandler);
});
