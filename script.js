document.addEventListener('DOMContentLoaded', () => {

    const getweather = async (cityName) => {
        try {
            let response = await fetch(`https://api.weatherapi.com/v1/current.json?key=333db0046b1e44018cc131847230209&q=${cityName}&aqi=no`);
            let data = await response.json();
            let display = document.getElementById("weatherDetails");
            display.innerHTML = `
                <h1>${data.location.name}</h1>
                <h2>${data.current.temp_c}°C</h2>
                <h3>${data.current.condition.text}</h3>
                <img src="${data.current.condition.icon}" alt="weather icon">
                <h4>${data.location.region}</h4>
                <h4>${data.location.country}</h4>`;
        } catch (e) {
            console.error(`Error fetching weather data: ${e.message}`);
        }
    };

    let cityName;
    let btn = document.getElementById("getWeatherBtn");

    btn.addEventListener("click", () => {
        cityName = document.getElementById("cityInput").value.trim();
        getweather(cityName);
    });

    const getJokeBtn = document.getElementById('getJokeBtn');
    getJokeBtn.addEventListener('click', () => {
        fetchJoke()
            .then(joke => displayJoke(joke))
            .catch(error => console.error('Error fetching joke:', error));
    });

    const getCatBtn = document.getElementById('getCatBtn');
    getCatBtn.addEventListener('click', () => {
        fetchCatImage()
            .then(imageUrl => displayCatImage(imageUrl))
            .catch(error => console.error('Error fetching cat image:', error));
    });

    function fetchJoke() {
        const url = 'https://v2.jokeapi.dev/joke/Any';
        return fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.type === 'single') {
                    return data.joke;
                } else {
                    return `${data.setup} ${data.delivery}`;
                }
            });
    }

    function displayJoke(joke) {
        document.getElementById('joke').textContent = joke;
    }

    function fetchCatImage() {
        const url = 'https://api.thecatapi.com/v1/images/search';
        return fetch(url)
            .then(response => response.json())
            .then(data => data[0].url);
    }

    function displayCatImage(imageUrl) {
        document.getElementById('catImage').innerHTML = `<img src="${imageUrl}" alt="Random Cat Image">`;
    }
});