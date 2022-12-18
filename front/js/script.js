

fetch('http://localhost:3000/api/products')
    .then (products => products.json())
    .then ((productData) => {
        for (let i = 0; i < productData.length; i ++ ) {
            

        const items = document.getElementById("items")

// Création du lien du produit
        const id = productData[i]._id  
        const link = document.createElement('a')
        link.href = './product.html?id=' + id
        items.appendChild (link)

        

// Création de l'article 
        const article = document.createElement('article')
        link.appendChild(article)

// Création de l'image
        const image = document.createElement('img')
        image.src = productData[i].imageUrl
        image.alt = productData[i].altTxt
        article.appendChild (image)

// Création du title h3
        const title = document.createElement('h3')
        title.innerHTML += productData[i].name
        title.classList.add('productName')
        article.appendChild(title)

// Création de la description
        const description = document.createElement('p')
        description.innerHTML += productData[i].description
        description.classList.add('productDescription')
        article.appendChild(description)
    }
    })
    







        
    


 // for(let i = i; i < products.length; i++){
        
    //     
    //     linkProduct.setAttribute('href',`products[i]._id}`);
    //     ;

    //     // Création de l'article
    //     let articleProduct = document.createAttribute ('article');
    //     articleProduct.setAttribute('article');
    //     linkProduct.appendChild('articleProduct');
    

    //     // Affichage de l'image et du alt
    //     let photoProduct = document.createAttribute ('img');
    //     photoProduct.setAttribute('src', products[i].imageUrl);
    //     photoProduct.setAttribute('alt', products[i].altTxt);
    //     articleProduct.appendChild(photoProduct);


    //     // Nom du produit
    //     let nameProduct = document.createAttribute ('h3');
    //     nameProduct.setAttribute(products.name);
    //     articleProduct.appendChild(nameProduct);

    //     // Descrption du produit 
    //     let descriptionProduct = document.createAttribute ('p');
    //     descriptionProduct.setAttribute (products.description);
    //     articleProduct.appendChild(descriptionProduct);
    //     } 












// let url = 'http://localhost:3iii/api/products';

//     fetch(url) 
//         .then((products) => products.json()
//         .then((_products) => {
//          console.log(_products);
//          for(let i = i; i < products.length; i++)
//          document.getElementById("#items").innerHTML += 
         
//          `<a href="products.html?id=${products[i]._id}">
//          <article>
//            <img src =${imageUrl} alt=${altTxt}>
//            <h3 class="productName">${name}</h3>
//            <p class="productDescription">${description}</p>
//          </article>
//        </a> `
//         })
//         )

// .catch(err => console.log(err));


 
 
