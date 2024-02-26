const urlAPI = "https://striveschool-api.herokuapp.com/api/product/"
const tokenAPI = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ3YmVkNzg5Y2Y4ZDAwMTljZjRiYjciLCJpYXQiOjE3MDg2Mzc5MTEsImV4cCI6MTcwOTg0NzUxMX0.3UtaijYWeKW3YcwUzGIY2nhrzxu-n-MQQcDJYTPEk3Q"

let productArea = document.getElementById("productArea");

const paramObj = new URLSearchParams(window.location.search);
const productId = paramObj.get("id");

window.onload = callProducts();

async function callProducts(){
    try {
        const res = await fetch(urlAPI + productId, {
            method: "GET",
            headers: {
            "Authorization": tokenAPI,
            "Content-Type": "application/json"
            }
        })
        const json = await res.json();
        showDescription(json);
    } catch (err) {
        console.log(err);
    }
};

function showDescription({ name, description, imageUrl, price, brand }){
    productArea.innerHTML= `
    <div class="card mb-3 col-12 m-5">
    <div class="row g-0">
      <div class="col-xl-4 d-flex justify-content-center align-items-center">
        <img src="${imageUrl}" class="img-fluid rounded-start style_img_prod" alt="product_img"/>
      </div>
      <div class="col-xl-8">
        <div class="card-body">
          <h1 class="card-title">${name}</h1>
          <p class="card-text" style="font-size:20px">${description}</p>
          <p class="card-text"><small class="text-muted">Brand: ${brand}</small></p>
          <p class="card-text">Prezzo: ${price}€</p>
          <button type="button" class="btn btn-dark">Acquista</button>
        </div>
      </div>
    </div>
    </div>`

}

