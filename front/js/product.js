const queryString =  new URLSearchParams(window.location.search);
const id = queryString.get("id");

let product = [];

const button = document.querySelector('#addToCart')
const quantity = document.querySelector('#quantity')




fetch(`http://localhost:3000/api/products/${id}`) 
    .then (response => response.json())
    .then ((data) =>  {
        product = data
        

        // Affichage de l'image 
        const item = document.querySelector('.item__img');
        const image = document.createElement('img');
        image.src = `${product.imageUrl}`;
        image.altTxt = `${product.altTxt}`;
        item.appendChild (image);

        // Affichage du Titre 
        const title = document.querySelector('#title');
        title.innerHTML += `${product.name}`;

        // Affichage du prix 
        const price = document.querySelector('#price');
        price.innerHTML += `${product.price}`;

        // Affichage descrption 
        const description = document.querySelector('#description');
        description.innerHTML += `${product.description}`;

        // Selection des couleurs   
        let productcolor = document.getElementById('colors');
     
        for ( i = 0; i < product.colors.length; i++) {
            productcolor.innerHTML += `<option value="${product.colors[i]}">${product.colors[i]}</option>`
        };


        button.addEventListener('click', function ()  {


            const choiceColor = document.querySelector('#colors').value
            const key = `${product._id}-${choiceColor}`
            let selection = {
                                id : `${product._id}`,
                                color : choiceColor,
                                quantity : Number (quantity.value),
                                image : `${product.imageUrl}`,
                                alt :  `${product.altTxt}`,
                                name : `${product.name}`
                            };

        localStorage.setItem(key,JSON.stringify(selection));

        })


    })

////////////////////////////////////////////////////AJOUT DU PANIER /////////////////////////////////////////////////      


    // function addCart () {

    //     const button = document.querySelector('#addToCart');

    //     button.addEventListener('click', function ()  {

    //      let productCart = JSON.parse(localStorage.getItem ("productCache"));  

    //         if ( quantity > 0 && quantity <= 100) { 

    //             const quantity = document.querySelector('#quantity').value
    //             const choiceColor = document.querySelector('#colors').value

    //             let selection = {
    //                 product : product._id,
    //                 color : choiceColor,
    //                 quantity : Number (quantity),
    //                 image : product.imageUrl,
    //                 alt :  product.altTxt,
    //                 name : product.name
    //             };
                
    //         if (productCart) {
    //             const productCacheSame = productCart.find((product) => product.id === newProductId && product.color === newProductColor)
    //             if(productCart) {
    //                 let newQuantity = parseInt
    //             }

    //         }
                
    //         };

            
            
    //     })
    //    } 
      

        

 
    
        
    

    
    
    
   
    
    
    