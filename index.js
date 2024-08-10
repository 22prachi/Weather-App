const user_input = document.getElementById("input_form");
const button = document.querySelector(".search > button");
let img = document.querySelector(".weather_img");
console.log(img);
const temperature = document.querySelector(".temp > h1");
const city_name = document.querySelector(".temp > h3");
const humidity = document.querySelector(".humidity > h4");
const wind_speed = document.querySelector(".speed > h4");
let p = document.querySelector(".error > p ");
let city;
button.addEventListener("click", function (e) {
  e.preventDefault();
  city = user_input.value;

  checkWeather();
});

async function checkWeather() {
  const api_url = `https://api.openweathermap.org/data/2.5/weather?&q=${city}&units=metric`;

  const api_key = "1d5c3de662df6ef2f4f76e07dd5de999";

  const response = await fetch(api_url + `&appid=${api_key}`);
  if (response.status == 404) {
    p.style.display = "block";
     document.querySelector(".weather").style.display = "none";
  } else {
    const data = await response.json();

    temperature.innerHTML = `${Math.round(data.main.temp)}°C`;
    city_name.innerHTML = `${data.name}`;
    humidity.innerHTML = `${data.main.humidity}%`;
    wind_speed.innerHTML = `${data.wind.speed} km/h`;

    console.log(data.weather[0].main);
    if (data.weather[0].main == "Clouds") {
      document
        .querySelector(".weather_img")
        .setAttribute("src", "./images/clouds.png");
    } else if (data.weather[0].main == "Clear") {
      document
        .querySelector(".weather_img")
        .setAttribute("src", "./images/clear.png");
    } else if (data.weather[0].main == "Rain") {
      document
        .querySelector(".weather_img")
        .setAttribute("src", "./images/rain.png");
    } else if (data.weather[0].main == "Drizzle") {
      document
        .querySelector(".weather_img")
        .setAttribute("src", "./images/drizzle.png");
    } else if (data.weather[0].main == "Mist") {
      document
        .querySelector(".weather_img")
        .setAttribute("src", "./images/mist.png");
    } else if (data.weather[0].main == "Snow") {
      document
        .querySelector(".weather_img")
        .setAttribute("src", "./images/snow.png");
    }
    document.querySelector(".weather").style.display = "flex";
    p.style.display = "none";
  }
}
