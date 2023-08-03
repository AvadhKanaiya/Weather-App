/**
 * Weather App
 * TODO: Complete getWeatherData() to return json response Promise
 * TODO: Complete searchCity() to get user input and get data using getWeatherData()
 * TODO: Complete showWeatherData() to set the data in the the html file from response
 */

/* DIV ID's you'll need access to 👇
"city-name"
"weather-type"
"temp"
"min-temp"
"max-temp"
*/

// API_KEY for maps api
let API_KEY = "a8e71c9932b20c4ceb0aed183e6a83bb";

/**
 * Retrieve weather data from openweathermap
 * HINT: Use fetch()
 * HINT: URL should look like this: 
 * https://api.openweathermap.org/data/2.5/weather?q=detroit&appid=a8e71c9932b20c4ceb0aed183e6a83bb&units=imperial
 */

const convert_temp=document.getElementById('convert_btn')
getWeatherData = (city) => {

  //HINT: Use template literals to create a url with input and an API key

  //CODE GOES HERE
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`;
  return fetch(URL).then(response => response.json()).then(data => data)
}

/**
 * Retrieve city input and get the weather data
 * HINT: Use the promise returned from getWeatherData()
 */

const searchCity = () => {
  const city = document.getElementById('city-input').value;
let convert_btn = document.getElementById('convert_btn')
  // CODE GOES HERE
  getWeatherData(city).then((data) => {
    showWeatherData(data)
    convert_btn.style.display = "inline-block"
    fahrenheit_to_celsius(data)
  }).catch((error) => {
    convert_btn.style.display = "none"
    document.getElementById('temp').innerText ="---"
     document.getElementById('city-name').innerText ="---"
    document.getElementById('weather-type').innerText ="---"
    document.getElementById('min-temp').innerText ="---"
    document.getElementById('max-temp').innerText ="---"
    console.log(error)
    alert("something went wrong. Please try again")
  })


}
/**
 * Show the weather data in HTML
 * HINT: make sure to console log the weatherData to see how the data looks like
 */
const showWeatherData = (weatherData) => {
  //CODE GOES HERE
  const weather_img = document.getElementById('weather_img')
  if(weatherData.weather[0].main == 'Clear'){
    weather_img.style.display = "inline-block"
    weather_img.src = "images/clear_weather.jpg"
  }
  else if(weatherData.weather[0].main == 'Sunny'){
    weather_img.style.display = "inline-block"
    weather_img.src = "images/sunny_weather.jpg"
  }
  else if(weatherData.weather[0].main == "Clouds"){
    weather_img.style.display = "inline-block"
    weather_img.src = "images/cloud_weather.png"
  }
  else if(weatherData.weather[0].main == "Haze"){
    weather_img.style.display = "inline-block"
    weather_img.src = "images/haze_weather.png"
  }else{
      weather_img.style.display = "none"
  }
  document.getElementById('temp').innerText = weatherData.main.temp
  document.getElementById('city-name').innerText = weatherData.name
  document.getElementById('weather-type').innerText = weatherData.weather[0].main
  document.getElementById('min-temp').innerText = weatherData.main.temp_min
  document.getElementById('max-temp').innerText = weatherData.main.temp_max
}


function fahrenheit_to_celsius(data){
   convert_temp.onclick = ()=>{
     let temp_cel = ((data.main.temp-32)*(5/9)).toFixed(2)
     let minTemp_cel = ((data.main.temp_min-32)*(5/9)).toFixed(2)
     let maxTemp_cel = ((data.main.temp_max-32)*(5/9)).toFixed(2)
    document.getElementById('temp').innerText = `${temp_cel} C.`
   document.getElementById('min-temp').innerText = `${minTemp_cel} C`
  document.getElementById('max-temp').innerText = `${maxTemp_cel} C`
   }
}
