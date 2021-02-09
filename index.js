let now = new Date();

// Function that populates document with current day and time
function currentDayAndTime() {
  let daysIndex = [
    `Sunday`,
    `Monday`,
    `Tueday`,
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

// end of currentDayAndTime function

// Here I'm calling the fuction and ordering it to present the info on the document.
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
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = `${Math.round(
    response.data.main.temp
  )}°`;
  document.querySelector("#same-day-max-temp2").innerHTML = `${Math.round(
    response.data.main.temp_max
  )}°`;
  document.querySelector("#feels-like").innerHTML = `Feeling like ${Math.round(
    response.data.main.feels_like
  )}°`;
  document.querySelector("#same-day-min-temp1").innerHTML = `${Math.round(
    response.data.main.temp_min
  )}°`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} mph`;
}

//This gets the city typed by the user and input that into the document
// Also assign the city into a variable that is added to the apiUrl
// This then call the above function to ask it to get the temperature and present it into the document

function search(city) {
  let unit = `metric`;
  let apiKey = `271356899704dafebcd929dfba41015b`;
  let apiEndPoint = `https://api.openweathermap.org/data/2.5/weather`;
  let apiUrl = `${apiEndPoint}?q=${city}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(getWeatherConditions);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-field").value; // this extracts the value from a given field
  search(city);
}

//This listen if the search bar is filled. Once it's filled, it calls the above function

let searchBar = document.querySelector("#search-bar"); //box that is filled
searchBar.addEventListener("submit", handleSubmit);

function getMyLocationButton(position) {
  console.log(position);
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let unit = `metric`;
  let apiKey = `271356899704dafebcd929dfba41015b`;
  let apiEndPoint = `https://api.openweathermap.org/data/2.5/weather`;
  let apiUrl = `${apiEndPoint}?units=${unit}&lat=${lat}&lon=${lon}&appid=${apiKey}`;
  axios.get(apiUrl).then(getWeatherConditions);
}

function callNavigator(response) {
  navigator.geolocation.getCurrentPosition(getMyLocationButton);
}

let zipCodeButton = document.querySelector("#zip-code-button1");
zipCodeButton.addEventListener("click", callNavigator);

search("Antofagasta");



  







