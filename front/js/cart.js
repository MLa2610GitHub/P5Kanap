/* COMMENT AFFICHER UN TABLEAU RECAPITULATIF DES ACHATS DANS LA   PAGE PANIER*/
console.log("connecté");

//FONCTIONS

// Enregistrer un panier dans localStorage
function saveBasket(basket) {
  localStorage.setItem("basket", JSON.stringify(basket));
}

// Récupérer un panier dans localStorage
function getBasket() {
  let basket = localStorage.getItem("basket");
  if (basket == null) {
    return [];
  } else {
    return JSON.parse(basket);
  }
}

// Calculer le nombre de produits qu’il y a dans un panier
function getNumberProduct() {
  let basket = getBasket();
  let number = 0;
  for (let product of basket) {
    number += product.quantity;
  }
  return number;
}

//RECUPERER LE PANIER DANS LOCAL STORAGE
//Parse convertit les données JSON en objet JavaScript
let basket = JSON.parse(localStorage.getItem("basket"));
console.log(basket);
let total = 0;

//PARCOURIR LE PANIER (ARRAY)
// Création d'une boucle pour parcourir le panier
for (let item of basket) {
  let itemId = item.id;
  let itemColor = item.color;
  let itemQuantity = item.quantity;

  console.log(basket);

  //CREER ET INSERER DES ELEMENTS DANS LA PAGE
  //Récuperation des infos API pour affichage produits
  async function getResponseApi(itemId) {
    const responseJSON = await fetch(
      "http://localhost:3000/api/products/" + itemId
    );
    //promesse et attente de réponse

    const response = await responseJSON.json();
    console.log(response, "objet Javascript");

    //Injection des infos dans la page

    //Création de la balise article et insertion dans balise section
    let productArticle = document.createElement("article");
    document.querySelector("#cart__items").appendChild(productArticle);
    productArticle.className = "cart__item";
    productArticle.setAttribute("data-id", itemId);
    productArticle.setAttribute("data-color", itemColor);

    //<div class"cart__item__img>
    let divImg = document.createElement("div");
    productArticle.appendChild(divImg);
    divImg.className = "cart__item__img";

    //<img>
    let productImg = document.createElement("img");
    divImg.appendChild(productImg);
    productImg.src = response.imageUrl;
    productImg.alt = response.altTxt;

    //<div class="cart__item__content">
    let divProductData = document.createElement("div");
    productArticle.append(divProductData);
    divProductData.className = "cart__item__content";

    //<div class="cart__item__content__description">
    let divProductDescription = document.createElement("div");
    divProductData.appendChild(divProductDescription);
    divProductDescription.className = "cart__item__content__description";

    //balise <h2> nom du produit
    let productName = document.createElement("h2");
    divProductDescription.append(productName);
    productName.innerText = response.name;

    //Affichage de la couleur du produit
    let productColor = document.createElement("p");
    divProductDescription.append(productColor);
    productColor.innerHTML = "Couleur : " + itemColor;

    //affichage du prix d'un produit
    let productPrice = document.createElement("p");
    divProductDescription.append(productPrice);
    productPrice.id = "unitPrice";
    productPrice.innerHTML = "Prix : " + response.price + " €";
    let unitPrice = response.price;
    total += unitPrice * itemQuantity;

    //<div class="cart__item__content__settings">
    let divProductSettings = document.createElement("div");
    divProductData.appendChild(divProductSettings);
    divProductSettings.className = "cart__item__content__settings";

    // <div class="cart__item__content__settings__quantity">
    let divProductSettingsQuantity = document.createElement("div");
    divProductSettings.append(divProductSettingsQuantity);
    divProductSettingsQuantity.className =
      "cart__item__content__settings__quantity";

    //Paragraphe quantité de produit
    let productQuantity = document.createElement("p");
    divProductSettingsQuantity.append(productQuantity);
    productQuantity.innerHTML = "Quantité : ";

    //Balise input choix de la quantité de produit
    let inputQuantity = document.createElement("input");
    divProductSettingsQuantity.append(inputQuantity);
    inputQuantity.type = "number";
    inputQuantity.className = "itemQuantity";
    inputQuantity.name = "itemQuantity";
    inputQuantity.min = 1;
    inputQuantity.max = 100;
    inputQuantity.value = itemQuantity;

    //Balise Supprimer produit
    let divDeleteProduct = document.createElement("div");
    divProductSettings.append(divDeleteProduct);
    divDeleteProduct.className = "cart__item__content__settings__delete";

    let deleteProduct = document.createElement("p");
    divDeleteProduct.append(deleteProduct);
    deleteProduct.className = "deleteItem";
    deleteProduct.innerHTML = "Supprimer";

    // MODIFIER LA QUANTITE D'UN PRODUIT DANS LE PANIER

    function changeQuantity() {
      let itemQuantityModification = document.querySelectorAll(".itemQuantity");
      for (let i = 0; i < itemQuantityModification.length; i++) {
        itemQuantityModification[i].addEventListener("change", (event) => {
          event.preventDefault();

          //Sélection de l'élément à modifier en fonction de son id et de sa couleur
          let itemQuantityModified = basket[i].quantity;
          let itemQuantityNewValue = itemQuantityModification[i].valueAsNumber;

          let resultModified = basket.filter(
            (p) => p.itemQuantityNewValue !== itemQuantityModified
          );
          resultModified.quantity = itemQuantityNewValue;
          basket[i].quantity = resultModified.quantity;
          saveBasket(basket);
          location.reload(); // recharger la  page
          alert("Le contenu de votre panier va être modifié");
        }); //fin addEventListener
      }
    }

    changeQuantity();

    //SUPPRIMER UN PRODUIT DU PANIER

    function removeFromBasket() {
      let deleteItem = document.querySelectorAll(".deleteItem");

      for (let p = 0; p < deleteItem.length; p++) {
        deleteItem[p].addEventListener("click", (event) => {
          event.preventDefault();

          //Sélection de l'élément à supprimer en fonction de son id et de sa couleur
          let deleteId = basket[p].id;
          let deleteColor = basket[p].color;

          basket = basket.filter(
            (p) => p.id !== deleteId || p.color !== deleteColor
          );
          saveBasket(basket);
          location.reload();

          alert("Votre article va être supprimé.");
        }); //fin addEventListener
      }
    }

    removeFromBasket();

    //AFFICHAGE DU NOMBRE TOTAL D'ARTICLES DANS LE PANIER

    let totalItem = document.querySelector("#totalQuantity");
    totalItem.innerHTML = getNumberProduct();

    //Affichage du montant total de la commande
    let totalItemPrice = document.querySelector("#totalPrice");
    totalItemPrice.innerHTML = total;
    console.log(total);
  }
  getResponseApi(itemId).then();
}

//VALIDATION DES DONNEES DU FORMULAIRE

//Selection des champs incluant des messages d'erreur

let firstNameErrorMsg = document.querySelector("#firstNameErrorMsg");

let lastNameErrorMsg = document.querySelector("#lastNameErrorMsg");

let addressErrorMsg = document.querySelector("#addressErrorMsg");

let cityErrorMsg = document.querySelector("#cityErrorMsg");

let emailErrorMsg = document.querySelector("#emailErrorMsg");

/*Creation d'expressions régulières (regex) pour contrôler la validité des réponses dans le formulaire */

let stringRegex = /^[a-zA-ZÀ-ÿ]*$/;

let addressRegex = /^[0-9]{1,4}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+/;

let emailRegex = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/;

// Ecoute d'événements sur les divers champs du formulaire
// verification du champ Prenom
document.querySelector("#firstName").addEventListener("change", () => {
  if (stringRegex.test(firstName.value)) {
    firstNameErrorMsg.innerHTML = "";
  } else {
    firstNameErrorMsg.innerHTML = "Veuillez entrer votre prénom au bon format";
  }
});

// verification du champ Nom
document.querySelector("#lastName").addEventListener("change", () => {
  if (stringRegex.test(lastName.value)) {
    lastNameErrorMsg.innerHTML = "";
  } else {
    lastNameErrorMsg.innerHTML = "Veuillez entrer votre nom au bon format";
  }
});

// verification du champ Adresse
document.querySelector("#address").addEventListener("change", () => {
  if (addressRegex.test(address.value)) {
    addressErrorMsg.innerHTML = "";
  } else {
    addressErrorMsg.innerHTML = "Veuillez entrer votre adresse au bon format";
  }
});

// verification du champ Ville
document.querySelector("#city").addEventListener("change", () => {
  if (stringRegex.test(city.value)) {
    cityErrorMsg.innerHTML = "";
  } else {
    cityErrorMsg.innerHTML = "Veuillez entrer le nom de la ville au bon format";
  }
});

// verification du champ email
document.querySelector("#email").addEventListener("change", () => {
  if (emailRegex.test(email.value)) {
    emailErrorMsg.innerHTML = "";
  } else {
    emailErrorMsg.innerHTML = "Veuillez entrer une adresse mail valide";
  }
});

//ENVOI DES DONNEES DU FORMULAIRE AU SERVEUR

//Ecoute d'événement sur le bouton Commander
order.addEventListener("click", (event) => {
  event.preventDefault();

  // Récuperation du contenu du formulaire
  let dataClient = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    email: document.getElementById("email").value,
  };

  localStorage.setItem("dataClient", JSON.stringify(dataClient));

  console.log(dataClient);

  /*construction d'un tableau pour stocker les produits qui sont dans le localStorage */
  let orderResult = [];

  //Création d'une boucle pour parcourir le tableau
  basket.forEach((item) => {
    orderResult.push(item.id);
  });

  console.log(orderResult);

  /*Création d'un objet qui regroupe les valeurs du formulaire et les produits stockés dans dans le localStorage */

  let dataFormulaire = { dataClient, orderResult };

  //Envoi du formulaire au serveur avec la méthode POST
  console.log("depart de la requete");

  fetch("http://localhost:3000/api/products/order", {
    method: "POST",

    headers: { "Content-Type": "application/json" },

    body: JSON.stringify(dataFormulaire)
  }).then(res => {
    console.log("reponse complete", res);
});
    window.location.assign("confirmation.html?id=" + dataClient);
  
});
