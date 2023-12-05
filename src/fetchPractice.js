async function fetchData() {
    const url = 'https://spotify-web2.p.rapidapi.com/search/?q=%3CREQUIRED%3E&type=multi&offset=0&limit=10&numberOfTopResults=5';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '8697116461mshaaa64702ad44df0p1ca14djsn7a9e71609054',
            'X-RapidAPI-Host': 'spotify-web2.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        if (response.ok) {
            const result = await response.json();

        }

        console.log(result);
    } catch (error) {
        console.error(error);
    }
}
fetchData()