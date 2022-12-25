const queryString =  new URLSearchParams(window.location.search);
const id = queryString.get("id");
let product = [];


    fetch(`http://localhost:3000/api/products/${id}`) 
    .then (response => response.json())
    .then ((data) => {
        displayProduct (data)
        product = data
    })
    .catch((err) => console.error(err))

function displayProduct (product) {

    displayImage (product)
    displayTitle (product)
    displayPrice (product)
    displayDescription (product)
    displayColor (product)
};
   

function displayImage (product) { // Affichage de l'image 
    const item = document.querySelector('.item__img');
    const img = document.createElement('img');
    img.src = `${product.imageUrl}`;
    img.altTxt = `${product.altTxt}`;
    item.appendChild (img);
};

function displayTitle (product) { // Affichage du Titre 
    const title = document.querySelector('#title');
    title.innerHTML += `${product.name}`;
};

function displayPrice (product) { // Affichage du prix 
     const price = document.querySelector('#price');
     price.innerHTML += `${product.price}`;
};

function displayDescription (product) { // Affichage description
    const description = document.querySelector('#description');
    description.innerHTML += `${product.description}`;
};

function displayColor (product) { // Selection des couleurs
    let productcolor = document.getElementById('colors');
     
    for ( i = 0; i < product.colors.length; i++) {
        productcolor.innerHTML += `<option value="${product.colors[i]}">${product.colors[i]}</option>`
    };
};


////////////////////////////////////////////////////////////// AJOUT DU PANIER ////////////////////////////////////////////////////////
listenerButton();

function listenerButton () {  // Au moment du click on envoie le choix du produit dans le cart et le localStorage 
    const button = document.querySelector('#addToCart')
    button.addEventListener('click', () => sendProduct (product));
};

const quantityChoice = document.querySelector('#quantity') // Affichage de la quantité choisie
const choiceColor = document.querySelector('#colors') // Affichage de la couleur choisie


function sendProduct (product) {  // Les différentes possibilités d'envoient 

    let newProduct = {
        id : `${product._id}`,
        color : choiceColor.value,
        quantity : Number (quantityChoice.value),
        image : `${product.imageUrl}`,
        alt :  `${product.altTxt}`,
        name : `${product.name}`
    };
    
    const cart =  JSON.parse(localStorage.getItem("productStorage"));

    if (cart){
        const existProduct = cart.find((product) => newProduct.id === product.id && newProduct.color === product.color)
        console.log(existProduct)
        if (existProduct){ 
            sameProductNewQuantity(existProduct,cart) // Si le produit existe déjà et possède la même couleur, on met à jour la quantitée
        }
        else{ 
            addNewProduct (newProduct,cart) // Si le produit n'existe pas, on ajoute le produit
    
        }
    }else{
        sameProductDifferentColor (newProduct,cart) // Si le produit existe déjà et possède une couleur différente, on ajoute un nouveau produit 
    }
    
};

function sameProductDifferentColor (newProduct,cart) {  // Affichage du même produit mais possède une différente couleur
cart = [];
cart.push(newProduct);
localStorage.setItem("productStorage",JSON.stringify(cart));
};

function sameProductNewQuantity (existProduct,cart,){ // Affichage du même produit et  une même couleur avec une nouvelle quantité
    let newQuantity = parseInt(quantityChoice.value) + parseInt(existProduct.quantity);
    existProduct.quantity = newQuantity;
    
localStorage.setItem("productStorage", JSON.stringify(cart))
}

function addNewProduct (newProduct,cart) { // Affichage du produit si le panier est vide 
    
cart.push(newProduct)
localStorage.setItem("productStorage",JSON.stringify(cart));
};



        

 
    
        
    

    
    
    
   
    
    
    