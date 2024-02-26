const urlAPI = "https://striveschool-api.herokuapp.com/api/product/"
const tokenAPI = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ3YmVkNzg5Y2Y4ZDAwMTljZjRiYjciLCJpYXQiOjE3MDg2Mzc5MTEsImV4cCI6MTcwOTg0NzUxMX0.3UtaijYWeKW3YcwUzGIY2nhrzxu-n-MQQcDJYTPEk3Q"

let productsArea = document.getElementById("productsArea");

window.onload = callProducts();

async function callProducts(){
    try {
        const res = await fetch(urlAPI, {
            method: "GET",
            headers: {
            "Authorization": tokenAPI,
            "Content-Type": "application/json"
            }
        })
        const json = await res.json();
        json.forEach((card) => {
            showProducts(card);
        });
    } catch (err) {
        console.log(err);
    }
};

function showProducts({ _id, name, description, imageUrl, price, brand }) {

        let createDivCol = document.createElement("div");
        createDivCol.classList.add("col-xl-3", "col-lg-4", "col-md-4", "col-sm-6", "col-6", "mb-4");
        productsArea.appendChild(createDivCol);

        let createDivCard = document.createElement("div");
        createDivCard.classList.add("cardProduct", "card");
        createDivCol.appendChild(createDivCard)

        let  createImg = document.createElement("img");
        createImg.setAttribute("src", imageUrl);
        createImg.classList.add("card-img-top");
        createDivCard.appendChild(createImg);

        let createDivInfo = document.createElement("div");
        createDivInfo.classList.add("card-body");
        createDivCard.appendChild(createDivInfo);

        let createTitle = document.createElement("h5");
        createTitle.innerText = `${name}`;
        createTitle.classList.add("card_title");
        createDivInfo.appendChild(createTitle);

        let createDescription = document.createElement("p");
        createDescription.innerText = `${description}`;
        createDescription.classList.add("card-description");
        createDivInfo.appendChild(createDescription);

        let createBrand = document.createElement("p");
        createBrand.innerText = `Brand: ${brand}`;
        createBrand.classList.add("card-text");
        createDivInfo.appendChild(createBrand);

        let createPrice = document.createElement("p");
        createPrice.innerText = `Prezzo: ${price}€`;
        createPrice.classList.add("card-text");
        createDivInfo.appendChild(createPrice);

        let createShopButton = document.createElement("a");
        createShopButton.innerText = `Acquista`;
        createShopButton.classList.add("btn", "btn-dark", "me-1", "mb-1");
        createDivInfo.appendChild(createShopButton);

        let createDescButton = document.createElement("a");
        createDescButton.innerText = `Descrizione`;
        createDescButton.classList.add("btn", "btn-secondary", "mb-1");
        createDescButton.href = `description/description.html?id=${_id}`;
        createDivInfo.appendChild(createDescButton);
};