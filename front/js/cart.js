/* COMMENT AFFICHER UN TABLEAU RECAPITULATIF DES ACHATS DANS LA   PAGE PANIER*/
console.log("connecté");

// RECUPERATION DES VALEURS DANS LOCAL STORAGE
function getBasket() {
  let basket = localStorage.getItem("basket");

  if (basket == null) {
    //Si le panier n'existe pas
    return [];
  } else {
    return JSON.parse(basket);
    //On redonne aux valeurs le format object
  }
}

let localStorageData = getBasket();
console.log(localStorageData[0]["id"]);
console.log(localStorageData[0]);

// Requêter l'API

let idProduct = localStorageData[0]["id"];

let listItem = document.querySelector("#cart__items");

let basket = JSON.parse(localStorage.getItem("basket"));

let total = 0;

async function getArticle(idProduct) {
  const reponseJSON = await fetch(
    "http://localhost:3000/api/products/" + idProduct
  );
  const item = await reponseJSON.json();
  img.setAttribute("src", item.imageUrl);
  img.setAttribute("alt", item.altTxt);
  titleItem.innerHTML = item.name;
  priceItem.innerHTML = item.price;
  descriptionItem.innerHTML = item.description;

  /* L'instruction for...of crée
   une boucle Array pour parcourir les valeurs des différents coloris de la propriété colors ) */
  /* Création d'un nouveau noeud dans le DOM pour les ajouter */

  for (const color of item.colors) {
    let colorSelect = document.createElement("option");
    colorSelect.setAttribute("value", color);
    colorSelect.innerHTML = color;
    colorsItem.appendChild(colorSelect);
  }
}

getArticle(idProduct).then();

//PARCOURIR LE PANIER (ARRAY)
// Création d'une boucle pour parcourir le panier
for (let item of getBasket()) {
  let itemId = item.id;
  let itemColor = item.color;
  let itemQuantity = item.quantity;

  console.log(item);

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

    // Calculer le nombre de produits qu’il y a dans un panier
    function getNumberProduct() {
      let basket = getBasket();
      let number = 0;
      for (let product of basket) {
        number += product.quantity;
      }
      return number;
    }

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

//Sélection des champs incluant des messages d'erreur

let firstNameErrorMsg = document.querySelector("#firstNameErrorMsg");

let lastNameErrorMsg = document.querySelector("#lastNameErrorMsg");

let addressErrorMsg = document.querySelector("#addressErrorMsg");

let cityErrorMsg = document.querySelector("#cityErrorMsg");

let emailErrorMsg = document.querySelector("#emailErrorMsg");

/*Création d'expressions régulières (regex) pour contrôler la validité des réponses dans le formulaire */

let stringRegex = /^[a-zA-ZÀ-ÿ]*$/;

let addressRegex = /^[0-9]{1,4}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+/;

let emailRegex = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/;

// Ecoute d'événements sur les divers champs du formulaire
// Vérification du champ Prénom
document.querySelector("#firstName").addEventListener("change", () => {
  if (stringRegex.test(firstName.value)) {
    firstNameErrorMsg.innerHTML = "";
  } else {
    firstNameErrorMsg.innerHTML = "Veuillez entrer votre prénom au bon format";
  }
});

// Vérification du champ Nom
document.querySelector("#lastName").addEventListener("change", () => {
  if (stringRegex.test(lastName.value)) {
    lastNameErrorMsg.innerHTML = "";
  } else {
    lastNameErrorMsg.innerHTML = "Veuillez entrer votre nom au bon format";
  }
});

// Vérification du champ Adresse
document.querySelector("#address").addEventListener("change", () => {
  if (addressRegex.test(address.value)) {
    addressErrorMsg.innerHTML = "";
  } else {
    addressErrorMsg.innerHTML = "Veuillez entrer votre adresse au bon format";
  }
});

// Vérification du champ Ville
document.querySelector("#city").addEventListener("change", () => {
  if (stringRegex.test(city.value)) {
    cityErrorMsg.innerHTML = "";
  } else {
    cityErrorMsg.innerHTML = "Veuillez entrer le nom de la ville au bon format";
  }
});

// Vérification du champ email
document.querySelector("#email").addEventListener("change", () => {
  if (emailRegex.test(email.value)) {
    emailErrorMsg.innerHTML = "";
  } else {
    emailErrorMsg.innerHTML = "Veuillez entrer une adresse mail valide";
  }
});

//ENVOI DES DONNEES DU FORMULAIRE AU SERVEUR

function sendPost() {
  //Ecoute d'événement sur le bouton Commander
  const orderForm = document.getElementById("order");
  orderForm.addEventListener("click", (e) => {
    e.preventDefault();
    //Contrôle de validité avant envoi au serveur

    if (
      stringRegex.test(firstName.value) == false ||
      stringRegex.test(lastName.value) == false ||
      addressRegex.test(address.value) == false ||
      stringRegex.test(city.value) == false ||
      emailRegex.test(email.value) == false
    ) {
      alert("Veuillez renseigner correctement les champs svp");

      return false;
      //On empêche le rafraîchissement de la page
    } else if (
      firstName.value === "" ||
      lastName.value === "" ||
      address.value === "" ||
      city.value === "" ||
      email.value
    ) {
      alert("Veuillez renseigner correctement les champs svp");
      return false;
    } else alert("Votre commande a été enregistrée");
    return true;
  });

  // Récuperation du contenu du formulaire

  let inputName = document.getElementById("firstName");
  let inputLastName = document.getElementById("lastName");
  let inputAddress = document.getElementById("address");
  let inputCity = document.getElementById("city");
  let inputMail = document.getElementById("email");

  /*construction d'un tableau pour stocker les produits qui sont dans le localStorage */
  let idProducts = [];

  //Création d'une boucle pour parcourir le tableau
  basket.forEach((item) => {
    idProducts.push(item.id);
  });
  console.log(idProducts);

  /*Création d'un objet qui regroupe les valeurs du formulaire et les produits stockés dans dans le localStorage */

  const order = {
    contact: {
      firstName: inputName.value,
      lastName: inputLastName.value,
      address: inputAddress.value,
      city: inputCity.value,
      email: inputMail.value,
    },
    products: idProducts,
  };

  //Envoi du formulaire au serveur avec la méthode POST
  console.log("depart de la requête");

  const options = {
    method: "POST",
    body: JSON.stringify(order),
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch("http://localhost:3000/api/products/order", options)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      localStorage.setItem("orderId", data.orderId);

      document.location.href = "confirmation.html";
    })

    .catch((err) => {
      alert("Un problème est survenu: " + err.message);
    });
}

sendPost();
