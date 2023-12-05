

const url = 'https://weatherapi-com.p.rapidapi.com/current.json?q=53.1%2C-0.13';
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '0fd0787651msh11fdc1f97d21e7bp16c64fjsn0a7b3068cc1e',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
};
async function getData() {
    try {
        const response = await fetch(url);
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error(error);
    }

}

getData();