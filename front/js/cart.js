
const cart = [];
const product = productFromCache ();

cart.forEach((product) => displayItem(product))

function productFromCache (){
    const numberOfProducts = localStorage.length;

    for (let i = 0; i < numberOfProducts; i++) {
        const product = localStorage.getItem(localStorage.key(i))
        const productObjet = JSON.parse(product)
        cart.push(productObjet)
    }; 
};



function displayItem (product) { //Affichage du produit 
const section = document.querySelector('#cart__items')

const article = articleItem (product) // Article qui contient l'ensemble du produit
section.appendChild (article)

const image = imageItem (product) // Image du produit 
article.appendChild(image)

const content = itemContent (product) // Div qui contient description + quantity + delete
article.appendChild(content)

const total = Total () // Div qui contient la quantity totale et price

};



function articleItem (product) { // Article du produit
    const article = document.createElement("article")
    article.classList.add('cart__item')
    article.dataset.id = `${product.id}`
    article.dataset.color = `${product.color}`
    return article
};


function imageItem (product) { // Image du produit
    const divImage = document.createElement('div')
    divImage.classList.add('cart__item__img')

    const image = document.createElement('img')
    image.src = `${product.image}`
    image.alt =`${product.alt}`

    divImage.appendChild(image)

    return divImage
};


function itemContent (product) { // Contient la div itemDescription + div cartSetting 
    const div = document.createElement('div')
    div.classList.add('cart__item__content')
    const description = itemDescription (product)
    const setting = cartSetting(product)


    div.appendChild(description)
    div.appendChild(setting)

    return div
};


function itemDescription (product) { 
    const divDescription = document.createElement('div')
    divDescription.classList.add('cart__item__content__description')
    
    const h2 = document.createElement('h2')
    h2.innerHTML += `${product.name}`
    
    const color = document.createElement('p')
    color.innerHTML += `${product.color}`
    
    const price = document.createElement('p')
    price.innerHTML += `${product.price}` + " €"
    
    
    divDescription.appendChild(h2)
    divDescription.appendChild(color)
    divDescription.appendChild(price)

    return divDescription
};



function cartSetting (product) { // Div qui contient la div productQuantity + la div Delete 
    const divSetting = document.createElement('div')
    divSetting.classList.add('cart__item__content__settings')
    const theQuantity = productQuantity (product)
    const deleteProduct = Delete (product)

    divSetting.appendChild(theQuantity)
    divSetting.appendChild(deleteProduct)

    return divSetting
};


function productQuantity (product) {
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
    input.value = product.quantity

    input.addEventListener('input', () => updatePriceandQuantity (product.id, input.value, product))

    divSettingQuantity.appendChild(input)

    return divSettingQuantity
};

function updatePriceandQuantity (id,newValue, product) {
    const productToUpdate = cart.find((product) => product.id === id)
    productToUpdate.quantity = Number (newValue)
    product.quantity = productToUpdate.quantity
    const key = `${product.id}-${product.color}`

    const saveNewProduct = JSON.stringify(product)
    localStorage.setItem(key,saveNewProduct)

    Total();
}

function Delete (product) {
    const divSettingDelete = document.createElement('div')
    divSettingDelete.classList.add('cart__item__content__settings__delete')

    const deleteProduct = document.createElement('p')
    deleteProduct.classList.add('deleteItem')
    deleteProduct.innerHTML += 'Delete' 
    
    divSettingDelete.appendChild(deleteProduct)

    divSettingDelete.addEventListener('click',() => deleteTheProduct  (product))
     
    return divSettingDelete
};

function deleteTheProduct (product) {
    const productToDelete = cart.findIndex ((item) => item.id  === product.id && item.color === product.color )
    cart.splice(productToDelete,1)

    Total();

    const key = `${product.id}-${product.color}`
    localStorage.removeItem(key)

    const articleToDelete = document.querySelector(`article[data-id="${product.id}"][data-color="${product.color}"]`)
    articleToDelete.remove()

};

function Total (){ 
    const totalQuantity = document.querySelector('#totalQuantity')
    const total = cart.reduce((total,product) => total + product.quantity,0)
    totalQuantity.textContent= total 

    const totalPrice = document.querySelector('#totalPrice')
    const price = cart.reduce((total,product) => total + product.price,0)
    totalPrice.textContent = price 
}


/////////////////////////////////////////////////////// FORM ////////////////////////////////////////////////////////////////

const orderButton = document.querySelector('#order')
orderButton.addEventListener('click', (event) => submitForm (event))

function submitForm (event) {
    event.preventDefault()
    if (cart.length === 0) {
        alert("please select a product")
        return
    }

    const request = makeRequest ();
    fetch("http://localhost:3000/api/products/order",{
        method: "POST",
        body: JSON.stringify(request),
        headers:{
            "Content-Type":"application/json"
        }
    }) 
    .then (response => response.json())
    .then ((product) => console.log(product))

    firstName();
    lastName();
    address();
    city();
    email();
};

function makeRequest (){

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

function collectId (){
    const numberOfProducts = localStorage.length
    const ids = [];
    for (let i = 0; i < numberOfProducts; i++ ){
        const key = localStorage.key(i)
        const id = key.split("-")[0]
        ids.push(id)
    };
    return ids
};


function firstName () {
    const firstName = document.querySelector('#firstName').value
     
    // Création de la reg exp pour la validation 
    const regexp = /^[a-zA-Z'-èé_çà^]$/
    
    // Test du firstName
    if(regexp.test(firstName) === false) {
    const msg = document.querySelector('#firstNameErrorMsg')
    msg.textContent = 'character not allowed';
    return true
    }
    return false
};


function lastName () {
    const lastName = document.querySelector('#lastName').value

    // Création de la reg exp pour la validation 
    const regexp = /^[a-zA-Z'-èé_çà^]$/
  
    // Test du lastName

    if(regexp.test(lastName) === false) {
        const msg = document.querySelector('#lastNameErrorMsg')
        msg.textContent = 'character not allowed';
        return true
    }
    return false
}
 

function address () {
    const address = document.querySelector('#address').value

// Création de la reg exp pour la validation 
    const regexp = /^[a-zA-Z0-9'-èé_çà]$/

// Test de l'adresse

    if(regexp.test(address) === false) {
        const msg = document.querySelector('#addressErrorMsg')
        msg.textContent = 'character not allowed';
        return true
    }
    return false
}




function city () {
    const city = document.querySelector('#city').value

// Création de la reg pour la validation 
    const regexp =/^[a-zA-Z0-9'-èé_çà]$/

// Test city

  if(regexp.test(city) === false) {
    const msg = document.querySelector('#cityErrorMsg')
    msg.textContent = 'character not allowed';
    return true
}
return false
}

 
function email () {
    const email = document.querySelector('#email').value

// Création de la reg exp pour la validation 
    const regexp = /^[a-zA-Z0-9.-_]+[@](1) [a-zA-Z-_.]+[.](1)+[a-z](15)$/

// Test de l'email

    if(regexp.test(email) === false) {
        const msg = document.querySelector('#emailErrorMsg')
        msg.textContent = 'character not allowed';
        return true
    }
    return false
  }

/////////////////////////////////// Fin du Formulaire//////////////////////////////////////////////////

