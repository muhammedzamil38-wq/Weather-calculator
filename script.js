const API_KEY = "64072d3f504a1e9b10bb7c2ee611e35b";
const weatherDetailes = {
  description: "",
  temperature: "",
  feels_like: "",
  humidity: "",
  city_name: "",
};

const errorMessage = document.getElementById("error-message");

let errorState = false;

const city_name = document.getElementById("city_name");
const temp = document.getElementById("temp");
const feels_like = document.getElementById("feels_like");
const humidity = document.getElementById("humidity");
const description = document.getElementById("desc");

const cityInput = document.getElementById("cityInput");
cityInput.addEventListener("input", (event) => {
  weatherDetailes.city_name = event.target.value;
});

const getWeatherButton = document.getElementById("getWeatherButton");
getWeatherButton.addEventListener("click", () => {
  getWeatherData();
        console.log(errorState);
});

async function getWeatherData() {
  try {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${weatherDetailes.city_name}&appid=${API_KEY}&units=metric`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      errorMessage.textContent = "Invalid city name";
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    weatherDetailes.description = data.weather[0].description;
    weatherDetailes.city_name = data.name;
    weatherDetailes.feels_like = data.main.feels_like;
    weatherDetailes.humidity = data.main.humidity;
    weatherDetailes.temperature = data.main.temp;

    errorMessage.textContent = "";
    
    class weather{
      constructor(city_name,desc,temp,feels_like,humidity){
        this.city_name = city_name;
        this.desc = desc;
        this.temp = temp;
        this.feels_like = feels_like;
        this.humidity = humidity;
      }
      display(){
        city_name.textContent = this.city_name;
        temp.textContent = `Temperature: ${this.temp} °C`;
        feels_like.textContent = `Feels Like: ${this.feels_like} °C`;
        humidity.textContent = `Humidity: ${this.humidity}%`;
        description.textContent = `Description: ${this.desc}`;
      }
    }
   
    const weatherData = new weather(weatherDetailes.city_name,weatherDetailes.description,weatherDetailes.temperature,weatherDetailes.feels_like,weatherDetailes.humidity);
    weatherData.display();
  } catch (error) {
    console.error("Could not get weather data:", error);
    if (!errorMessage.textContent) {
      errorMessage.textContent = "Invalid city name";
    }
  }
}
 
  const weatherData = new weather(weatherDetailes.city_name,weatherDetailes.description,weatherDetailes.temperature,weatherDetailes.feels_like,weatherDetailes.humidity);
  weatherData.display();


console.log(errorState)