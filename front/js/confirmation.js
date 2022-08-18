//ON RECUPERE L'ID DU PRODUIT A AFFICHER

//Création d'une fonction qui récupère l'ID et l'affiche sur la page web

function recupIdForm() {
  const idForm = document.getElementById("orderId");
  idForm.innerText = localStorage.getItem("orderId");
  console.log(localStorage.getItem("orderId"));
} // Fin de la fonction qui récupère l'ID

recupIdForm();

//Le numéro de commande est affiché pour le client, mais il est effacé du localStorage
localStorage.clear();
