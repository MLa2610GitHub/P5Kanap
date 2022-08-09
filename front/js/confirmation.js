//ON RECUPERE L'ID DU PRODUIT A AFFICHER
function recupIdForm() {
  const idForm = document.getElementById("orderId");
  idForm.innerText = localStorage.getItem("orderId");
  console.log(localStorage.getItem("orderId"));
}

recupIdForm();



