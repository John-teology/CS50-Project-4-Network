document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector("#All_post")
    .addEventListener("click", () => loadpost("Post"));

  document
    .querySelector("#follow")
    .addEventListener("click", () => loadpost("Following"));

  loadpost("Post");
});

function loadpost(post) {
  // document.querySelector("#post").innerHTML = post;
  fetch("/" + post)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((post) => {
        console.log(post.id);
      });
    });

  document.querySelector("form").addEventListener("submit", () => {
    submitpost;
    return false;
  });
}

function submitpost() {
  // para bukas haha
  console.log("submit");
}
