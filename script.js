var APIKey = "79855f5e2cc5e0d576620f20c250c98a";
var currentDate = dayjs().format('DD/MM/YYYY');
var searchHistory = [];

// Load search history from local storage
var storedHistory = localStorage.getItem('savedSearchHistory');
if (storedHistory) {
  searchHistory = JSON.parse(storedHistory);
  updateSearchHistory();
}

//Display today's weather 
function displayTodayWeather(todayData) {
  //Clear previous city weather information
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

//Display 5-day forecast weather 
function displayForecastWeather(forecastData) {

  //Clear previous city weather information
  $('#forecast').empty();
  console.log(forecastData.list);

  for (var i = 0; i < forecastData.list.length; i++) {
    var hoursData = dayjs(forecastData.list[i].dt_txt).format('H');
    // Create current hour variable to compare with database
    var currentHour = dayjs().format('H')
    console.log('currentHour' + currentHour);

    //Filter the timestamp 
    if (parseInt(hoursData) >= parseInt(currentHour)-3 && parseInt(hoursData) < parseInt(currentHour)) {
      
      // Create 5-day forecast weather conditions element
      var filterData = forecastData.list[i]
      console.log(filterData);
      var forecastDisplay = $('<div>').addClass('col-9 col-lg-2 m-3 p-4 shadow-sm rounded border border-2 border-light');
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
    };
  };
};


// Fetch and display weather
function fetchDisplayWeather(cityName) {
  // Build  query  URL format
  var queryTodayURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
  var queryForecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIKey;

  //Get today' weather from database
  fetch(queryTodayURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (todayData) {
      var dataBaseCityName = todayData.name;
      // Validate if the input is a valid city name
      if (cityName.toLowerCase() === dataBaseCityName.toLowerCase()) {
        displayTodayWeather(todayData);
        // Add the searched city to the search history (if not already present)
        if (!searchHistory.includes(cityName)) {
          searchHistory.push(cityName);
          // Update the search history display
          updateSearchHistory();
        }
      } else {
        return;
      }
    })

    .catch(function () {
      $('#errorModal').modal('show');
    });
  

  // Get 5-day forecast from database
  fetch(queryForecastURL)
    .then(function (response) {
      return response.json();
    })
    .then(displayForecastWeather);
};


// On click event associated with the Search Button
$('#search-button').on('click', function (event) {
  event.preventDefault();
  var inputCity = $('#search-input').val().trim();
  console.log(inputCity);
  $('#search-input').val("");
  fetchDisplayWeather(inputCity);

});

// Function to update the search history display
function updateSearchHistory() {

  // Save search history to local storage
  localStorage.setItem('savedSearchHistory', JSON.stringify(searchHistory));

  // Clear the search history container
  $('#history').empty();

  // Create buttons for each city in the search history
  for (var i = 0; i < searchHistory.length; i++) {
    var cityButton = $('<button>').text(searchHistory[i]).addClass('city-button btn btn-secondary m-1');

    // Append the city button to the search history container
    $('#history').append(cityButton);
  };
};

//Click event for city buttons
$(document).on('click', '.city-button', function () {
  var clickedCity = $(this).text();
  fetchDisplayWeather(clickedCity);
});

//Click event for clear history
$("#clear").on("click", function (event) {
  event.preventDefault();

  //empty previous weather information
  $('#forecast').empty();
  $('#today').empty();

  //empty history buttons
  $('#history').empty();
  //empty the local storage
  localStorage.clear();
 
});