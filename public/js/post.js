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
      alert("Failed to create post");
    }
  }
};

document
  .querySelector(".post-form")
  .addEventListener("submit", postFormHandler);

//Handler used to edit a post
const editPostHandler = async (event) => {
  event.preventDefault();

  const postNumber = specificId.innerHTML;
  const postTitle = document.querySelector("#post-title").value.trim();
  const postBody = document.querySelector("#post-body").value.trim();

  if (postTitle && postBody) {
    const response = await fetch(`/api/posts/${postNumber}`, {
      method: "PUT",
      body: JSON.stringify({ postTitle, postBody }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Editing your post has failed.");
    }
  }
};

document.querySelector(".post-form").addEventListener("edit", editPostHandler);

//Handler used to delete a post
const deletePostHandler = async (event) => {
  event.preventDefault();

  const postNumber = specificId.innerHTML;

  const response = await fetch(`/api/posts/${postNumber}`, {
    method: "DELETE",
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
  .addEventListener("delete", deletePostHandler);
