// API key
var APIKey = "79855f5e2cc5e0d576620f20c250c98a";

var currentDate = dayjs().format('DD/MM/YYYY');
var nextDay = dayjs().add(1, 'day').format('DD/MM/YYYY');

console.log(currentDate);
console.log(nextDay);

var searchHistory = [];



//Dispaly the weather (after click search button or city buttons)
function diaplayWeather(Data) {
  console.log(Data);
};

// On click event associated with the Search Button
$('#search-button').on('click', function (event) {
  event.preventDefault();

  var inputCity = $('#search-input').val().trim();
  console.log(inputCity);

  // URL query the database
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + inputCity + "&appid=" + APIKey;

  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(diaplayWeather);
});