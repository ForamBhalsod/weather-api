document.getElementById('weather-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const city = document.getElementById('city').value;
    const apiUrl = `http://www.7timer.info/bin/api.pl?lon=0&lat=0&product=civil&output=json&city=${city}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('weather-data').innerHTML = '<p>Error retrieving weather data. Please try again.</p>';
        });
});

function displayWeather(data) {
    const weatherDataDiv = document.getElementById('weather-data');
    weatherDataDiv.innerHTML = ''; // Clear previous data

    data.dataseries.forEach(day => {
        const date = new Date(day.date * 1000).toLocaleDateString();
        const temp = day.temp2m.max;
        const weather = day.weather;

        const weatherCard = document.createElement('div');
        weatherCard.className = 'weather-card';
        weatherCard.innerHTML = `
            <h5>${date}</h5>
            <p>Max Temperature: ${temp}°C</p>
            <p>Weather: ${weather}</p>
        `;
        weatherDataDiv.appendChild(weatherCard);
    });
}