
async function getProducts() {
    let response = await fetch("https://fakestoreapi.com/products");
    if (response.ok) {
        const products = await response.json();
        localStorage.setItem("products", JSON.stringify(products))

    }
    else {
        alert("HTTP-Error: " + response.status);

    }


}
getProducts();
//POSTING REQUEST //
let product = {
    category
        :
        "men's clothings",
    description
        :
        "Your perfect package for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",

    image
        :
        "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    price
        :
        109.95,
    rating
        :
        { rate: 3.9, count: 120 },
    title
        :
        "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",

}
let products = [];
async function postProduct() {

    let response = await fetch('https://fakestoreapi.com/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(product)
    });
    let result = await response.json();
    console.log(result)
    products.push(result);
    localStorage.setItem("products", JSON.stringify(products));




}
//calling post product function//
postProduct();


async function fetchProducts() {
    const controller = new AbortController();
    const signal = controller.signal;// in controller we get signal property//

    const response = await fetch('https://fakestoreapi.com/products', { signal });

    if (response.ok) {
        const data = await response.json();
        console.log(data);
    } else {
        console.error('Error:', response.status, response.statusText);
    }
}

// To abort the request:
const abortFetch = async () => {
    controller.abort();
};

// Call the fetchData function
fetchProducts();