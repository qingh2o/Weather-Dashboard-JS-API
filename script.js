// API key
var APIKey = "79855f5e2cc5e0d576620f20c250c98a";

var currentDate = dayjs().format('DD/MM/YYYY');

var searchHistory = [];

//Display today's weather (after click search button or city buttons)
function displayTodayWeather(todayData) {
  $('#today').empty();
  console.log('Today:', todayData);

  // Create today`s weather conditions element
  var todayDisplay = $('<div>').addClass('p-3')
  var cityDisplayDate = $('<h3>').text(todayData.name + ' ' + currentDate);
  var temperature = $('<p>').text((todayData.main.temp - 273.15).toFixed(2) + ' °C').addClass('fs-1');
  var windSpend = $('<p>').text('Wind: ' + todayData.wind.speed + ' KPH');
  var humidity = $('<p>').text('Humidity: ' + todayData.main.humidity + '%');

  //Get weather icon from database
  var iconKey = todayData.weather[0].icon;
  var iconURL = 'https://openweathermap.org/img/wn/' + iconKey + '@2x.png';
  var weatherIcon = $('<img>').attr('src', iconURL);

  //Display on the page
  temperature.prepend(weatherIcon);
  todayDisplay.append(cityDisplayDate, temperature, windSpend, humidity)
  $('#today').append(todayDisplay);
};


//Display 5-day forecast weather (after click search button or city buttons)
function displayForecastWeather(forecastData) {

  console.log(forecastData.list);

  for (var i = 0; i < forecastData.list.length; i++) {
    var hours = dayjs(forecastData.list[i].dt_txt).format('H')
    console.log();
    var dates = dayjs(forecastData.list[i].dt_txt).format('DD/MM/YYYY')

    //Filter the timestamp
    if (hours === '12' && dates !== currentDate) {
      // Create 5-day forecast weather conditions element
      var filterData = forecastData.list[i]
      var forecastDisplay = $('<div>').addClass('col-2 bg-secondary text-white rounded p-3');
      var newDate = dayjs(filterData.dt_txt).format('DD/MM/YYYY');
      var forecastDate = $('<h6>').text(newDate);

      //Get weather icon from database
      var iconKey = filterData.weather[0].icon;
      var iconURL = 'https://openweathermap.org/img/wn/' + iconKey + '.png';
      var weatherIcon = $('<img>').attr('src', iconURL);
      
      var temperature = $('<p>').text((filterData.main.temp - 273.15).toFixed(2) + ' °C').addClass('fs-4');
      var windSpend = $('<p>').text('Wind: ' + filterData.wind.speed + ' KPH');
      var humidity = $('<p>').text('Humidity: ' + filterData.main.humidity + '%');

  //Display on the page
      forecastDisplay.append(forecastDate, weatherIcon, temperature, windSpend, humidity);
      $('#forecast').append(forecastDisplay);
    }
  }
};




// On click event associated with the Search Button
$('#search-button').on('click', function (event) {
  event.preventDefault();

  var inputCity = $('#search-input').val().trim();
  console.log(inputCity);

  // Build  query  URL format
  var queryTodayURL = "https://api.openweathermap.org/data/2.5/weather?q=" + inputCity + "&appid=" + APIKey;
  var queryForecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + inputCity + "&appid=" + APIKey;

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