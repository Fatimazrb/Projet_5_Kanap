const cart = JSON.parse(localStorage.getItem("productStorage"))


fetch(`http://localhost:3000/api/products/`) // Récupération des données de l'API pour récupérer le prix
    .then (products => products.json())
    .then ((productData) => {

        for (let i = 0; i < cart.length; i++){

        const findPriceOfItem = productData.find((item) => cart[i].id === item._id);
        cart[i].price = findPriceOfItem.price
        }
        cart.forEach((item) => displayItem(item))
});


function displayItem (item) { //Affichage des produits
const section = document.querySelector('#cart__items')

const article = articleItem (item) // Article qui contient l'ensemble du produit
section.appendChild (article)

const image = imageItem (item) // Image du produit 
article.appendChild(image)

const content = itemContent (item) // Div qui contient description + quantity + delete
article.appendChild(content)

const total = Total (item) // Div qui contient la quantity totale et price

};


function articleItem (item) { // Article du produit
    const article = document.createElement("article")
    article.classList.add('cart__item')
    article.dataset.id = `${item.id}`
    article.dataset.color = `${item.color}`
return article
};

function imageItem (item) { // Image du produit
    const divImage = document.createElement('div')
    divImage.classList.add('cart__item__img')

    const image = document.createElement('img')
    image.src = `${item.image}`
    image.alt =`${item.alt}`

    divImage.appendChild(image)
return divImage
};

function itemContent (item) { // Contient la div itemDescription + div cartSetting 
    const div = document.createElement('div')
    div.classList.add('cart__item__content')
    const description = itemDescription (item)
    const setting = cartSetting(item)
    
    div.appendChild(description)
    div.appendChild(setting)

return div
};

function itemDescription (item) { // Description du produit (nom,prix,couleur)
    const divDescription = document.createElement('div')
    divDescription.classList.add('cart__item__content__description')
    
    const h2 = document.createElement('h2')
    h2.innerHTML += `${item.name}`
    
    const color = document.createElement('p')
    color.innerHTML += `${item.color}`
    
    const price = document.createElement('p')
    price.innerHTML += `${item.price}` + ' €'

    divDescription.appendChild(h2)
    divDescription.appendChild(color)
    divDescription.appendChild(price)

return divDescription
};




function cartSetting (item) { // Div qui contient la div productQuantity + la div Delete 
    const divSetting = document.createElement('div')
    divSetting.classList.add('cart__item__content__settings')
    const theQuantity = productQuantity (item)
    const deleteItem = Delete (item)

    divSetting.appendChild(theQuantity)
    divSetting.appendChild(deleteItem)
return divSetting
};

function productQuantity (item) { // Affichage de la quantité choisi 
    const divSettingQuantity = document.createElement('div')
    divSettingQuantity.classList.add('cart__item__content__settings__quantity')

    const p = document.createElement('p') 
    divSettingQuantity.appendChild(p)
    p.innerHTML += 'Quantity :' 

    const input = document.createElement('input')
    input.classList.add('itemQuantity')
    input.type = 'number'
    input.name = 'itemQuantity'
    input.min = '1'
    input.max = '100'
    input.value = item.quantity

    input.addEventListener('input', () => updatePriceandQuantity (item.id, input.value, item,item.color))

    divSettingQuantity.appendChild(input)
return divSettingQuantity
};



function Total (){ // Affichage de la quantité total et du prix total de tous les produits
    const totalQuantity = document.querySelector('#totalQuantity')
    const total = cart.reduce((total,item) => total + item.quantity,0)
    totalQuantity.textContent= total 

    const totalPrice = document.querySelector('#totalPrice')
    const price = cart.reduce((total,item) => total + item.price * item.quantity,0)
    totalPrice.textContent = price 

};

function updatePriceandQuantity (id,newValue,item,color) { // Affichage de la nouvelle quantité et du prix après une modifcation sur le cart
    const itemToUpdate = cart.find ((item) => item.id  === id && item.color === color)
    itemToUpdate.quantity = Number (newValue)
    item.quantity = itemToUpdate.quantity

    localStorage.setItem("productStorage",JSON.stringify(cart))

    Total();
}

function Delete (item) { // Affichage du bouton supprimer
    const divSettingDelete = document.createElement('div')
    divSettingDelete.classList.add('cart__item__content__settings__delete')

    const deleteItem = document.createElement('p')
    deleteItem.classList.add('deleteItem')
    deleteItem.innerHTML += 'Delete' 
    
    divSettingDelete.appendChild(deleteItem)

    divSettingDelete.addEventListener('click',() => deleteTheProduct  (item)) // Ecoute de l'évement au moment du clique 
    
return divSettingDelete
};

function deleteTheProduct (item) { // Suppression du produit selectionner pour être supprimer du localStorage et de la page 

    const productToDelete = cart.find ((product) => product.id  === item.id && product.color === item.color)
    cart.splice(productToDelete,1)
    
    localStorage.setItem("productStorage",JSON.stringify(cart))
    const articleToDelete = document.querySelector(`article[data-id="${item.id}"][data-color="${item.color}"]`)
    articleToDelete.remove()

    Total(); 
};




/////////////////////////////////////////////////////// FORM ////////////////////////////////////////////////////////////////

const orderButton = document.querySelector('#order')
const form = document.querySelector('.cart__order__form')
orderButton.addEventListener('click', () => submitForm ())

function submitForm () {  // Ordre que le boutton va appliquer lors du clique 
    if (cart.length === 0) {
        alert("please select a product")
        return
    }if (form === false){
        alert("error in the form")
        return
    }

    const request = makeRequest ();
    fetch("http://localhost:3000/api/products/order",{   // Envoie d'une requète 
        method: "POST",
        body: JSON.stringify(request),
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then (response => response.json())
    .then ((product) => {
        const orderId = product.orderId
        console.log(orderId)
        window.location.href = "./confirmation.html" + "?orderId=" + orderId     
    })
    .catch((err) => console.error(err))
};

function makeRequest (){ // Ce que le formulaire va envoyé

    const firstName = document.querySelector('#firstName').value
    const lastName = document.querySelector('#lastName').value
    const address = document.querySelector('#address').value
    const city = document.querySelector('#city').value
    const email = document.querySelector('#email').value

    const body = {
        contact: {
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            email: email
        },
        products: collectId ()// <-- array of product _id
    }; 
   
  return body 
};

function collectId (){ // Récupération de l'id des produits 
    const ids = [];
    for (let i = 0; i < cart.length; i++ ){
        const id = cart[i].id
        ids.push(id)
    };
    return ids
};

let firstName = document.querySelector('#firstName') // Input du firstName
firstName.addEventListener('change', (event) => { // On ecoute l'évenement au moment où l'input subit un changement
    const regexp = /^[A-Za-zÀ-ÖØ-öø-ÿ ,.'-]+$/; // Expression régulière qui correspond aux valeurs acceptés dans le input 
    const msg = document.querySelector('#firstNameErrorMsg') // Le texte a affiché si l'expression régulière retourne faux

    if (regexp.test(event.target.value) === false) { // Si il y a une autre valeur que celle indiqué dans l'expression régulière  elle retournera faux 
        msg.textContent = 'character not allowed';
    }else{
        msg.textContent = "";
    };
});

const lastName = document.querySelector('#lastName') // Input du lastName
lastName.addEventListener ('change', () => { 
    // Création de la reg exp pour la validation 
    const regexp =/^[A-Za-zÀ-ÖØ-öø-ÿ ,.'-]+$/
    const msg = document.querySelector('#lastNameErrorMsg')

    // Test du lastName
    if(regexp.test(lastName.value) === false) {
        msg.textContent = 'character not allowed'; 
    }else{
        msg.textContent = "";
    }
});
 
const address = document.querySelector('#address')  // Input de l'adresse
address.addEventListener('change', () => {

    // Création de la reg exp pour la validation 
    const regexp = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s,.'-]{3,}$/
    const msg = document.querySelector('#addressErrorMsg')

    // Test de l'adresse
    if(regexp.test(address.value) === false) {
        msg.textContent = 'character not allowed';
    }else{
        msg.textContent = "";
    }
});

const city = document.querySelector('#city') // Input de la ville
city.addEventListener('change', () => {
    // Création de la reg pour la validation 
    const regexp =/^[A-Za-zÀ-ÖØ-öø-ÿ ,.'-]+$/;
    const msg = document.querySelector('#cityErrorMsg')

    // Test city
    if(regexp.test(city.value) === false) {
    msg.textContent = 'character not allowed';
    }else{
        msg.textContent = "";
    }
});

const email = document.querySelector('#email') // Input du mail
email.addEventListener('change', () => {
    // Création de la reg exp pour la validation 
    const regexp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const msg = document.querySelector('#emailErrorMsg')

    // Test de l'email
    if(regexp.test(email.value) === false) {
        msg.textContent = 'character not allowed';
    }else{
        msg.textContent = "";
    }
  });
