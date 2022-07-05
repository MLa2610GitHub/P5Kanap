import getArticle from "./product.js";
import recuperationBasket from "./product.js";
import addArticle from "./product.js";

/*AFFICHER UN TABLEAU RECAPITULATIF DES ACHATS DANS LA PAGE PANIER*/
console.log("connecté");
getArticle(id);

//Récupérer le panier via localStorage
//Parcourir le panier (l'array)
//Créer et insérer des éléments dans la page

/* On récupère le panier qui existe dans localStorage en réutilisant la fonction recuperationBasket */
let basketObject = recuperationBasket();

/*Création d'une boucle pour parcourir le panier  */
basketObject.forEach((item) => {
  console.log(item);

  /*Création d'un élément HTML pour récupérer les valeurs des objets items */
  let itemsArticleCart = `<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
                <div class="cart__item__img">
                  <img src="${item.imageUrl}" alt="${item.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${item.name}</h2>
                    <p>${item.colors}</p>
                    <p>${item.price}</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
 `;

  /* Affichage du panier dans la page */
  // Sélection de la section qui affiche la commande
  const cartItems = document.getElementById("cart_items");

  // On place cette section dans la page
  cartItems.innerHTML += itemsArticleCart; 

}); // Fermeture de la boucle
