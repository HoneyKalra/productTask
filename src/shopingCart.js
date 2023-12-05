(function () {
    const shoppingCart = {




        getCartItems: function () {

            let cartItems = JSON.parse(localStorage.getItem("cartItems"));
            return cartItems;

        },
        displayItems: function () {
            const cartProducts = this.getCartItems();
            console.log(cartProducts);
            cartProducts.map((product) => {
                const cartContainer = document.getElementById("cart-container")
                const cartItem = document.createElement('li');
                cartItem.className = 'bg-white p-4 shadow-md rounded-md mb-4 flex items-center';
                const img = document.createElement('img');
                img.src = product.thumbnail;
                img.alt = product.name;
                img.className = 'max-w-16 mr-4';

                const details = document.createElement('div');
                details.className = 'flex-1';
                const productName = document.createElement('h3');
                productName.className = 'text-lg font-semibold';
                productName.innerText = product.brand;
                const price = document.createElement('p');
                price.className = 'text-gray-600';
                price.innerText = `Price: $${product.price.toFixed(2)}`;
                const quantity = document.createElement('p');
                quantity.className = 'text-gray-600';
                quantity.innerText = `Quantity: ${product.count}`;

                details.appendChild(productName);
                details.appendChild(price);
                details.appendChild(quantity);

                const actions = document.createElement('div');
                actions.className = 'text-right';
                const quantityContainer = document.createElement('div');
                quantityContainer.className = 'flex items-center';

                const plusButton = document.createElement('button');
                plusButton.className = 'text-blue-500 hover:underline';
                plusButton.innerHTML = '<i class="fas fa-plus"></i>';

                const quantityDisplay = document.createElement('span');
                quantityDisplay.className = 'mx-2';
                quantityDisplay.innerText = product.count;

                const minusButton = document.createElement('button');
                minusButton.className = 'text-red-500 hover:underline';
                minusButton.innerHTML = '<i class="fas fa-minus"></i>';

                quantityContainer.appendChild(plusButton);
                quantityContainer.appendChild(quantityDisplay);
                quantityContainer.appendChild(minusButton);

                actions.appendChild(quantityContainer);

                cartItem.appendChild(img);
                cartItem.appendChild(details);
                cartItem.appendChild(actions);
                cartContainer.appendChild(cartItem)




            })





        },
        bind: function () {

            this.displayItems();


        }
















    }

    shoppingCart.bind();


})();