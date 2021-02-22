//this creates a variable that detects the current date. This is provided by JS
let now = new Date();

// Function that populates document with current day and time
function currentDayAndTime(timestamp) {

  let daysIndex = [
    `Sunday`,
    `Monday`,
    `Tuesday`,
    `Wednesday`,
    `Thursday`,
    `Friday`,
    `Saturday`
  ];

  let dd = daysIndex[now.getDay()];
  let hh = now.getHours();
  if (hh < 10) {
    hh = `0${hh}`;
  }
  let min = now.getMinutes();
  if (min < 10) {
    min = `0${min}`;
  }

  // This helps me show current hour with AM or PM label

  let meridiem = now.getHours();
  if (meridiem < 12) {
    meridiem = "AM";
  } else {
    meridiem = "PM";
  }
  return `${dd}, ${hh}:${min} ${meridiem}`;
}

// here's where the currentDayAndTime function ends

// Here I'm calling the fuction above and ordering it to present the info on the document.
// If I don't call the fuction nothing will happen

let dayAndTime = document.querySelector("#day-and-time");
dayAndTime.innerHTML = currentDayAndTime();

// Function used to extract current date and year
function currentDateAndYear() {
  let monthsIndex = [
    `January`,
    `February`,
    `March`,
    `April`,
    `May`,
    `June`,
    `July`,
    `August`,
    `September`,
    `October`,
    `November`,
    `December`
  ];
  let month = monthsIndex[now.getMonth()];
  let yy = now.getFullYear();
  let date = now.getDate();
  return `${month} ${date}, ${yy}`;
}

// End of currentDateAndYear function

// Calling function currentDateAndYear to populate document with info

let monthAndYear = document.querySelector("#month-and-year");
monthAndYear.innerHTML = currentDateAndYear();

// Function that take city the user have typed
// Then present it into the html element (document)

function getWeatherConditions(response) {
  console.log(response.data);
  document.querySelector("#city-name2").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = `${Math.round(
    response.data.main.temp
  )}°`;
  //this uses the same weather API to populate the icon associated to "current weather"
  document.querySelector("#icon").setAttribute("src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  
  document.querySelector("#weather-description").innerHTML = response.data.weather[0].main;
  document.querySelector("#feels-like").innerHTML = `Feels like ${Math.round(
    response.data.main.feels_like
  )}°`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} mph`;

  celsiusTemp = response.data.main.temp;
}

//this function helps to format the time presented with the forecast info

function formatHours(timestamp) {
  let now = new Date(timestamp);
    let hh = now.getHours();
  if (hh < 10) {
    hh = `0${hh}`;
  }
  let min = now.getMinutes();
  if (min < 10) {
    min = `0${min}`;
  }
  return `${hh}:${min}`;
}

//This function get the forecast from the forecast API and presents it into the HTML
function getForecast(response) {
  console.log(response);
  let forecastElement = document.querySelector("#weather-forecast");
  forecastElement.innerHTML = null;
  let forecast = null; // this is to clean up the document with each search 

  for (let index = 0; index < 6; index++) { //this loops until the defined item in a array
  
    forecast = response.data.list[index];
    
    //Here JS is injecting info into the document. 
    forecastElement.innerHTML += //the += tells JS to aggregates the info from the array to the prior one
      `<div class="col">
          <div class="card text-center"> 
            <div class="card-body bg-transparent">
              <h5 class="card-title"> ${formatHours(forecast.dt * 1000)}</h5>
              <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" width="50px"/>

              <div class="row">
                <div id="same-day" class="col">
                  <h5 id="same-day-min" class="card-title p-1">${Math.round(forecast.main.temp_min)}°</h5>
                </div>
                <div class="col">
                  <h5 id="same-day-max" class="card-title p-1">${Math.round(forecast.main.temp_max)}°</h5>
                </div>
              </div>
              
            </div>
          </div>`
  }
}

//This gets the city typed by the user and inputs that into the document
// Also assign the city into a variable that is added to the apiUrl
// This then call the above function to ask it to get the temperature and present it into the document

function search(city) {
  let unit = `metric`;
  let apiKey = `271356899704dafebcd929dfba41015b`;
  let apiEndPointWeather = `https://api.openweathermap.org/data/2.5/weather`;
  let apiUrlWeather = `${apiEndPointWeather}?q=${city}&appid=${apiKey}&units=${unit}`;

  let apiEndPointForecast = `https://api.openweathermap.org/data/2.5/forecast`;
  let apiUrlForecast = `${apiEndPointForecast}?q=${city}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrlWeather).then(getWeatherConditions);

  
  axios.get(apiUrlForecast).then(getForecast);

}

//This function serve as bridge between the action of the user of typing something and the ability of getting the value from the API

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-field").value; // this extracts the value from a given field
  search(city);
}

//This listen if the search bar is filled. Once it's filled, it calls the above function

let searchBar = document.querySelector("#search-bar"); //box that is filled
searchBar.addEventListener("submit", handleSubmit);

//This function get the weather/forecast info based on the user coordenates if the button is clicked

function getMyLocationButton(position) {
  console.log(position);
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let unit = `metric`;
  let apiKey = `271356899704dafebcd929dfba41015b`;
  let apiEndPointWeather = `https://api.openweathermap.org/data/2.5/weather`;
  let apiUrlWeather = `${apiEndPointWeather}?units=${unit}&lat=${lat}&lon=${lon}&appid=${apiKey}`;

  let apiEndPointForecast = `https://api.openweathermap.org/data/2.5/forecast`;
  let apiUrlForecast = `${apiEndPointForecast}?units=${unit}&lat=${lat}&lon=${lon}&appid=${apiKey}`;

  axios.get(apiUrlWeather).then(getWeatherConditions);

  axios.get(apiUrlForecast).then(getForecast);


}
//This function tells JS to get the user's coordenates

function callNavigator(response) {
  navigator.geolocation.getCurrentPosition(getMyLocationButton);
}
//this tells JS to get the user coordenates only if the button is clicked

let zipCodeButton = document.querySelector("#zip-code-button1");
zipCodeButton.addEventListener("click", callNavigator);

//This is a global variable. It goes outside of a function, so others functions can use it
let celsiusTemp = null;


function displayFahrenheitTemp(event) {
  event.preventDefault();
  
  document.querySelector("#current-temperature").innerHTML = `${Math.round(
    celsiusTemp * 1.8 + 32)}°`;

}



let fahrenheit = document.querySelector("#fahrenheit-button");
fahrenheit.addEventListener("click", displayFahrenheitTemp);


function displayCelsiusTemp(event) {
  event.preventDefault();

  document.querySelector("#current-temperature").innerHTML = `${Math.round(
    celsiusTemp)}°`;
}



let celsius = document.querySelector("#degrees-button");
celsius.addEventListener("click", displayCelsiusTemp);



search("Santiago");

