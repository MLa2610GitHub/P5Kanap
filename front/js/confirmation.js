//ON RECUPERE L'ID DU PRODUIT A AFFICHER
function recupIdForm() {
  const idForm = document.getElementById("orderId");
  idForm.innerText = localStorage.getItem("orderId");
  console.log(localStorage.getItem("orderId"));
}

recupIdForm();

//Le numéro de commande est affiché, mais il est effacé du localStorage
localStorage.clear();