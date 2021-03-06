//Date & day
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
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

//Display forecast response
function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;

  let maxTemperatureElement = document.querySelector("#max-temperature");
  let minTemperatureElement = document.querySelector("#min-temperature");

  maxTemperatureElement.innerHTML = Math.round(forecast[0].temp.max);
  minTemperatureElement.innerHTML = Math.round(forecast[0].temp.min);

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col-4 weather-forecast-day left-panel">
          <ul>
            <li>${formatDay(forecastDay.dt)}</li>
          </ul>
        </div>
        <div class="col-2 weather-forecast-img left-panel">
          <ul>
            <li>
              <img
                src="src/${forecastDay.weather[0].icon}.png"
                alt=""
                width="30"
              />
            </li>
          </ul>
        </div>
        <div class="col-6 weather-forecast-temp left-panel">
          <ul>
            <li>
              <span class="weather-forecast-temp-max">${Math.round(
                forecastDay.temp.max
              )}°</span
              ><span class="weather-forecast-temp-min">${Math.round(
                forecastDay.temp.min
              )}°</span>
            </li>
          </ul>
        </div>
      
      `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//Background

function changeBackground(response) {
  let iconId = response.data.current.weather[0].icon;

  if (iconId === "01d") {
    document.getElementById("weather-app").style.backgroundImage =
      "url(src/clear_day.png)";
    document.getElementById("forecast-row").style.backgroundColor =
      "rgba(203, 127, 78, 0.4)";
  } else if (iconId === "01n") {
    document.getElementById("weather-app").style.backgroundImage =
      "url(src/clear_night.png)";
    document.getElementById("forecast-row").style.backgroundColor =
      "rgba(68, 46, 150, 0.4)";
  } else if (iconId === "50d" || iconId === "50n") {
    document.getElementById("weather-app").style.backgroundImage =
      "url(src/atmosphere.png)";
    document.getElementById("forecast-row").style.backgroundColor =
      "rgba(184, 104, 83, 0.4)";
  } else if (
    iconId === "09d" ||
    iconId === "09n" ||
    iconId === "10d" ||
    iconId === "10n" ||
    iconId === "11d" ||
    iconId === "11n"
  ) {
    document.getElementById("weather-app").style.backgroundImage =
      "url(src/rain.png)";
    document.getElementById("forecast-row").style.backgroundColor =
      "rgba(94, 140, 168, 0.4)";
  } else if (
    iconId === "02d" ||
    iconId === "02n" ||
    iconId === "03d" ||
    iconId === "03n" ||
    iconId === "04d" ||
    iconId === "04n"
  ) {
    document.getElementById("weather-app").style.backgroundImage =
      "url(src/clouds.png)";
    document.getElementById("forecast-row").style.backgroundColor =
      "rgba(94, 140, 168, 0.4)";
  } else if (iconId === "13d" || "13n") {
    document.getElementById("weather-app").style.backgroundImage =
      "url(src/snow.png)";
    document.getElementById("forecast-row").style.backgroundColor =
      "rgba(116, 164, 194, 0.4)";
  }

  console.log(iconId);
}

function getIcon(coordinates) {
  let apiKey = "543f7a4d5a3d4a7cc135767b129715c9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(changeBackground);
  console.log(apiUrl);
}

//Display temperature response
function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let feelsLikeElement = document.querySelector("#feels-like");
  let humiditiyElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  let celsiusLow = null;
  let celsiusHigh = null;
  let celsiusTemp = null;

  console.log(response.data);

  celsiusTemp = response.data.main.temp;
  celsiusLow = response.data.main.temp_min;
  celsiusHigh = response.data.main.temp_max;

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);
  humiditiyElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute("src", `src/${response.data.weather[0].icon}.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
  getIcon(response.data.coord);
}

//API, searches & axios
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function search(city) {
  let apiKey = "543f7a4d5a3d4a7cc135767b129715c9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function getForecast(coordinates) {
  let apiKey = "543f7a4d5a3d4a7cc135767b129715c9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Sydney");
