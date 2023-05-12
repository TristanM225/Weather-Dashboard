
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
function saveCityToLocalStorage(city) {
    var cities = localStorage.getItem('cities') ? JSON.parse(localStorage.getItem('cities')) : [];
    if (!cities.includes(city)) {
      cities.push(city);
      localStorage.setItem('cities', JSON.stringify(cities));
      console.log(saveCityToLocalStorage);
    }
  }