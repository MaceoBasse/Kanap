main();

function main() {
  Display();
  Form();
}

function Display() {
  let ProduitEnregistrelocalstrorage;

  if (localStorage.getItem("produit")) {
    ProduitEnregistrelocalstrorage = JSON.parse(
      localStorage.getItem("produit")
    );
    let arrayQuantity = [];
    let arrayPrice = [];
    for (var i = 0; i < ProduitEnregistrelocalstrorage.length; i++) {
      // console.log(ProduitEnregistrelocalstrorage[i]);

      let productArticle = document.createElement("article");
      document.getElementById("cart__items").appendChild(productArticle);
      productArticle.dataset.id = ProduitEnregistrelocalstrorage[i].id_Produit;
      productArticle.classList.add("cart__item");

      let productCardItemImg = document.createElement("div");
      productArticle.appendChild(productCardItemImg);
      productCardItemImg.classList.add("cart__item__img");

      let productImg = document.createElement("img");
      productCardItemImg.appendChild(productImg);
      productImg.src = ProduitEnregistrelocalstrorage[i].Produit_img;
      productImg.alt = ProduitEnregistrelocalstrorage[i].Produit_alt;

      let cartItemContent = document.createElement("div");
      productArticle.appendChild(cartItemContent);
      cartItemContent.classList.add("cart__item__content");

      let carItemContentTitlePrice = document.createElement("div");
      cartItemContent.appendChild(carItemContentTitlePrice);
      carItemContentTitlePrice.classList.add("cart__item__content__titlePrice");

      let ProductName = document.createElement("h2");
      carItemContentTitlePrice.appendChild(ProductName);
      ProductName.innerHTML = ProduitEnregistrelocalstrorage[i].nomProduit;

      let ProductPrice = document.createElement("p");
      carItemContentTitlePrice.appendChild(ProductPrice);
      ProductPrice.innerHTML = ProduitEnregistrelocalstrorage[i].prix + " €";

      let carItemContentSettings = document.createElement("div");
      cartItemContent.appendChild(carItemContentSettings);
      carItemContentSettings.classList.add("cart__item__content__settings");

      let carItemContentSettingsQuantity = document.createElement("div");
      carItemContentSettings.appendChild(carItemContentSettingsQuantity);
      carItemContentSettingsQuantity.classList.add(
        "cart__item__content__settings__quantity"
      );

      let Quantité = document.createElement("p");
      carItemContentSettingsQuantity.appendChild(Quantité);
      Quantité.innerHTML = "Qté : ";

      let itemQuantity = document.createElement("input");
      carItemContentSettingsQuantity.appendChild(itemQuantity);
      itemQuantity.classList.add("itemQuantity");
      itemQuantity.type = "number";
      itemQuantity.name = "itemQuantity";
      itemQuantity.min = "1";
      itemQuantity.max = "100";
      itemQuantity.value = ProduitEnregistrelocalstrorage[i].quantité;

      let carItemContentSettingsDelete = document.createElement("div");
      carItemContentSettings.appendChild(carItemContentSettingsDelete);
      carItemContentSettingsDelete.classList.add(
        "cart__item__content__settings__delete"
      );

      let deleteItem = document.createElement("p");
      carItemContentSettingsDelete.appendChild(deleteItem);
      deleteItem.innerHTML = "Supprimer";
      deleteItem.classList.add("deleteItem");

      arrayQuantity.push(parseInt(ProduitEnregistrelocalstrorage[i].quantité));

      totalQuantité = arrayQuantity.reduce(function (a, b) {
        return a + b;
      });

      arrayPrice.push(
        parseInt(ProduitEnregistrelocalstrorage[i].prix) *
          parseInt(ProduitEnregistrelocalstrorage[i].quantité)
      );

      totalPrix = arrayPrice.reduce(function (a, b) {
        return a + b;
      });

      let totalQuantity = document.getElementById("totalQuantity");
      totalQuantity.innerHTML = totalQuantité;

      let totalPrice = document.getElementById("totalPrice");
      totalPrice.innerHTML = totalPrix;

      supprimerSelection = Array.from(document.querySelectorAll(".deleteItem"));
      let tab = [];
      // supprimer element
      for (let i = 0; i < supprimerSelection.length; i++) {
        supprimerSelection[i].addEventListener("click", () => {
          tab = ProduitEnregistrelocalstrorage;
          tab.splice([i], 1);
          console.log(tab);

          ProduitEnregistrelocalstrorage = localStorage.setItem(
            "produit",
            JSON.stringify(tab)
          );

          window.location.href = "cart.html";
        });
      }
      itemQuantity.addEventListener("change", function () {
        let r2 = itemQuantity.closest("article");
        console.log(r2.getAttribute("data-id"));
        dom_id = r2.getAttribute("data-id");
        for (let k = 0; k < ProduitEnregistrelocalstrorage.length; k++) {
          const produit = ProduitEnregistrelocalstrorage[k];
          console.log(produit.quantité);
          console.log(produit.id_Produit);
          if (dom_id == produit.id_Produit) {
            produit.quantité = itemQuantity.value;

            newQuantity = JSON.stringify(ProduitEnregistrelocalstrorage);
            localStorage.setItem("produit", newQuantity);

            window.location.href = "cart.html";
          }
        }
      });
    }
  } else {
    ProduitEnregistrelocalstrorage = [];
    console.log("il n'y as pas de produit dans le panier");
  }
}
function Form() {
  let inputName = document.querySelector("#firstName");
  let inputLastName = document.querySelector("#lastname");
  let inputAdress = document.querySelector("#adress");
  let inputCity = document.querySelector("#city");
  let inputMail = document.querySelector("#email");
  let erreur = document.querySelector(".erreur");
  const submit = document.querySelector("#firstNameErrorMsg");

  submit.addEventListener("click", (e) => {
    let produitAchete = [];
    produitAchete.push(
      (ProduitEnregistrelocalstrorage = JSON.parse(
        localStorage.getItem("produit")
      ))
    );
    const order = {
      contact: {
        firstName: inputName.value,
        lastName: inputLastName.value,
        city: inputCity.value,
        address: inputAdress.value,
        email: inputMail.value,
      },
      produit: produitAchete,
    };

    // requete post
    let totalPrice = document.getElementById("totalPrice");
    totalPrice.innerHTML = totalPrix;
    console.log(totalPrix);

    const options = {
      method: "POST",
      body: JSON.stringify(order),
      headers: { "Content-Type": "application/json" },
    };

    fetch("http://localhost:3000/api/order", options)
      .then((response) => response.json())
      .then((data) => {
        localStorage.clear();
        console.log(data);
        localStorage.setItem("orderId", data.orderId);
        localStorage.setItem("total", totalPrix);

        //  document.location.href = "confirmation.html";
      })
      .catch((err) => {
        alert("Il y a eu une erreur : " + err);
      });
  });
}
