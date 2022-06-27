/* Quand on clique sur un des canapés de la page d'accueil, 
une fiche produit s'ouvre présentant une photo et des infos */

// RECUPERATION DES INFOS POUR CHAQUE CANAPE

console.log(window.location.href);
//retourne une adresse web personnalisée

//Récupération des paramètres de l'url
const recupUrl = window.location.href;

/* Le constructeur URL() renvoie un nouvel objet URL représentant l'URL définie par les paramètres */
const url = new URL(recupUrl);

//Récupération de l'id
const id = url.searchParams.get("id");

//Sélection des différents emplacements dont on a besoin
let imgItem = document.querySelector(".item__img");
let img = document.createElement("img");
imgItem.appendChild(img);
let titleItem = document.getElementById("title");

let priceItem = document.getElementById("price");
let descriptionItem = document.getElementById("description");
let colorsItem = document.getElementById("colors");

/* Récupération des infos pour chaque item avec l'id via une fonction async/await */
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

  /* L'instruction for...of permet de créer une boucle Array pour parcourir les valeurs des propriétés (ici les différents coloris de la propriété colors) */
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
Les variables colorsItem et id ont déjà été définies */

let btnAddToCart = document.getElementById("addToCart");
let nombreItems = document.getElementById("quantity");
let colorSelected = document.getElementById("colors");

function recuperationBasket() {
  console.log("fonction lancée");
  // Récupération des valeurs stockées dans localStorage
  //On redonne aux valeurs leur format d'origine (cad object)

  let panier = localStorage.getItem("details");

  if (panier) {
    return JSON.parse(panier);
  } else {
    return [];
  }
}

//AJOUT D'UN PRODUIT AU PANIER SANS SUPPRIMER L'ANCIEN
function addArticle() {
  console.log("test addBasket");

  /* Récupération des choix du client dans une variable (ici un objet contenu dans un tableau)  */
  const product = {
    id: id,
    color: colorSelected.value,
    nombreItems: parseInt(nombreItems.value),
  };

  /* On récupère le panier qui existe dans localStorage en réutilisant la fonction recuperationBasket */
  let basketObject = recuperationBasket();

  // on gère la quantité ajoutée avec la méthode find
  /* On cherche dans le panier s'il y a un produit (p) dont l'id (p.id) est égal à l'id et à la couleur du produit qu'on veut ajouter (product.id). Si find ne trouve rien, il retourne 'undefined' */

  const productFound = basketObject.find(
    (p) => p.id == product.id && p.color == product.color
  );

  if (productFound) {
    productFound.nombreItems = productFound.nombreItems + product.nombreItems;

    localStorage.setItem("details", JSON.stringify(basketObject));
    return;
  }
  basketObject.push(product);
  localStorage.setItem("details", JSON.stringify(basketObject));
}

//Détection des clics sur le panier

btnAddToCart.addEventListener("click", (e) => {
  //On empêche le rafraîchissement de la page
  e.preventDefault();
  console.log("item ajouté ! ");

  addArticle();
}); /////// Fermeture de btnAddToCart.addEventListener

// TECHNIQUES ALTERNATIVES POUR RECUPERER LES INFOS

/* await fetch("http://localhost:3000/api/products/" + id)
  .then((response) => response.json())
  .then((item) => {
    img.setAttribute("src", item.imageUrl);
    img.setAttribute("alt", item.altTxt);
    titleItem.innerHTML = item.name;
    priceItem.innerHTML = item.price;
    descriptionItem.innerHTML = item.description; */

/* Création d'une boucle pour parcourir le tableau des différents coloris */
/* Création d'un nouveau noeud dans le DOM pour les ajouter 
    for (let i = 0; i < item.colors.length; i++) {
      let color = document.createElement("option");
      color.setAttribute("value", item.colors[i]);
      color.innerHTML = item.colors[i];
      colorsItem.appendChild(color);
    }
  }); */
