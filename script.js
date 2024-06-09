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

     

     
    
   

    
 

    
});