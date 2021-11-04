main();

function main() {
  getArticles();
}

// Récupérer les data de l'api
function getArticles() {
  fetch("http://localhost:3000/api/products")
    .then(function (res) {
      return res.json();
    })
    .catch((error) => {
      let productsContainer = document.querySelector(".items");
      productsContainer.innerHTML =
        "Nous n'avons pas réussi à afficher les canapés";
      productsContainer.style.textAlign = "center";
      productsContainer.style.padding = "30vh 0";
    })

    // DOM
    .then(function (resultatAPI) {
      const articles = resultatAPI;
      console.log(articles);
      for (let article in articles) {
        let productLink = document.createElement("a");
        document.querySelector(".items").appendChild(productLink);
        productLink.href = `product.html?id=${resultatAPI[article]._id}`;

        let productArticle = document.createElement("article");
        productLink.appendChild(productArticle);

        let productImg = document.createElement("img");
        productArticle.appendChild(productImg);
        productImg.src = resultatAPI[article].imageUrl;
        productImg.alt = resultatAPI[article].altTxt;

        let productTitle = document.createElement("h3");
        productArticle.appendChild(productTitle);
        productTitle.classList.add("productName");
        productTitle.innerHTML = resultatAPI[article].name;

        let productDescription = document.createElement("p");
        productArticle.appendChild(productDescription);
        productDescription.classList.add("productDescription");
        productDescription.innerHTML = resultatAPI[article].description;
      }
    });
}
