document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector("#All_post")
    .addEventListener("click", () => loadpost("posts"));

  // document
  //   .querySelector("#follow")
  //   .addEventListener("click", () => loadpost("Following"));

  document
    .querySelector("#compose-post")
    .addEventListener("submit", submitpost);

  loadpost("posts");
});

function loadpost(post) {
  // document.querySelector("#post").innerHTML = post;
  compost_post();
  fetch("/" + post)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((post) => {
        console.log(post.id);
        let view = document.querySelector("#post");
        const pos = document.createElement("div");
        pos.innerHTML = `<div class = 'post' >
        <a href = "" class = "userid">
        <strong>${post.user}</strong>
        </a>
        <br />
        ${post.post}
        <br />
        <br />
        ${post.date}
        </div>`;
        view.append(pos);
      });
    });
}

function compost_post() {
  document.querySelector("#textbox").value = "";
}

function submitpost(event) {
  event.preventDefault();
  console.log(document.querySelector("#textbox").value);
  fetch("/compose", {
    method: "POST",
    body: JSON.stringify({
      post: document.querySelector("#textbox").value,
    }),
  }).then((response) => {
    loadpost("posts");
  });
}
