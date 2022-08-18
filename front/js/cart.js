/* COMMENT AFFICHER UN TABLEAU RECAPITULATIF DES ACHATS DANS LA PAGE PANIER*/
console.log("connecté");

let id = new URL(window.location).searchParams.get("id");

let listItem = document.querySelector("#cart__items");

let basket = JSON.parse(localStorage.getItem("basket"));

let total = 0;

//FONCTIONS UTILISEES

//ENREGISTRER UN PANIER DANS LOCAL STORAGE
function saveBasket(basket) {
  localStorage.setItem("basket", JSON.stringify(basket));
}
console.log(basket);

// RECUPERER DES VALEURS DANS LOCAL STORAGE
function getBasket() {
  let basket = localStorage.getItem("basket");

  if (basket == null) {
    //Si le panier n'existe pas
    let emptyBasket = document.querySelector("h1");
    emptyBasket.innerHTML = emptyBasket.innerText + " est vide !";
    return [];
  } else {
    return JSON.parse(basket);
    //On redonne aux valeurs le format objet
  }
}

// MODIFIER LA QUANTITE D'UN PRODUIT DANS LE PANIER
function changeQuantity() {
  //Sélection de l'emplacement du bouton "modifier la quantité" dans le DOM
  let itemQuantityModification = document.querySelectorAll(".itemQuantity");
  //Création d'une boucle pour parcourir le panier
  for (let i = 0; i < itemQuantityModification.length; i++) {
    //Création d'un écouteur d'événement pour surveiller le panier
    itemQuantityModification[i].addEventListener("change", (event) => {
      event.preventDefault(); //On empêche la page de se rafraîchir

      //Sélection de l'élément à modifier en fonction de son id et de sa couleur
      let itemQuantityModified = basket[i].quantity;
      let itemQuantityNewValue = itemQuantityModification[i].valueAsNumber;

      //Utilisation de la méthode filter pour vérifier si des changements ont lieu
      let resultModified = basket.filter(
        (p) => p.itemQuantityNewValue !== itemQuantityModified
      );
      resultModified.quantity = itemQuantityNewValue;
      basket[i].quantity = resultModified.quantity;
      saveBasket(basket); // Enregistrement du panier

      location.reload(); // Recharger la page
      alert("Le contenu de votre panier va être modifié"); //Message adressé au client
    }); //Fin addEventListener
  } // Fermeture de la boucle
} // Fin de la fonction qui modifie la quantité d'articles dans le panier

//SUPPRIMER UN PRODUIT DU PANIER

function removeFromBasket() {
  //Sélection de l'emplacement du bouton "Supprimer" dans le DOM
  let deleteItem = document.querySelectorAll(".deleteItem");
  //Création d'une boucle pour parcourir le panier
  for (let p = 0; p < deleteItem.length; p++) {
    //Création d'un écouteur d'événement pour surveiller le panier
    deleteItem[p].addEventListener("click", (event) => {
      event.preventDefault(); //On empêche la page de se rafraîchir

      //Sélection de l'élément à supprimer en fonction de son id et de sa couleur
      let deleteId = basket[p].id;
      let deleteColor = basket[p].color;

      //Utilisation de la méthode filter pour vérifier si des changements ont lieu
      basket = basket.filter(
        (p) => p.id !== deleteId || p.color !== deleteColor
      );
      saveBasket(basket); // Enregistrement du panier
      location.reload(); // Recharger la page

      alert("Votre article va être supprimé."); //Message adressé au client
    }); // Fin addEventListener
  } // Fermeture de la boucle
} // Fin de la fonction qui supprime un élément du panier

// CALCULER LE NOMBRE DE PRODUITS QU'IL Y A DANS UN PANIER
function getNumberProduct() {
  let basket = getBasket();
  let number = 0;
  for (let product of basket) {
    number += product.quantity;
  }
  return number;
}

//PARCOURIR LE PANIER
// Création d'une boucle pour parcourir l'array
for (let item of getBasket()) {
  let itemId = item.id;
  let itemColor = item.color;
  let itemQuantity = item.quantity;

  console.log(item);

  //CREER ET INSERER DES ELEMENTS DANS LA PAGE
  //Récuperation des infos API pour afficher les produits
  async function getResponseApi(itemId) {
    const responseJSON = await fetch(
      "http://localhost:3000/api/products/" + itemId
    );
    //promesse et attente de réponse

    const response = await responseJSON.json();
    console.log(response, "objet Javascript");

    //Injection des infos dans la page web
    //Sélection des éléments du DOM dont on a besoin

    //Création de la balise article et insertion dans la balise section
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
    changeQuantity();

    //SUPPRIMER UN PRODUIT DU PANIER
    removeFromBasket();

    //AFFICHAGE DU NOMBRE TOTAL D'ARTICLES DANS LE PANIER
    //Sélection de l'élément dans le DOM
    //Affichage du nombre total d'articles commandés
    let totalItem = document.querySelector("#totalQuantity");
    totalItem.innerHTML = getNumberProduct();

    //Sélection de l'élément dans le DOM
    //Affichage du montant total de la commande
    let totalItemPrice = document.querySelector("#totalPrice");
    totalItemPrice.innerHTML = total;
    console.log(total);
  } // Fin de la fonction qui récupère les infos de l'API pour afficher les produits

  getResponseApi(itemId).then();
} //Fermeture de la boucle qui parcourt le panier

//VALIDATION DES DONNEES DU FORMULAIRE

//Sélection des champs incluant des messages d'erreur

let firstNameErrorMsg = document.querySelector("#firstNameErrorMsg");

let lastNameErrorMsg = document.querySelector("#lastNameErrorMsg");

let addressErrorMsg = document.querySelector("#addressErrorMsg");

let cityErrorMsg = document.querySelector("#cityErrorMsg");

let emailErrorMsg = document.querySelector("#emailErrorMsg");

/*Création d'expressions régulières (regex) pour contrôler la validité des réponses dans le formulaire */

let stringRegex = /^[A-Za-z]{2,30}$/;

let addressRegex = /^[a-z0-9áàâçéèêëîïñóòôöõúùûüæœ\s-]{1,60}$/i;

let emailRegex = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/;

// Ecoute d'événements dans les champs du formulaire
//La méthode test() vérifie s'il y a correspondance entre le texte et le regex et renvoie true ou false
// Vérification du champ Prénom
document.querySelector("#firstName").addEventListener("change", () => {
  if (stringRegex.test(firstName.value)) {
    firstNameErrorMsg.innerHTML = "";
  } else {
    firstNameErrorMsg.innerHTML =
      "Veuillez entrer votre prénom svp : il doit faire au moins deux lettres"; // Message pour guider le client
  }
});

// Vérification du champ Nom
document.querySelector("#lastName").addEventListener("change", () => {
  if (stringRegex.test(lastName.value)) {
    lastNameErrorMsg.innerHTML = "";
  } else {
    lastNameErrorMsg.innerHTML =
      "Veuillez entrer votre nom svp : il doit faire au moins deux lettres"; // Message pour guider le client
  }
});

// Vérification du champ Adresse
document.querySelector("#address").addEventListener("change", () => {
  if (addressRegex.test(address.value)) {
    addressErrorMsg.innerHTML = "";
  } else {
    addressErrorMsg.innerHTML =
      "Veuillez entrer votre adresse au bon format svp"; // Message pour guider le client
  }
});

// Vérification du champ Ville
document.querySelector("#city").addEventListener("change", () => {
  if (stringRegex.test(city.value)) {
    cityErrorMsg.innerHTML = "";
  } else {
    cityErrorMsg.innerHTML =
      "Veuillez entrer le nom de la ville svp : il doit faire au moins deux lettres"; // Message pour guider le client
  }
});

// Vérification du champ email
document.querySelector("#email").addEventListener("change", () => {
  if (emailRegex.test(email.value)) {
    emailErrorMsg.innerHTML = "";
  } else {
    emailErrorMsg.innerHTML = "Veuillez entrer une adresse mail valide svp"; // Message pour guider le client
  }
});

//ENVOI DES DONNEES DU FORMULAIRE AU SERVEUR

//Ecoute d'événement sur le bouton Commander
const order = document.getElementById("order");
order.addEventListener("click", (e) => {
  e.preventDefault(); // On empêche la page de se rafraîchir pour ne pas perdre les données

  //Contrôle de remplissage du formulaire avant envoi au serveur

  if (
    firstName.value == "" ||
    firstName.value.length < 2 ||
    lastName.value == "" ||
    lastName.value.length < 2 ||
    address.value == "" ||
    address.value.length < 6 ||
    city.value == "" ||
    city.value.length < 2 ||
    email.value == ""
  ) {
    alert("Veuillez remplir correctement tous les champs svp"); // Message pour guider le client
    window.history.back(product.html);
  } else {
    //on informe le client que sa commande est ok
    alert("Tout est ok. Votre commande a été prise en compte ! ");
  }

  // Sélection des éléments du formulaire

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

  /*Création d'un objet qui contient les valeurs du formulaire de contact + un tableau des produits stockés dans localStorage */

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

  localStorage.setItem("order", JSON.stringify(order)); //Enregistrement des données dans localStorage

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

      localStorage.setItem("orderId", data.orderId); //Enregistrement dans localStorage

      document.location.href = "confirmation.html"; //Redirection du client vers la page Confirmation
    })

    .catch((err) => {
      alert("Un problème est survenu: " + err.message);
    });
}); //Fin de l'addEventListener
