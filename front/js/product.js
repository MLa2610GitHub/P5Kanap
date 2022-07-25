/*FAIRE LE LIEN ENTRE UN PRODUIT DE LA PAGE D'ACCUEIL ET LA PAGE PRODUIT

/* Quand on clique sur un des canapés de la page d'accueil, 
une fiche produit s'ouvre présentant une photo et des infos sur le produit */

// RECUPERATION DE L'ID POUR AFFICHER UN CANAPE

console.log(window.location.href);
//retourne une adresse web personnalisée

//Récupération des paramètres de l'url
const recupUrl = window.location.href;

/* Le constructeur URL() renvoie un nouvel objet URL représentant l'URL définie par les paramètres */
const url = new URL(recupUrl);

//ON RECUPERE L'ID DU PRODUIT A AFFICHER
const id = url.searchParams.get("id");

//ENREGISTRER UN PANIER DANS LOCAL STORAGE
function saveBasket(basket) {
  localStorage.setItem("basket", JSON.stringify(basket));
}
/*On ne peut pas enregistrer tableaux et objets dans LS.
On transforme les données en chaîne de caracteres */

//INSERER UN PRODUIT ET SES DETAILS DANS LA PAGE PRODUIT

//Sélection des différents éléments dont on a besoin
let imgItem = document.querySelector(".item__img");
let img = document.createElement("img");
imgItem.appendChild(img);

let titleItem = document.getElementById("title");

let priceItem = document.getElementById("price");

let descriptionItem = document.getElementById("description");

let colorsItem = document.getElementById("colors");

/* Récupération des infos pour chaque canapé différent avec l'id via une fonction async/await */
/* affichage d'une fiche produit pour chaque canapé */

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
   une boucle Array pour parcourir les valeurs des propriétés (ici les différents coloris de la propriété colors qui sont stockés dans un tableau) */
  /* Création d'un nouveau noeud dans le DOM pour les ajouter */

  for (const color of item.colors) {
    let colorSelect = document.createElement("option");
    colorSelect.setAttribute("value", color);
    colorSelect.innerHTML = color;
    colorsItem.appendChild(colorSelect);
  }
}

getArticle(id).then();

//AJOUTER DES PRODUITS DANS LE PANIER

/* On sélectionne les éléments nécessaires : le bouton 'Ajouter au panier', le nombre d'articles et la couleur choisie. 
Les variables colorsItem et id sont déjà définies */

let btnAddToCart = document.getElementById("addToCart");
let quantity = document.getElementById("quantity");
let colorSelected = document.getElementById("colors");

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

//AJOUT D'UN PRODUIT AU PANIER SANS SUPPRIMER L'ANCIEN

function addArticle() {
  let basket = getBasket();

  // Récupération des choix du client dans une variable
  const product = {
    id: id,
    color: colorSelected.value,
    quantity: parseInt(quantity.value),
  };

  // on gère la quantité ajoutée avec la méthode find
  /* On cherche dans le panier s'il y a un produit (p) dont l'id (p.id) est égal à l'id et à la couleur du produit qu'on veut ajouter (product.id). Si find ne trouve rien, il retourne 'undefined' */

  let foundProduct = basket.find(
    (p) => p.id == product.id && p.color == product.color
  );

  if (foundProduct) {
    foundProduct.quantity = foundProduct.quantity + product.quantity;

    saveBasket(basket);
    return;
  }
  basket.push(product);
  saveBasket(basket);
}

//Détection des clics sur le panier

btnAddToCart.addEventListener("click", (e) => {
  //On empêche le rafraîchissement de la page
  e.preventDefault();
  console.log("item ajouté ! ");
  window.location.assign("cart.html");

  addArticle();
}); /////// Fermeture de btnAddToCart.addEventListener
