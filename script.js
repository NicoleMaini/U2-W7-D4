// funzione create card

const createCard = array => {
  array.forEach(element => {
    const gridCard = document.getElementById("grid-card");

    let col = document.createElement("div");
    col.classList.add("col-md-4");

    let container = document.createElement("div");
    container.classList.add("card", "mb-4", "shadow-sm", "h-100");

    let divImg = document.createElement("div");
    divImg.style = "height: 20rem; overflow: hidden;";

    let link = document.createElement("a");
    link.href = "./profile.html";

    let img = document.createElement("img");
    img.classList.add("card-img-top", "object-fit-cover");
    img.style = "height: 100%; width: 100%";
    img.onclick = goToProfile;

    img.src = element.src.medium;
    img.alt = element.alt;

    let divBody = document.createElement("div");
    divBody.classList.add("card-body", "d-flex", "flex-column");

    let title = document.createElement("h5");
    title.classList.add("card-title");

    title.innerText = element.photographer;

    let description = document.createElement("p");
    description.classList.add("card-text", "my-auto");

    description.innerText = element.alt;

    let divBodyBtn = document.createElement("div");
    divBodyBtn.classList.add("d-flex", "justify-content-between", "align-items-center");

    let idImg = document.createElement("small");
    idImg.classList.add("text-muted");
    idImg.innerText = "ID: " + element.id;

    let divBtn = document.createElement("div");
    divBtn.classList.add("btn-group");

    let btnView = document.createElement("btn-view");
    btnView.classList.add("btn", "btn-m", "btn-outline-secondary");
    btnView.innerText = "View";

    let removeBtn = document.createElement("btn-edit");
    removeBtn.classList.add("btn", "btn-m", "btn-outline-secondary");
    removeBtn.innerText = "Hide";
    removeBtn.onclick = () => {
      col.remove(container);
    };

    divBtn.append(btnView, removeBtn);
    divBodyBtn.append(divBtn, idImg);
    divBody.append(title, description, divBodyBtn);
    link.appendChild(img);
    divImg.appendChild(link);
    container.append(divImg, divBody);
    col.appendChild(container);
    gridCard.appendChild(col);
  });
};

// funzione fetch

const URL = "https://api.pexels.com/v1/search?query=";

function callFetch(queryAdd) {
  return fetch("https://api.pexels.com/v1/search?query=" + queryAdd, {
    method: "GET",
    headers: { Authorization: "6A8vqeEytsBFL4XRGLCi7hENoQlptXrAiXTruOhbBaz5DgBHDPewBy17" },
  }).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      if (response.status === 400) {
        throw new Error("400 - Errore lato utente");
      }
      if (response.status === 404) {
        throw new Error("404 - Dato non trovato");
      }
      if (response.status === 400) {
        throw new Error("500 - Errore lato server");
      }

      throw new Error("Errore reperimento dati");
    }
  });
}

// btn

const btnFirst = document.getElementById("btn-first");
const btnSecond = document.getElementById("btn-second");

btnFirst.onclick = () => {
  callFetch("nature").then(imagesObj => {
    console.log(imagesObj);

    const images = imagesObj.photos;
    console.log(images);

    //creo le card

    createCard(images);
  });
};

btnSecond.onclick = () => {
  callFetch("city").then(imagesObj => {
    console.log(imagesObj);

    const images = imagesObj.photos;
    console.log(images);

    //creo le card

    createCard(images);
  });
};

// form

const form = document.querySelector("form");
const btnSearch = document.getElementById("btn-search");

btnSearch.onclick = () => {
  const input = document.querySelector("input").value;
  console.log(input);
  callFetch(input).then(imagesObj => {
    console.log(imagesObj);

    const images = imagesObj.photos;
    console.log(images);

    //creo le card

    const gridCard = document.getElementById("grid-card");
    gridCard.innerHTML = "";
    createCard(images);
  });
  form.reset();
};

// page

function goToProfile() {
  const params = new URLSearchParams(window.location.search);
  console.log(params);
  // const idProfile = params.get()
}
