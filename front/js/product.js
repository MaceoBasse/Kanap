function getProduct() {
  var str = document.URL;
  var url = new URL(str);
  var search_params = new URLSearchParams(url.search);
  if (search_params.has("id")) {
    var ProductUrl =
      "http://localhost:3000/api/products/" + search_params.get("id");
    // console.log(ProductUrl);
  }
  fetch(ProductUrl)
    .then(function (res) {
      return res.json();
    })
    .catch((error) => {
      let productsContainer = document.querySelector(".item");
      productsContainer.innerHTML =
        "Nous n'avons pas réussi à afficher les canapés";
      productsContainer.style.textAlign = "center";
      productsContainer.style.padding = "30vh 0";
    })

    // DOM
    .then(function (resultatAPI) {
      const articles = resultatAPI;
      //   console.log(articles);
      let productImg = document.createElement("img");
      document.querySelector(".item__img").appendChild(productImg);
      productImg.src = articles.imageUrl;
      productImg.alt = articles.altTxt;

      let productTitle = document.getElementById("title");
      productTitle.innerHTML = articles.name;

      let productPrice = document.getElementById("price");
      productPrice.innerHTML = articles.price;

      let productDescription = document.getElementById("description");
      productDescription.innerHTML = articles.description;

      select = document.getElementById("colors");
      for (let index in articles.colors) {
        // console.log(articles.colors[index]);
        i = articles.colors[index];
        var opt = document.createElement("option");
        opt.value = i;
        opt.innerHTML = i;
        select.appendChild(opt);
      }

      const btn = document.getElementById("addToCart");
      btn.addEventListener("click", (e) => {
        // console.log(`Button is clicked!`);

        const choixFormulaire = select.value;
        // console.log(choixFormulaire);

        quantity = document.getElementById("quantity");
        const quantitéFormulaire = quantity.value;
        // console.log(quantitéFormulaire);
        if (quantitéFormulaire == 0) {
          alert("Tu n'a pas choisi la quantité");
        } else if (choixFormulaire == "") {
          alert("Tu n'a pas choisi la couleur");
        } else {
          let optionsProduit = {
            nomProduit: articles.name,
            id_Produit: articles._id,
            option_produit: choixFormulaire,
            quantité: quantitéFormulaire,
            prix: articles.price,
            Produit_img: articles.imageUrl,
            Produit_alt: articles.altTxt,
          };
          console.log(optionsProduit);
          // Local Storage
          const popupConfirmation = () => {
            if (
              window.confirm(`Votre commande de ${quantitéFormulaire} ${articles.name} ${choixFormulaire} est ajoutée au panier
Pour consulter votre panier, cliquez sur OK`)
            ) {
              window.location.href = "cart.html";
            }
          };

          let ProduitEnregistrelocalstrorage = JSON.parse(
            localStorage.getItem("produit")
          );
          console.log(ProduitEnregistrelocalstrorage);
          // si il y deja des produit dans le localSTorage
          if (ProduitEnregistrelocalstrorage) {
            const productFind = ProduitEnregistrelocalstrorage.find(
              (el) =>
                el.id_Produit === articles._id &&
                el.option_produit === choixFormulaire
            );
            if (productFind) {
              console.log("il y a déja ce produit");
              console.log(productFind);
              let newQuantity =
                parseInt(optionsProduit.quantité) +
                parseInt(productFind.quantité);
              productFind.quantité = newQuantity;
              console.log(productFind.quantiteProduit);
              localStorage.setItem(
                "produit",
                JSON.stringify(ProduitEnregistrelocalstrorage)
              );
              console.table(ProduitEnregistrelocalstrorage);
              popupConfirmation();
            } else {
              console.log("il n'y a pas deux fois le meme produit");
              ProduitEnregistrelocalstrorage.push(optionsProduit);
              localStorage.setItem(
                "produit",
                JSON.stringify(ProduitEnregistrelocalstrorage)
              );
              console.table(ProduitEnregistrelocalstrorage);
              popupConfirmation();
            }

            // si il n'y a pas de produit dans le localSTorage
          } else {
            ProduitEnregistrelocalstrorage = [];
            ProduitEnregistrelocalstrorage.push(optionsProduit);
            localStorage.setItem(
              "produit",
              JSON.stringify(ProduitEnregistrelocalstrorage)
            );
            // console.log(ProduitEnregistrelocalstrorage);
            // window.alert("Votre canapé a bien été ajouté au panier.");
          }
        }
      });
    });
}
getProduct();
