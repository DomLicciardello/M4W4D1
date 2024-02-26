const urlAPI = "https://striveschool-api.herokuapp.com/api/product/"
const tokenAPI = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ3YmVkNzg5Y2Y4ZDAwMTljZjRiYjciLCJpYXQiOjE3MDg2Mzc5MTEsImV4cCI6MTcwOTg0NzUxMX0.3UtaijYWeKW3YcwUzGIY2nhrzxu-n-MQQcDJYTPEk3Q"

let productsArea = document.getElementById("productsArea");

window.onload = callProducts();

async function callProducts(){
    productsArea.innerHTML = "";
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

        let createDivCard = document.createElement("div");
        createDivCard.classList.add("cardProduct", "card", "m-2");
        productsArea.appendChild(createDivCard);

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

        let createEditButton = document.createElement("a");
        createEditButton.innerText = `Modifica`;
        createEditButton.classList.add("btn", "btn-primary", "me-1");
        createEditButton.href = `edit.html?id=${_id}`
        createDivInfo.appendChild(createEditButton);

        let createDeletButton = document.createElement("a");
        createDeletButton.innerText = `Elimina`;
        createDeletButton.classList.add("btn", "btn-danger");
        createDeletButton.addEventListener("click", () => {
            deleteProduct(_id);
        });
        createDivInfo.appendChild(createDeletButton);
};

let productName = document.getElementById("productName");
let productDescription = document.getElementById("productDescription");
let productBrand = document.getElementById("productBrand");
let productPrice = document.getElementById("productPrice");
let productImg = document.getElementById("productImg");
let alertMsg = document.getElementById("alertMsg");
let completedMsg = document.getElementById("completedMsg");

async function newProduct() {
    if(productName.value && productDescription.value && productBrand.value && productImg.value && productPrice.value) {
        let newProduct = { "name": productName.value, "description": productDescription.value, "brand": productBrand.value, "imageUrl": productImg.value, "price": productPrice.value };
    
        try {
            const res = await fetch(urlAPI, {
                method: "POST",
                body: JSON.stringify(newProduct),
                headers: {
                "Authorization": tokenAPI,
                "Content-type": "application/json"}}); 
            callProducts();
            productName.value = "";
            productDescription.value = "";
            productBrand.value = "";
            productImg.value = "";
            productPrice.value = "";
            completedMsg.classList.toggle("d-none");
            setTimeout(() => {
                completedMsg.classList.toggle("d-none");
            }, 5000);
        } catch(error) {
            console.log(error);
        }
    } else {
        alertMsg.classList.toggle("d-none");
        setTimeout(() => {
            alertMsg.classList.toggle("d-none");
        }, 5000);
    }
}

async function deleteProduct(id) {
    const res = await fetch(urlAPI + id, {
            method: "DELETE",
            headers: {
            "Authorization": tokenAPI,
            "Content-type": "application/json"}});
    callProducts();
    completedMsg.classList.toggle("d-none");
    setTimeout(() => {
        completedMsg.classList.toggle("d-none");
    }, 5000);
}