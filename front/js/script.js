

fetch('http://localhost:3000/api/products')
    .then (products => products.json())
    .then ((productData) => {
        for (let i = 0; i < productData.length; i++ ) {
            

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
    }).catch((err) => console.error(err))

    







        
    


 
 
 
