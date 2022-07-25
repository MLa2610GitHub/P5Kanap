//EFFECTUER UNE REQUETE POST SUR L'API 

fetch("http://localhost:3000/api/products/order", {
	        method: "POST",
	        body: JSON.stringify(order),
	        headers: {
	          "Accept": "application/json",
	          'Content-Type': 'application/json'
	        },
	      })

   //RECUPERER L'IDENTIFIANT DE COMMANDE       
	        .then((res) => res.json())
	        .then((data) => {
	          let orderId = data.orderId;
	          window.location.assign("confirmation.html?id=" + orderId)
	
	        });
	       
	//AFFICHER LE NUMERO DE COMMANDE
    let orderId = document.getElementById("orderId");
    orderId.textContent = idOrder;
    console.log(orderId);