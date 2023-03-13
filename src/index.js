// 
function getForecast(coordinates){
  console.log(coordinates);

  let apiKey = "46fac47dd8b8fa26d1b6852218ad3dfe";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);

  axios.get(apiUrl).then(displayWeekForecast);
  
}


//Function to display city informations about weather in HTML

function displayCityWeather(response) {
  console.log(response.data);

  //update global celsiusTemperature variable
  celsiusTemperature=response.data.main.temp;
  let temperature = Math.round(celsiusTemperature);
  
  //stock information from API
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
  
  //replace value in HTML
  let cityElement= document.querySelector("#city");
  cityElement.innerHTML = city;

  let countryElement = document.querySelector("#country");
  countryElement.innerHTML = country;

  
  let temperatureElement = document.getElementById("tempPrincipale");

  //everytime a city is searched put Celsius active by default
  if (temperatureElement.classList.contains('active')) {
  temperatureElement.innerHTML = temperature}
  else
  {celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = temperature;
  }

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

  getForecast(response.data.coord);
}

// search city ang get weather API response and execute displayCityWeather function to diplay information in HTML

function searchCity(city) {
  let apiKey = "46fac47dd8b8fa26d1b6852218ad3dfe";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayCityWeather);
}

//retrieve which city was search and execute search city function

function handleSubmit(event) {
  event.preventDefault(); //avoid reloading the page

  let city = document.querySelector("#inputCity").value;

  searchCity(city);
}

/////////////

// Geolocation API

//retrieve latitude and longitude of current position and execute displayCityWeather function to diplay information in HTML
function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "46fac47dd8b8fa26d1b6852218ad3dfe";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayCityWeather);
}

//once the event, get current position and execute retrievePosition function
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}


// update temperature in C or F

function changeTempInF(event) {
  event.preventDefault(); //avoid reloading the page

  // remove the active class from the celsius link and add active class to farhenheit link
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let fahrenheitTemperature = (celsiusTemperature * 9/5) + 32;
  let tempPrincipale = document.querySelector(".tempPrincipale");
  tempPrincipale.innerHTML =  Math.round(fahrenheitTemperature);
} 

function changeTempInC(event) {
  event.preventDefault(); //avoid reloading the page

  // remove the active class from the f link and add active class to c link
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  let tempPrincipale = document.querySelector(".tempPrincipale");
  tempPrincipale.innerHTML = Math.round(celsiusTemperature);
}

function displayWeekForecast(response){

  let forecast= response.data.daily;
  console.log(forecast);
  

  let weekForecastElement=document.querySelector("#week-forecast");

  //let days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  let weekForecastHTML = `<div class="col">`;
  
  forecast.forEach(function(forecastDay, index) {
    if (index <6) {
  weekForecastHTML=
    weekForecastHTML+
  `
  <div class="row dayPrevision py-3">
  <div class="jourDigits col-3">${formatDate(forecastDay.dt)}
   </div>
  <div class="emojisSecondaires col-3">
    <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="forecast weather image" width="85"/>
  </div>
  <div class="col-6">
    <div class="tempMinMax )"> <strong class="maxTemp">${Math.round(forecastDay.temp.max)}° </strong> |  ${Math.round(forecastDay.temp.min)}° </div>
  </div>
</div>
`;
}
});


weekForecastHTML=weekForecastHTML+ `</div>`;
weekForecastElement.innerHTML=weekForecastHTML;
}
//console.log(weekForecastHTML);

//Format the date according to timestamp
function formatDate(timestamp){
  let date= new Date(timestamp*1000);
  let day=date.getDay();
  let days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
  ];
  return days[day];

}

//////////////////////// functions above

//Create global variable to stock celsius temperature
let celsiusTemperature = null;

//display default city informations
searchCity("Sousse");

//listen when submit is clicked
let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", handleSubmit);

//When current position button is clicked, lauch getCurrentLocation function
let positionButton = document.querySelector("#geoposition");
positionButton.addEventListener("click", getCurrentLocation);

// click to update temperature in C or F
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", changeTempInF);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", changeTempInC);

//Display DATE of the DAY

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
  currentHour.innerHTML = `${hours}:${minutes.toString().padStart(2, '0')}`;
}

///