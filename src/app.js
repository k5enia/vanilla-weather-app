function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
}
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}

function search(city) {
    let apiKey = "543f7a4d5a3d4a7cc135767b129715c9";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}

function displayTemperature(response) {
    console.log(response.data);
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let feelsLikeElement = document.querySelector("#feels-like");
    let humiditiyElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let maxTemperatureElement = document.querySelector("#max-temperature");
    let minTemperatureElement = document.querySelector("#min-temperature");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");

    celsiusTemp = response.data.main.temp;
    celsiusLow = response.data.main.temp_min;
    celsiusHigh = response.data.main.temp_max;

    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = (response.data.name);
    descriptionElement.innerHTML = (response.data.weather[0].description);
    feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);
    humiditiyElement.innerHTML = (response.data.main.humidity);
    windElement.innerHTML = Math.round(response.data.wind.speed);
    maxTemperatureElement.innerHTML = Math.round(response.data.main.temp_max);
    minTemperatureElement.innerHTML = Math.round(response.data.main.temp_min);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
  
  let feelsLikeElement = document.querySelector("#feels-like");
  feelsLikeElement.innerHTML = Math.round(fahrenheitTemp);

  let fahrenheitLow = (celsiusLow * 9) / 5 + 32;
  let fahrenheitLowElement = document.querySelector("#min-temperature");
  fahrenheitLowElement.innerHTML = Math.round(fahrenheitLow);

  let fahrenheitHigh = (celsiusHigh * 9) / 5 + 32;
  let fahrenheitHighElement = document.querySelector("#max-temperature");
  fahrenheitHighElement.innerHTML = Math.round(fahrenheitHigh);
}
  
function displayCelsiusTemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
  let feelsLikeElement = document.querySelector("#feels-like");
  feelsLikeElement.innerHTML = Math.round(celsiusTemp);

  let celsiusLowElement = document.querySelector("#min-temperature");
  celsiusLowElement.innerHTML = Math.round(celsiusLow);

  let celsiusHighElement = document.querySelector("#max-temperature");
  celsiusHighElement.innerHTML = Math.round(celsiusHigh);
}

let celsiusLow = null;
let celsiusHigh = null;
let celsiusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

search("Sydney");