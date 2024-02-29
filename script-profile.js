const params = new URLSearchParams(window.location.search);
console.log(params);

const paramId = params.get("id");
const paramPhotographer = params.get("photographer");
const paramTitle = params.get("title");
const paramImg = params.get("img");
const paramColor = params.get("color");
console.log(paramColor);

function createProfile() {
  let img = document.getElementById("img-profile");
  img.src = paramImg;

  console.log(paramImg);

  let container = document.getElementById("container-description");

  let photographer = document.createElement("p");
  photographer.classList.add("lead", "text-start");
  photographer.innerText = paramPhotographer;

  let title = document.createElement("h1");
  title.classList.add("jumbotron-heading");
  title.innerText = paramTitle;

  let id = document.createElement("small");
  id.classList.add("text-end", "d-block", "mt-4");
  id.innerText = "ID: " + paramId;

  container.append(photographer, title, id);
}

createProfile();

// function bgColor() {
//   let body = document.querySelector("body");
//   body.style = `background-color: #${paramColor};`;
// }

// bgColor();
