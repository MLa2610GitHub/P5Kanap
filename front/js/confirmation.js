//ON RECUPERE L'ID DU PRODUIT A AFFICHER
const idOrder = new URL(window.location.href).searchParams.get("id");

//AFFICHER LE NUMERO DE COMMANDE
let orderId = document.getElementById("orderId");
orderId.innerHTML = idOrder;

console.log(idOrder);
console.log(orderId);