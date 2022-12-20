const orderId = getOrderId ()
displayOrderId(orderId)
clearCache ()

function getOrderId (){   // Récupération de l'orderId de notre commande situé dans le cart
    const queryString =  new URLSearchParams(window.location.search);
    const urlParams = queryString.get("orderId") 
    return urlParams
}

function displayOrderId (orderId){ // Affichage de l'orderId
    const Id = document.querySelector('#orderId')
    Id.innerHTML += orderId
}

function clearCache () { // Effacement des produits dans le localStorage
    const cache = window.localStorage
    cache.clear
}

