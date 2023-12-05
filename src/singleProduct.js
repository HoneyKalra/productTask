(function () {



    const productInfo = {
        cart: JSON.parse(localStorage.getItem("cartItems")) || [],
        getProductId: function () {
            const searchParams = new URLSearchParams(window.location.search);
            return searchParams.get('id');
        },

        //getting elements 
        productNameElem: document.getElementById('productName'),
        productDescriptionElem: document.getElementById('productDescription'),
        productPriceElem: document.getElementById('productPrice'),
        productImageElem: document.getElementById('productImage'),
        imageThumbnailsElem: document.getElementById('imageThumbnails'),
        addToCartBtn: document.getElementById("js-cart-btn"),

        render: async function () {

            const productId = this.getProductId();
            try {
                const response = await fetch(`https://dummyjson.com/products/${productId}`);
                if (response.ok) {
                    const productData = await response.json();
                    //saving to local storage//
                    localStorage.setItem("cartItem", JSON.stringify(productData))
                    this.productImageElem.src = productData.thumbnail;
                    this.productNameElem.innerHTML = productData.title;
                    this.productDescriptionElem.innerHTML = productData.description;
                    this.productPriceElem.innerHTML = `$${productData.price}`;

                    productData.images.forEach((imageUrl) => {
                        const thumbnailElem = document.createElement("img");
                        thumbnailElem.src = imageUrl;
                        thumbnailElem.className = "w-40 h-32 mx-auto mt-32 p-2 border-2 cursor-pointer";
                        //EVENT LISTENER//
                        thumbnailElem.addEventListener("click", () => {
                            this.productImageElem.src = imageUrl;
                        });

                        this.imageThumbnailsElem.appendChild(thumbnailElem);
                    });
                }

                else {
                    throw new Error('Error');
                }
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }
        },
        addToCart: function () {
            let product = JSON.parse(localStorage.getItem("cartItem"));

            console.log(this.cart)

            // Check if the product is already in the cart
            const existingProductIndex = this.cart.findIndex(item => item.id === product.id);

            if (existingProductIndex === -1) {

                product.count = 1;
                this.cart.push(product);
            } else {

                this.cart[existingProductIndex].count++;


                console.log("Product count updated:", this.cart[existingProductIndex]);
            }

            // Optionally, you can update the UI or perform any other actions related to adding to the cart
            console.log("Product added to the cart:", product);
            console.log(this.cart);

            //save array to local storage//
            localStorage.setItem("cartItems", JSON.stringify(this.cart));
            //redirect to shopping cart page//
            window.location.href = "shopingCart.html"



        },
        bind: function () {

            this.render();

            // cart button event listener//
            this.addToCartBtn.addEventListener("click", () => {
                this.addToCart();
            })
        }
    };

    productInfo.bind();
})();