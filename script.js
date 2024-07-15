const secretKey = 'gcZgh9g7XAQqYb6O';
const encryptedApiKey = 'V1JiAw4OAQ9hJ2kQblNVeVICYwIJAAMEPHZiQWpWAyk=';
const decryptedApiKey = xorDecrypt(secretKey, encryptedApiKey);

const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?&units=metric&q=';
const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${decryptedApiKey}`);
        const data = await response.json();

        if (response.status === 404) {
            document.querySelector('.error').style.display = "block";
            document.querySelector('.weather').style.display = "none";
        } else {
            document.querySelector('.city').innerHTML = data.name;
            document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°C';
            document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
            document.querySelector('.wind').innerHTML = data.wind.speed + ' km/hr';

            // Set weather icon based on weather condition
            if (data.weather[0].main === 'Clouds') {
                weatherIcon.src = 'images/clouds.png';
            } else if (data.weather[0].main === 'Clear') {
                weatherIcon.src = 'images/clear.png';
            } else if (data.weather[0].main === 'Rain') {
                weatherIcon.src = 'images/rain.png';
            } else if (data.weather[0].main === 'Drizzle') {
                weatherIcon.src = 'images/drizzle.png';
            } else if (data.weather[0].main === 'Mist') {
                weatherIcon.src = 'images/mist.png';
            }

            document.querySelector('.weather').style.display = "block";
            document.querySelector('.error').style.display = "none";
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function handleSubmit() {
    const city = searchBox.value.trim();
    if (city) {
        checkWeather(city);
    }
}

searchBtn.addEventListener('click', handleSubmit);

searchBox.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        handleSubmit();
    }
});

function xorDecrypt(key, encryptedText) {
    let text = atob(encryptedText); // Decode the base64 encoded text
    let decrypted = '';
    for (let i = 0; i < text.length; i++) {
        decrypted += String.fromCharCode(key.charCodeAt(i % key.length) ^ text.charCodeAt(i));
    }
    return decrypted;
}

// Initial call to fetch weather data
// You might want to set a default city or handle this based on user interaction
// For example, checkWeather('London') or checkWeather('New York')
