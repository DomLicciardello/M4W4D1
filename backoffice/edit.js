const urlAPI = "https://striveschool-api.herokuapp.com/api/product/"
const tokenAPI = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ3YmVkNzg5Y2Y4ZDAwMTljZjRiYjciLCJpYXQiOjE3MDg2Mzc5MTEsImV4cCI6MTcwOTg0NzUxMX0.3UtaijYWeKW3YcwUzGIY2nhrzxu-n-MQQcDJYTPEk3Q"

let editProductArea = document.getElementById("editProductArea");

const editName = document.getElementById("editName");
const editDescription = document.getElementById("editDescription");
const editBrand = document.getElementById("editBrand");
const editPrice = document.getElementById("editPrice");
const editImg = document.getElementById("editImg")
const msgAlert = document.getElementById("msgAlert");
const msgCompleted = document.getElementById("msgCompleted");

const paramObj = new URLSearchParams(window.location.search);
const productId = paramObj.get("id");

window.onload = callProducts();

async function callProducts(){
    editProductArea.innerHTML="";
    try {
        const res = await fetch(urlAPI + productId, {
            method: "GET",
            headers: {
            "Authorization": tokenAPI,
            "Content-Type": "application/json"
            }
        })
        const json = await res.json();

        editName.value = json.name;
        editDescription.value = json.description;
        editBrand.value = json.brand;
        editPrice.value = json.price;
        editImg.value = json.imageUrl;

        let titlePreview = document.createElement("h5");
        titlePreview.innerText = "Anteprima del prodotto:";
        titlePreview.classList.add("mt-4", "mb-4", "col-12", "d-flex", "justify-content-center", "align-items-center");
        editProductArea.appendChild(titlePreview);

        let createDivCol = document.createElement("div");
        createDivCol.classList.add("col-12", "d-flex", "justify-content-center", "align-items-center");
        editProductArea.appendChild(createDivCol);

        let createDivCard = document.createElement("div");
        createDivCard.classList.add("cardProduct", "card");
        createDivCol.appendChild(createDivCard)

        let  createImg = document.createElement("img");
        createImg.setAttribute("src", editImg.value);
        createImg.classList.add("card-img-top");
        createDivCard.appendChild(createImg);

        let createDivInfo = document.createElement("div");
        createDivInfo.classList.add("card-body");
        createDivCard.appendChild(createDivInfo);

        let createTitle = document.createElement("h5");
        createTitle.innerText = editName.value;
        createTitle.classList.add("card_title");
        createDivInfo.appendChild(createTitle);

        let createDescription = document.createElement("p");
        createDescription.innerText = editDescription.value;
        createDescription.classList.add("card-description");
        createDivInfo.appendChild(createDescription);

        let createBrand = document.createElement("p");
        createBrand.innerText = "Brand: " + editBrand.value;
        createBrand.classList.add("card-text");
        createDivInfo.appendChild(createBrand);

        let createPrice = document.createElement("p");
        createPrice.innerText = "Prezzo: " + editPrice.value;
        createPrice.classList.add("card-text");
        createDivInfo.appendChild(createPrice);

        let titleMod = document.createElement("h5");
        titleMod.innerText = "Modifica il prodotto:";
        titleMod.classList.add("mt-5", "col-12", "d-flex", "justify-content-center", "align-items-center", "titleModStyle", "p-4");
        editProductArea.appendChild(titleMod);

    } catch (err) {
        console.log(err);
    }
};

async function editProduct() {
    if(editName.value && editDescription.value && editBrand.value && editPrice.value && editImg.value){
        try {
            let modProduct = { "name": editName.value, "description": editDescription.value, "brand": editBrand.value, "imageUrl": editImg.value, "price": editPrice.value };
            const res = await fetch(urlAPI + productId, {
                method: "PUT",
                body: JSON.stringify(modProduct),
                headers: {
                "Authorization": tokenAPI,
                "Content-type": "application/json"}});
                msgCompleted.classList.toggle("d-none");
                setTimeout(() => {
                    msgCompleted.classList.toggle("d-none");
                }, 5000);
                callProducts();
        } catch(err) {
            console.log(err);
        }
    } else {
        msgAlert.classList.toggle("d-none");
        setTimeout(() => {
            msgAlert.classList.toggle("d-none");
        }, 5000);
    }
}