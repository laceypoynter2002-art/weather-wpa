const loadWeatherBtn = document.getElementById("loadWeatherBtn");
const citySelect = document.getElementById("citySelect");
const statusMessage = document.getElementById("statusMessage");
const weatherResult = document.getElementById("weatherResult");

const tempSpan = document.getElementById("temp");
const windSpan = document.getElementById("wind");
const codeSpan = document.getElementById("code");
const timeSpan = document.getElementById("time");

const weatherDescriptions = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  56: "Light freezing drizzle",
  57: "Dense freezing drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  66: "Light freezing rain",
  67: "Heavy freezing rain",
  71: "Slight snow",
  73: "Moderate snow",
  75: "Heavy snow",
  77: "Snow grains",
  80: "Slight rain showers",
  81: "Moderate rain showers",
  82: "Violent rain showers",
  85: "Slight snow showers",
  86: "Heavy snow showers",
  95: "Thunderstorm",
  96: "Thunderstorm with slight hail",
  99: "Thunderstorm with heavy hail"
};

loadWeatherBtn.addEventListener("click", async () => {
  const [latitude, longitude] = citySelect.value.split(",");

  statusMessage.textContent = "Loading weather...";
  weatherResult.hidden = true;

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,weather_code&temperature_unit=fahrenheit&wind_speed_unit=mph`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    tempSpan.textContent = data.current.temperature_2m;
    windSpan.textContent = data.current.wind_speed_10m;
    const weatherCode = data.current.weather_code;
    codeSpan.textContent = weatherDescriptions[weatherCode] || `Code ${weatherCode}`;
    timeSpan.textContent = data.current.time;

    statusMessage.textContent = "Weather loaded successfully.";
    weatherResult.hidden = false;
  } catch (error) {
    statusMessage.textContent = "Unable to load weather right now.";
    console.error("Weather fetch failed:", error);
  }
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js")
      .then(() => console.log("Service worker registered."))
      .catch(error => console.log("Service worker failed:", error));
  });
}
