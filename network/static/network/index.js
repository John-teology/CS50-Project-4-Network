document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector("#all_post")
    .addEventListener("click", () => loadpost("posts"));

  // document
  //   .querySelector("#follow")
  //   .addEventListener("click", () => loadpost("Following"));

  document
    .querySelector("#compose-post")
    .addEventListener("submit", submitpost);

  document.querySelector("#profile").addEventListener("click", show_profile);
  loadpost("posts");
});

function loadpost(post) {
  document.querySelector("#input").style.display = "block";
  document.querySelector("#post").style.display = "block";
  document.querySelector("hr").style.display = "block";
  compost_post();
  fetch("/" + post)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((post) => {
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
  fetch("/compose", {
    method: "POST",
    body: JSON.stringify({
      post: document.querySelector("#textbox").value,
    }),
  }).then((response) => {
    loadpost("posts");
  });
}

function show_profile() {
  document.querySelector("#input").style.display = "none";
  document.querySelector("#post").style.display = "none";
  document.querySelector("hr").style.display = "none";
}
