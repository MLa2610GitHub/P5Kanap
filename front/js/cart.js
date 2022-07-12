/*AFFICHER UN TABLEAU RECAPITULATIF DES ACHATS DANS LA PAGE PANIER*/
console.log("connecté");

//Récupérer le panier via localStorage
//Parcourir le panier (l'array)
//Créer et insérer des éléments dans la page

// Sélection de la balise où on injecte le panier
let cartItems = document.querySelector("#cart__items");
console.log(cartItems);

//Récupération des produits dans localStorage
//Parse convertit les données JSON en objet JavaScript
let basket = JSON.parse(localStorage.getItem("basket"));
console.log(basket);

// Création d'une boucle pour parcourir l'objet
for (let item of basket) {
  let itemId = item.id;
  let itemColor = item.color;
  let itemQuantity = item.quantity;
  

  // Récuperation des infos API pour afficher chaque produit
  async function getResponseApi(itemId) {
    const responseJSON = await fetch(
      "http://localhost:3000/api/products/" + itemId
    );
    //promesse et attente de réponse

    const response = await responseJSON.json();
    console.log(response, "objet Javascript");

    //Création des balises
    //Affichage des infos dans la page

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
    let divProductInfo = document.createElement("div");
    productArticle.append(divProductInfo);
    divProductInfo.className = "cart__item__content";

    //<div class="cart__item__content__description">
    let divProductDescription = document.createElement("div");
    divProductInfo.appendChild(divProductDescription);
    divProductDescription.className = "cart__item__content__description";

    //Balise <h2>
    let productName = document.createElement("h2");
    divProductDescription.append(productName);
    productName.innerText = response.name;

    //Paragraphe couleur
    let productColor = document.createElement("p");
    divProductDescription.append(productColor);
    productColor.innerHTML = "Couleur : " + itemColor;

    //Paragraphe prix
    let productPrice = document.createElement("p");
    divProductDescription.append(productPrice);
    productPrice.id = "unitPrice";
    productPrice.innerHTML = "Prix : " + response.price + " €";

    //<div class="cart__item__content__settings">
    let divProductSettings = document.createElement("div");
    divProductInfo.appendChild(divProductSettings);
    divProductSettings.className = "cart__item__content__settings";

    // <div class="cart__item__content__settings__quantity">
    let divProductSettingsQuantity = document.createElement("div");
    divProductSettings.append(divProductSettingsQuantity);
    divProductSettingsQuantity.className =
      "cart__item__content__settings__quantity";

    //Paragraphe quantité
    let productQuantity = document.createElement("p");
    divProductSettingsQuantity.append(productQuantity);
    productQuantity.innerHTML = "Quantité : ";

    //Balise input choix quantité
    let inputQuantity = document.createElement("input");
    divProductSettingsQuantity.append(inputQuantity);
    inputQuantity.type = "number";
    inputQuantity.className = "itemQuantity";
    inputQuantity.name = "itemQuantity";
    inputQuantity.min = 1;
    inputQuantity.max = 100;
    inputQuantity.value = itemQuantity;

    //Calcul du nombre total d'elements du panier
    let totalItem = document.querySelector("#totalQuantity");
    totalItem.innerHTML = item.quantity;

    //Balise bouton delete
    let divDeletebtn = document.createElement("div");
    divProductSettings.append(divDeletebtn);
    divDeletebtn.className = "cart__item__content__settings__delete";
    let deleteBtn = document.createElement("p");
    divDeletebtn.append(deleteBtn);
    deleteBtn.className = "deleteItem";
    deleteBtn.innerHTML = "Supprimer";
  }
 getResponseApi(itemId).then();
}





