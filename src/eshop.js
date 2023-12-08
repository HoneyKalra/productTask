//IIfe function//
(function () {
    //an object creeated which contains all the functions//
    const productInfo = {

        productsData: JSON.parse(localStorage.getItem("products")) || [],//all products which are getting displayed//
        cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],//products which user opted for buy now//
        //getting all the elements needed as a property on productInfo Object//
        buyNowButton: null,
        productsContainer: document.getElementById("js-products-container"),
        productSearchInput: document.getElementById("js-product-search"),
        errorDisplay: document.getElementById("js-error-display"),
        listedProduct: document.getElementById("js-productItem"),

        //functions that clear existing products in case of errors and painting new products//
        clearProducts: function () {

            return this.productsContainer.innerHTML = '';
        },

        //function handles error//
        displayError: function (errorMessage) {
            // Display error message whenever promise fails//
            this.errorDisplay.innerText = errorMessage;
        },
        //function displays the product results//
        displayProducts: function (products) {

            // Clear previous products
            this.clearProducts();

            //show errors if products is an object not array as array is sent if promise is success//
            if (products instanceof Error) {
                this.displayError(products.message);
                return;
            }
            //if products are fetched correctly//
            products.forEach((item) => {
                //creation //

                this.listedProduct = document.createElement("li");
                this.listedProduct.setAttribute('class', 'js-productItem  mt-6, p-4 bg-white border border-gray-300 rounded-md shadow-md, hover:shadow-lg transition-transform transform duration-300 ease-in-out hover:-translate-y-1 flex flex-col justify-center items-center');

                const link = document.createElement("a");
                const productImage = document.createElement("img");

                productImage.setAttribute('src', item.images[0]);
                productImage.className = 'w-32 h-32 object-cover';

                const productDescription = document.createElement('p');
                productDescription.innerText = item.title;
                productDescription.className = 'p-2 text-lg font-medium text-gray-800';

                const actualPrice = document.createElement('p');
                actualPrice.innerText = ` ${item.price}$`;
                actualPrice.className = 'p-2 text-lg font-medium text-gray-800 line-through';

                const discountedPrice = document.createElement('p');
                discountedPrice.innerText = ` ${(item.price * (100 - item.discountPercentage) / 100).toFixed(2)}$`;
                discountedPrice.className = 'p-2 text-lg font-medium text-gray-800';

                buyNowButton = document.createElement('button');
                buyNowButton.innerText = 'Buy Now';
                buyNowButton.id = 'buyNowButton';
                buyNowButton.className = 'bg-blue-500 hover:bg-blue-700 w-1/2 text-white font-bold py-2 px-4 rounded addTocart';
                //appending//
                link.appendChild(productImage);
                this.listedProduct.append(link, productDescription, actualPrice, discountedPrice, buyNowButton);
                this.productsContainer.className = 'grid grid-cols-1  sm:grid grid-cols-3 md:grid-cols-3 gap-8'
                this.productsContainer.appendChild(this.listedProduct)

            });
        },
        fetchProductsAndSave: async function () {

            try {
                const response = await fetch('https://dummyjson.com/products');
                if (response.ok) {
                    const responseJson = await response.json();
                    const productsData = responseJson.products;
                    localStorage.setItem("products", JSON.stringify(productsData));
                    this.displayProducts(this.productsData);//it wll display all PRODUCTS//

                }
                else {
                    throw new Error(`something went wrong : ${response.status}`)
                }


            }
            catch (error) {

                this.displayError(error.message)

            }

        },
        debouncedSearch: function (func, delay) {

            let timeOutId;//closure formed here//
            return (...args) => {

                clearTimeout(timeOutId)
                timeOutId = setTimeout(() => {
                    func.apply(this, args)

                }, delay)

            }
        },
        searchProducts: async function (productSearched) {
            try {
                if (productSearched === '') {
                    this.displayProducts(this.productsData);// if search is empty all products will display//
                    return;//early return//
                }

                const response = await fetch(`https://dummyjson.com/products/search?q=${productSearched}`);

                if (response.ok) {
                    const jsonData = await response.json();
                    console.log(jsonData)
                    this.displayProducts(jsonData.products);
                    return; //early return//
                }

                throw new Error(`Something Went Wrong Error: ${response.status} - ${response.statusText}`);
            }
            catch (error) {
                this.clearProducts();//emptying ul in case of //
                this.displayError(error);

            }
        },
        addToCart: function (productSelected) {

            // Check if the product is already in the cart
            const existingProductIndex = this.cartItems.findIndex(item => item.id === productSelected.id);

            if (existingProductIndex === -1) {
                productSelected.count = 1;
                this.cartItems.push(productSelected);
            }
            else {

                this.cartItems[existingProductIndex].count++;


            }
            //save array to local storage//
            localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
            //redirect to shopping cart page//
            window.location.href = "shopingCart.html"

        },

        bind: function () {

            this.fetchProductsAndSave();
            //this.productItems.addEventListener("click", this.imageMagnifier)
            //event listener on input search//
            const debouncedSearchProducts = this.debouncedSearch(this.searchProducts, 500)
            console.log(this.productItems)
            this.productSearchInput.addEventListener("input", (ev) => {
                const userInput = ev.target.value.trim();
                debouncedSearchProducts(userInput)
            });
            //buy now button click handler//
            document.addEventListener('click', (event) => {

                const clickedElement = event.target;
                if (clickedElement.tagName === 'BUTTON' && clickedElement.classList.contains('addTocart')) {
                    const selectedProduct = clickedElement.closest('li');

                    if (selectedProduct) {
                        // Access the product data from the container (assuming you have stored the product data in some way)
                        const productIndex = Array.from(this.productsContainer.children).indexOf(selectedProduct);
                        console.log(productIndex)
                        const clickedProduct = this.productsData[productIndex];
                        this.addToCart(clickedProduct)


                    }

                }


            })


        }






    }
    productInfo.bind();



})();
