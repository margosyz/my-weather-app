// DATE of the DAY

let now = new Date();
let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let year = now.getFullYear();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let month = months[now.getMonth()];

let currentDate = document.getElementsByClassName("currentDate")[0];
console.log(currentDate);
if (currentDate) {
  currentDate.innerHTML = `${day} ${month} ${date}, ${year}`;
}
let currentHour = document.getElementsByClassName("currentHour")[0];
console.log(currentHour);
if (currentHour) {
  currentHour.innerHTML = `${hours}:${minutes}`;
}

// click to update temperature in C or F
function changeTempInC(event) {
  event.preventDefault(); //avoid reloading the page
  let tempPrincipale = document.querySelector(".tempPrincipale");
  tempPrincipale.innerHTML = "19";
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", changeTempInC);

function changeTempInF(event) {
  event.preventDefault(); //avoid reloading the page
  let tempPrincipale = document.querySelector(".tempPrincipale");
  tempPrincipale.innerHTML = "66";
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", changeTempInF);

///////////////

//Function to display city informations about weather

function displayCityWeather(response) {
  console.log(response.data);

  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let country = response.data.sys.country;
  let ressenti = Math.round(response.data.main.feels_like);
  let tempMax = Math.round(response.data.main.temp_max);
  let tempMin = Math.round(response.data.main.temp_min);
  let humidity = response.data.main.humidity;
  let windSpeed = Math.round(response.data.wind.speed);
  let description = response.data.weather[0].description;
  description = description.charAt(0).toUpperCase() + description.slice(1);
  let weatherIcon = response.data.weather[0].icon;
  

  let cityElement= document.querySelector("#city");
  cityElement.innerHTML = city;

  let countryElement = document.querySelector("#country");
  countryElement.innerHTML = country;

  let temperatureElement = document.getElementById("tempPrincipale");
  temperatureElement.innerHTML = temperature;

  let descriptionElement = document.querySelector("#descriptionPrincipale");
  descriptionElement.innerHTML = description;

  let minTemp = document.querySelector("#mainTempMin");
  minTemp.innerHTML = tempMin;

  let maxTemp = document.querySelector("#mainTempMax");
  maxTemp.innerHTML = tempMax;

  let feelsLikeElement = document.querySelector("#ressenti");
  feelsLikeElement.innerHTML = ressenti;

  let humidityElement= document.querySelector("#humidity");
  humidityElement.innerHTML = humidity;

  let windSpeedElement = document.querySelector("#windSpeed");
  windSpeedElement.innerHTML = windSpeed;

  let mainImage=document.querySelector('#mainImage');
  mainImage.setAttribute("src",`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`);
  mainImage.setAttribute("alt", description);
}

// search city

function searchCity(city) {
  let apiKey = "46fac47dd8b8fa26d1b6852218ad3dfe";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayCityWeather);
}

//search city, make an API Call, once we get the response, display city and temperature

function handleSubmit(event) {
  event.preventDefault(); //avoid reloading the page

  let city = document.querySelector("#inputCity").value;

  searchCity(city);
}

searchCity("Paris");

//listen when submit is clicked
let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", handleSubmit);

/////////////

// Geolocation API

//retrieve latitude and longitude of current position
function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "46fac47dd8b8fa26d1b6852218ad3dfe";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayCityWeather);
}

//When current position button is clicked, lauch retrieve Position function

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let positionButton = document.querySelector("#geoposition");
positionButton.addEventListener("click", getCurrentLocation);
