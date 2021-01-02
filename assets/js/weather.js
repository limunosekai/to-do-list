const weather = document.querySelector('.weather');
const weatherData = weather.querySelector('h3');

const COORDS = 'coords';
const API_KEY = '147ae65bb2a104c347e0c9634023954d';

function getWeather(lati, longi) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${longi}&appid=${API_KEY}&units=metric`)
  .then(response => {
    return response.json()
  }).then(function(json) {
    const temp = json.main.temp;
    const weatherCondition = json.weather[0].description;
    weatherData.innerText = `${temp} °C ${weatherCondition}`
  });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoError() {
  alert("No access");
}

function handleGeoSucces(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if(loadedCoords === null) {
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();