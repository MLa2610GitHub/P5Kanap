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

// Création d'une boucle pour parcourir le tableau
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
  }

  //Stockage de la structure html
  let contenuPanierHtml = "";

  contenuPanierHtml += `
      <article class="cart__item" data-id="${item.id}" data-color="${item.color}">
                <div class="cart__item__img">
                  <img src="${item.imageUrl}" alt="${item.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${item.name}</h2>
                    <p></p>
                    <p>${item.price}</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item.nombreItems}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article> `;

  //Affichage des produits du panier

  document.querySelector("#cart__items").innerHTML += contenuPanierHtml;
  console.log(contenuPanierHtml);

  getResponseApi(itemId).then();

}


