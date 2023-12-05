

(function () {
    const user = {
        productsData: JSON.parse(localStorage.getItem("products")) || [],

        //errordisplay//
        errorDisplay: document.getElementById("js-error-display"),
        selectEl: document.getElementById("js-categories"),
        addCategories: async function () {
            try {
                const response = await fetch("https://dummyjson.com/products/categories");
                if (response.ok) {
                    const data = await response.json();
                    data.map((category) => {
                        let optionEl = document.createElement("option");
                        let optionValue = document.createTextNode(category);
                        optionEl.appendChild(optionValue);
                        this.selectEl.appendChild(optionEl);

                    })



                }



            }
            catch {


            }


        },
        displayProducts: function (products) {
            console.log(products);
            const productsList = document.getElementById("js-products");
            // Clear previous products
            productsList.innerHTML = '';
            //show errors if products is an object not array//
            if (products instanceof Error) {
                console.log("this entered")
                this.displayError(products.message);
                return;
            }
            products.forEach((item) => {
                const product = document.createElement("li");
                product.setAttribute('class', 'mt-10 p-1 flex max-w-md bg-white border-gray-200 rounded-lg overflow-hidden shadow');
                //adding an event listener on li click to redirect to single product page//
                product.addEventListener("click", () => {
                    //redirect to singleProduct page with product's id //
                    window.location.href = `singleProduct.html?id=${item.id}`;
                })
                const link = document.createElement("a");
                const productImage = document.createElement("img");
                productImage.setAttribute('src', item.images[0]);
                productImage.className = 'w-20 h-20 object-cover';
                const productDescription = document.createElement('p');
                productDescription.innerText = item.title;
                productDescription.className = 'p-2 text-lg font-medium text-gray-800';
                const productPrice = document.createElement('p');
                productPrice.innerText = `$ ${item.price}`;
                productPrice.className = 'p-2 text-lg font-medium text-gray-800';
                link.appendChild(productImage);
                product.append(link, productDescription, productPrice);
                productsList.append(product);
            });
        },

        storedApiDataToLocalStorage: async function () {
            try {
                const response = await fetch('https://dummyjson.com/products');
                if (response.ok) {
                    const jsonResponse = await response.json();
                    const data = jsonResponse.products;
                    localStorage.setItem("products", JSON.stringify(data));
                    this.displayProducts(this.productsData);
                } else {
                    throw new Error(`Something Went wrong Error: ${response.status} - ${response.statusText}`);
                }
            } catch (error) {
                this.displayProducts(error);
            }

        },
        filterProducts: function async() {
            const selectEl = document.getElementById("js-categories");

            //listen to change event on select tag//
            selectEl.addEventListener("change", async (ev) => {
                const selectedCategory = ev.target.value;

                try {
                    if (selectedCategory === "all") {
                        this.displayProducts(this.productsData);
                    } else {
                        const response = await fetch(`https://dummyjson.com/products/category/${selectedCategory}`);
                        if (response.ok) {
                            const jsonResponse = await response.json();
                            const dataOfProducts = jsonResponse.products;
                            this.displayProducts(dataOfProducts);
                        } else {
                            throw new Error(`Error: ${response.status} - ${response.statusText}`);
                        }
                    }
                } catch (error) {
                    this.displayError(error);
                }
            });


        },
        searchProducts: async function (searchTerm) {
            try {
                if (searchTerm === '') {
                    this.displayProducts(this.productsData);
                    return
                }

                const response = await fetch(`https://dummyjson.com/products/search?q=${searchTerm}`);

                if (response.ok) {
                    const jsonData = await response.json();
                    this.displayProducts(jsonData.products);
                    return
                }

                throw new Error(`Something Went Wrong Error: ${response.status} - ${response.statusText}`);
            } catch (error) {
                document.getElementById("js-products").innerHTML = ""//emptying ul//
                this.displayError(error);

            }
        },
        debouncedSearch: function (func, delay) {

            let timeOutId;
            return (...args) => {

                clearTimeout(timeOutId)
                timeOutId = setTimeout(() => {
                    func.apply(this, args)

                }, delay)

            }



        },
        displayError: function (errorMessage) {
            // Display error message on the UI
            this.errorDisplay.innerText = errorMessage;
        },


        bind: function () {
            this.addCategories();
            this.storedApiDataToLocalStorage();
            this.filterProducts();
            //event listener on input search//
            const searchedProductInput = document.getElementById("js-product-search");
            const debouncedSearchProducts = this.debouncedSearch(this.searchProducts, 1000)
            searchedProductInput.addEventListener("input", (ev) => {
                const userInput = ev.target.value.trim();
                debouncedSearchProducts(userInput)
            });

        },
    }

    user.bind();
})();
