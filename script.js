const ApiKey = "b49a2506bad881107a9a6e1d99d5fa48";

const input = document.querySelector("#city-input");
const formEl = document.querySelector("form");
const weatherData = document.querySelector("#weather-data");
const ParentContainer = document.querySelector(".Parent-container");

formEl.addEventListener("submit", function (detail) {
  detail.preventDefault();
  const cityValue = input.value;
  getMeValue(cityValue);
});

async function getMeValue(cityDetail) {
    weatherData.innerHTML = ""
    document.querySelector(".error").style.display = "none"

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityDetail}&appid=${ApiKey}&units=metric`,
    );

    if (!response.ok) {
      throw new Error("Something went wrond, try again");
    }

    const readableData = await response.json();
    console.log(readableData);

    let icon = document.createElement("div");
    icon.classList = "icon";

    let img = document.createElement("img");
    img.src = `https://openweathermap.org/img/wn/${readableData.weather[0].icon}.png`;

    icon.appendChild(img);

    let temperature = document.createElement("div");
    temperature.classList = "temperature";
    temperature.textContent = `${Math.round(readableData.main.temp)}℃`;

    let description = document.createElement("div");
    description.classList = "description";
    description.textContent = `${readableData.weather[0].main}`;

    let details = document.createElement("div");
    details.classList = "details";

    let feelsLike = document.createElement("div");
    feelsLike.textContent = `Feels like: ${Math.round(readableData.main.feels_like)}℃`;

    let humidity = document.createElement("div");
    humidity.textContent = `Humidity: ${readableData.main.humidity}%`;

    let wind = document.createElement("div");
    wind.textContent = `Wind speed: ${readableData.wind.speed} m/s`;

    details.appendChild(feelsLike);
    details.appendChild(humidity);
    details.appendChild(wind);

    weatherData.appendChild(icon);
    weatherData.appendChild(temperature);
    weatherData.appendChild(description);
    weatherData.appendChild(details);
  } catch (error) {
    console.log(error.message);
    document.querySelector(".error").style.display = "initial"
  }
}
