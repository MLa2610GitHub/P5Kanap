//AFFICHER LES PRODUITS SUR LA PAGE D'ACCUEIL

console.log("connecté");

// Requêter l'API pour obtenir les infos sur tous les canapés proposés

// Utilisation d'une fonction async await pour récupérer les infos de l'API
async function getResponse() {
  const responseJSON = await fetch("http://localhost:3000/api/products");
  //promesse et attente de réponse

  const response = await responseJSON.json();
  console.log(response, "objet Javascript");
  return response;
}

// Utilisation d'une fonction async await pour afficher les infos dans la page de manière dynamique
async function loading() {
  let resultats = await getResponse();
  console.log(resultats); //rapporte une liste de 8 objets

  // Création d'une boucle pour parcourir le tableau
  resultats.forEach((item) => {
    console.log(item);
    // item contient chaque objet détaillé, il y a 8 items au total

    // Création d'un elt HTML avec les valeurs des objets items
    let itemsArticle = `     
      <a href="product.html?id=${item._id}">
       <article> 
      <img src="${item.imageUrl}" alt="${item.altTxt}"  />
      
        <h3  class="productName"> ${item.name}</h3>
        <p class="productDescription"> ${item.description}</p>       
        </article>  
        </a>
         `;

    // Affichage des produits dans la page via un élément du DOM
    document.getElementById("items").innerHTML += itemsArticle;
  }); // Fermeture de la boucle
}

loading().then(); // Fin de la fonction qui permet l'affichage dynamique
