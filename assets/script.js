
var apiKey = '4078f70a829ed0138a18ddaadd787e76';

// here we are grabbing the button by the ID 'search'
var searchButton = document.getElementById('search');

// when we click the search button the searchWeather function will be activated
searchButton.addEventListener('click', searchWeather);

function searchWeather() {

// we are scanning the document for the city ID which is in the input.
  var city = document.getElementById('city').value;
  // here we take the above variable to add it to the url to create our search
  var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      var weatherElement = document.getElementById('weather');
      weatherElement.innerHTML = `
        <h2>${data.name}</h2>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Description: ${data.weather[0].description}</p>
      `;
      saveCityToLocalStorage(data.name);
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
    });
}
// function to save the city to local storage
function saveCityToLocalStorage( city ) {
    // checks if there are any cities saved in local stoarage.
    var cities = localStorage.getItem('cities') ? JSON.parse(localStorage.getItem('cities')) : [];
    // make sure we don't record a city twice
    if (!cities.includes( city )) {
      cities.push( city );
      localStorage.setItem('cities', JSON.stringify( cities));
      console.log(saveCityToLocalStorage);
    }
  }
  // when the window is loaded grab cities from local stoarage and display them
  window.addEventListener('load', function() {
    var cities = JSON.parse(localStorage.getItem('cities')) || [];
  
    var searchHistoryEl = document.getElementById('search-history');
    searchHistoryEl.innerHTML = '';
  // loop through each city to create a new p element.
    cities.forEach(function(city) {
      var pEl = document.createElement('p');
      pEl.textContent = city;
      pEl.addEventListener('click', function() {
        getWeatherData(city);
      });
      //here we appened p to the searchHistoryEl to make every city appear on a new line
      searchHistoryEl.appendChild(pEl);
    });
  });
  