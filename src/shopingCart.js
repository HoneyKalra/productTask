
(function () {
    const shoppingCart = {

        getCartItems: function () {

            const cartItems = JSON.parse(localStorage.getItem("cartItems"));
            return cartItems;

        },
        //getting elements and storing them as a key//
        cartItemsWrapper: document.getElementById("js-cart-container"),
        totalDisplay: document.getElementById("js-total"),
        checkOutBtn: document.getElementById("js-proceed-checkout"),


        displayItems: function () {
            this.cartItemsWrapper.innerHTML = "";//clear the old data//
            const cartProducts = this.getCartItems();//get from local storage array of products added//
            cartProducts.map((product) => {
                //creation of elements//
                const cartItem = document.createElement('li');
                cartItem.className = 'bg-white p-4 shadow-md rounded-md mb-4 flex items-center';

                const img = document.createElement('img');
                img.src = product.thumbnail;
                img.alt = product.name;
                img.className = 'w-32 max-w-4 mr-4';

                const details = document.createElement('div');
                details.className = 'flex-1';

                const productName = document.createElement('h3');
                productName.className = 'text-lg font-semibold';
                productName.innerText = product.brand;

                const discountedPrice = document.createElement('p');
                discountedPrice.innerText = ` ${(product.price * (100 - product.discountPercentage) / 100 * product.count).toFixed(2)}$`;
                discountedPrice.className = 'p-2 text-lg font-medium text-gray-800';

                const quantity = document.createElement('p');
                quantity.className = 'text-gray-600';
                quantity.innerText = `Quantity: ${product.count}`;
                //appending
                details.appendChild(productName);
                details.appendChild(discountedPrice);
                details.appendChild(quantity);

                const actions = document.createElement('div');
                actions.className = 'text-right';
                const quantityContainer = document.createElement('div');
                quantityContainer.className = 'flex items-center';

                const plusButton = document.createElement('button');
                plusButton.className = 'text-blue-500 hover:underline  add';
                plusButton.innerHTML = "+";

                const quantityDisplay = document.createElement('span');
                quantityDisplay.className = 'mx-2';
                quantityDisplay.innerText = product.count;

                const minusButton = document.createElement('button');
                minusButton.className = 'text-red-500 hover:underline  minus';
                minusButton.innerHTML = '-';

                quantityContainer.appendChild(plusButton);
                quantityContainer.appendChild(quantityDisplay);
                quantityContainer.appendChild(minusButton);
                actions.appendChild(quantityContainer);
                cartItem.appendChild(img);
                cartItem.appendChild(details);
                cartItem.appendChild(actions);
                this.cartItemsWrapper.appendChild(cartItem)

            })
            if (this.totalDisplay) {
                this.totalDisplay.innerText = `Total: $${this.getTotal()}`;
            }


        },
        updateCartItemQuantity: function (product, newQuantity) {
            console.log(product, newQuantity)
            const cartProducts = this.getCartItems();
            const updatedCart = cartProducts.map((item) => {
                if (item.id === product.id) {
                    return { ...item, count: newQuantity };
                }
                return item;
            });
            //updating local storage with updated data//
            localStorage.setItem("cartItems", JSON.stringify(updatedCart));
            this.displayItems();
        },
        getTotal: function () {
            const cartProducts = this.getCartItems();
            let total = 0;

            cartProducts.forEach((product) => {
                const discountedPrice = (product.price * (100 - product.discountPercentage) / 100);
                total += discountedPrice * product.count;
            });

            return total.toFixed(2);
        },

        bind: function () {

            this.displayItems();
            //event lisneter on buy now//
            this.cartItemsWrapper.addEventListener("click", (event) => {
                const targetedElement = event.target;

                if (targetedElement.classList.contains("add")) {

                    // Increment of quantity//
                    const selectedProduct = targetedElement.closest("li");
                    if (selectedProduct) {
                        const productIndex = Array.from(this.cartItemsWrapper.children).indexOf(selectedProduct);
                        console.log(productIndex)
                        const clickedProduct = this.getCartItems()[productIndex];
                        let productId = clickedProduct.id
                        const product = this.getCartItems().find((item) => item.id === productId);
                        const newQuantity = product.count + 1;
                        this.updateCartItemQuantity(product, newQuantity);
                    }

                }
                else if (targetedElement.classList.contains("minus")) {

                    // Decrement of quantity//
                    const selectedProduct = targetedElement.closest("li");
                    if (selectedProduct) {
                        const productIndex = Array.from(this.cartItemsWrapper.children).indexOf(selectedProduct);
                        console.log(productIndex)
                        const clickedProduct = this.getCartItems()[productIndex];
                        let productId = clickedProduct.id
                        const product = this.getCartItems().find((item) => item.id === productId);
                        const newQuantity = product.count - 1;
                        this.updateCartItemQuantity(product, newQuantity);
                    }
                }
            });




        }

    }

    shoppingCart.bind();


})();
