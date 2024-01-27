//API key
var APIKey = "79855f5e2cc5e0d576620f20c250c98a";

// URL query the database
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=Bujumbura,Burundi&appid=" + APIKey;


var currentDate = dayjs().format('DD/MM/YYYY');
var nextDay = dayjs().add(1, 'day').format('DD/MM/YYYY');

console.log(currentDate);
console.log(nextDay);

var searchHistory = [];

//Creat function display the weather (search button or )
function diaplayWeather() {

};