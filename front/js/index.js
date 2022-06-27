console.log("connecté");

/* Requêter l'API avec une fonction async await pour récupérer les infos */

async function getResponse() {
  const reponseJSON = await fetch("http://localhost:3000/api/products");
  //promesse et attente de réponse

  const reponse = await reponseJSON.json();
  console.log(reponse, "objet Javascript");
  return reponse;
}

async function loading() {
  let resultats = await getResponse();

  // Création d'une boucle pour parcourir le tableau
  resultats.forEach((item) => {
    console.log(item); // item contient l'objet entier

    /* Création d'un elt HTML avec les valeurs des objets items */
    let itemsArticle = `     
      <a href="product.html?id=${item._id}">
       <article> 
      <img src="${item.imageUrl}" alt="${item.altTxt}"  />
      
        <h3  class="productName"> ${item.name}</h3>
        <p class="productDescription"> ${item.description}</p>       
        </article>  
        </a>
         `;

    // Affichage des produits dans la page
    document.getElementById("items").innerHTML += itemsArticle;
  }); // Fermeture de la boucle
}

loading().then();
