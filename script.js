// API key
var APIKey = "79855f5e2cc5e0d576620f20c250c98a";

var currentDate = dayjs().format('DD/MM/YYYY');
var nextDay = dayjs().add(1, 'day').format('DD/MM/YYYY');

console.log(currentDate);
console.log(nextDay);

var searchHistory = [];



//Display today's weather (after click search button or city buttons)
function displayTodayWeather(data) {
  $('#today').empty();
  console.log('Today:', data);
  //Display today`s weather
  var todayDisplay = $('<div>').addClass('p-3')
  var cityDisplayDate = $('<h3>').text(data.name + ' ' + currentDate);

  //Get weather icon from database
  var iconKey = data.weather[0].icon;
  var iconURL = 'https://openweathermap.org/img/wn/' + iconKey + '@2x.png';
  var weatherIcon = $('<img>').attr('src', iconURL);

  // Create weather conditions element
  // Convert from Kelvin to Celsius
  var temperature = $('<p>').text((data.main.temp - 273.15).toFixed(2) + ' °C').addClass('fs-1');
  temperature.prepend(weatherIcon);
  var windSpend = $('<p>').text('Wind: ' + data.wind.speed + ' KPH');
  var humidity = $('<p>').text('Humidity: ' + data.main.humidity + '%');

  //Display on the page
  todayDisplay.append(cityDisplayDate, temperature, windSpend, humidity)
  $('#today').append(todayDisplay);
};


//Display 5-day forecast weather (after click search button or city buttons)
function displayForecastWeather(forecasdata) {
  var fiveDayData = forecasdata.list;
  console.log('5day:', fiveDayData);
  

};




// On click event associated with the Search Button
$('#search-button').on('click', function (event) {
  event.preventDefault();

  var inputCity = $('#search-input').val().trim();
  console.log(inputCity);

  // Build  query  URL format
  var queryTodayURL = "https://api.openweathermap.org/data/2.5/weather?q=" + inputCity + "&appid=" + APIKey;
  var queryForecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + inputCity + "&appid=" + APIKey + '&cnt=5';

  //Get today' weather from database
  fetch(queryTodayURL)
    .then(function (response) {
      return response.json();
    })
    .then(displayTodayWeather);

 //Get 5-day forecast from database
  fetch(queryForecastURL)
    .then(function (response) {
      return response.json();
    })
    .then(displayForecastWeather);

});