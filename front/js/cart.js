const cart = [];
const product = productFromCache ();

cart.forEach((product) => displayItem(product))

function productFromCache (){
    const numberOfProducts = localStorage.length;

    for (let i = 0; i < numberOfProducts; i++) {
        const product = localStorage.getItem(localStorage.key(i))
        const productObjet = JSON.parse(product)
        cart.push(productObjet)
        console.log(productObjet)
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

const toDelete = deleteTheProduct(product)

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

    const articleToDelete = document.querySelector(`article [data-id="${product.id}"][data-color="${product.color}"]`)
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
    


































// // Début Formulaire 

// let form = document.querySelectorAll('cart_order_form');

// console.log('cart_order_form');


// // Ecouter la modification du firstName
// firstName.addEventListener('change',function() {
//     validfirstName(this)
// })

// const validfirstName = function (firstName)  {
//     // Création de la reg exp pour la validation 
//     let firstNameRegExp = "^[a-zA-Z'-èé_çà^]$";
//   }

// // Test du firstName
// let testfirstName = firstNameRegExp.test(firstName.value);


// if(testfirstName) {
// } else {
//     document.querySelector('#firstNameErrorMsg').innerHTML = 'character not allowed';
// }


// // Ecouter la modification du lastName
// form.lastName.addEventListener('change',function() {
//     validlastName(this)
// })

// const validlastName = function (lastName)  {
//     // Création de la reg exp pour la validation 
//     let lastNameRegExp = "^[a-zA-Z'-èé_çà^]$"
//   }


// // Test du lastName
// let testlastName = lastNameRegExp.test(lastName.value)


// if(testlastName) {
// } else {
//     document.querySelector('#lastNameErrorMsg').innerHTML = 'character not allowed';
// }



// // Ecouter la modification de l'adresse
// form.adress.addEventListener('change',function() {
//     validadress(this)
// });

// const validadress = function (adress)  {
//     // Création de la reg exp pour la validation 
//         let adressRegExp = "^[a-zA-Z0-9&'èé-_çà°=^ù:;,]$";
//   };


//   // Test de l'adresse
// let testadress = adressRegExp.test(adress.value);


// if(test.adress)  {
// } else {
//     document.querySelector('#addressErrorMsg').innerHTML = 'character not allowed'
// }



// // Ecouter la modification city
// form.city.addEventListener('change',function() {
//     validcity(this)
// })

// const validcity = function (city)  {
//     // Création de la reg pour la validation 
//         let cityRegExp ="^[a-zA-Z'-èé_çà0-9]$"
//   };


//   // Test city
//   let testcity = adressRegExp.test(city.value)

  
//   if(test.adress) {
//   } else {
//       document.querySelector('#cityErrorMsg').innerHTML = 'character not allowed'
//   }
 



// // Ecouter la modification du mail 
// form.email.addEventListener('change',function() {
//     validemail(this)
// });

// const validemail = function (email)  {
//     // Création de la reg exp pour la validation 
//     let emailRegExp =  newRegExp ("^[a-zA-Z0-9.-_] + [@] {1} [a-zA-Z-_.] + [.] {1} + [a-z] {15} $" , 'g') 

//     // Test de l'email
//     let testemail = emailRegExp.test(email.value)
//     let emailErrorMsg = email.nextElementSibling
//     console.log(test.email)

//     if(testemail){
//         emailErrorMsg.innerHTML = 'Valid Email'
//     } else {
//         emailErrorMsg.innerHTML = 'Incorrect Email'
//     }
//   }

// // Fin du Formulaire

