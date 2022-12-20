const orderId = getOrderId ()
displayOrderId(orderId)
clearCache ()

function getOrderId (){
    const queryString =  new URLSearchParams(window.location.search);
    const urlParams = queryString.get("orderId") 
    return urlParams
}

function displayOrderId (orderId){
    const Id = document.querySelector('#orderId')
    Id.innerHTML += orderId
}

function clearCache () {
    const cache = window.localStorage
    cache.clear
}

