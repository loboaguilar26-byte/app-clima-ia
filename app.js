const API = {
  geocoding: "https://geocoding-api.open-meteo.com/v1/search",
  forecast: "https://api.open-meteo.com/v1/forecast",
};

const state = { selectedLocation: null };

const elements = {
  form: document.querySelector("#search-form"),
  input: document.querySelector("#city-input"),
  locationButton: document.querySelector("#location-button"),
  section: document.querySelector(".weather-section"),
  loading: document.querySelector("#loading-state"),
  error: document.querySelector("#error-state"),
  errorTitle: document.querySelector("#error-title"),
  errorMessage: document.querySelector("#error-message"),
  content: document.querySelector("#weather-content"),
  locationName: document.querySelector("#location-name"),
  locationMeta: document.querySelector("#location-meta"),
  updated: document.querySelector("#updated-label"),
  currentSymbol: document.querySelector("#current-symbol"),
  currentDescription: document.querySelector("#current-description"),
  temperature: document.querySelector("#current-temperature"),
  feelsLike: document.querySelector("#feels-like"),
  humidity: document.querySelector("#humidity"),
  wind: document.querySelector("#wind"),
  precipitation: document.querySelector("#precipitation"),
  forecast: document.querySelector("#forecast-grid"),
};

const weatherCodes = {
  0: ["Despejado", "☀"],
  1: ["Mayormente despejado", "🌤"],
  2: ["Parcialmente nublado", "⛅"],
  3: ["Nublado", "☁"],
  45: ["Niebla", "🌫"],
  48: ["Niebla helada", "🌫"],
  51: ["Llovizna ligera", "🌦"],
  53: ["Llovizna", "🌦"],
  55: ["Llovizna intensa", "🌧"],
  61: ["Lluvia ligera", "🌦"],
  63: ["Lluvia", "🌧"],
  65: ["Lluvia intensa", "🌧"],
  71: ["Nieve ligera", "🌨"],
  73: ["Nieve", "❄"],
  75: ["Nieve intensa", "❄"],
  80: ["Chubascos ligeros", "🌦"],
  81: ["Chubascos", "🌧"],
  82: ["Chubascos intensos", "⛈"],
  95: ["Tormenta", "⛈"],
  96: ["Tormenta con granizo", "⛈"],
  99: ["Tormenta intensa", "⛈"],
};

function getWeatherInfo(code) {
  return weatherCodes[code] || ["Condición variable", "◌"];
}

function formatNumber(value, digits = 0) {
  return new Intl.NumberFormat("es-MX", { maximumFractionDigits: digits }).format(value);
}

function formatDay(dateString) {
  const date = new Date(`${dateString}T12:00:00`);
  return new Intl.DateTimeFormat("es-MX", { weekday: "short", timeZone: "UTC" }).format(date).replace(".", "");
}

function formatLocalTime(dateTime) {
  const timePart = String(dateTime).split("T")[1] || "";
  return timePart.slice(0, 5);
}

function setLoading(isLoading) {
  elements.section.setAttribute("aria-busy", String(isLoading));
  elements.loading.hidden = !isLoading;
  if (isLoading) {
    elements.error.hidden = true;
    elements.content.hidden = true;
  }
}

function showError(title, message) {
  elements.loading.hidden = true;
  elements.content.hidden = true;
  elements.errorTitle.textContent = title;
  elements.errorMessage.textContent = message;
  elements.error.hidden = false;
  elements.section.setAttribute("aria-busy", "false");
}

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

async function findCity(query) {
  const url = new URL(API.geocoding);
  url.search = new URLSearchParams({ name: query, count: "1", language: "es", format: "json" });
  const data = await fetchJson(url);
  if (!data.results?.length) throw new Error("CITY_NOT_FOUND");
  return data.results[0];
}

async function fetchWeather(location) {
  const url = new URL(API.forecast);
  url.search = new URLSearchParams({
    latitude: location.latitude,
    longitude: location.longitude,
    current: "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m",
    daily: "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max",
    timezone: "auto",
    forecast_days: "5",
  });
  return fetchJson(url);
}

function renderWeather(location, weather) {
  const current = weather.current;
  const currentInfo = getWeatherInfo(current.weather_code);
  state.selectedLocation = location;

  elements.locationName.textContent = location.name;
  elements.locationMeta.textContent = [location.admin1, location.country].filter(Boolean).join(", ") + ` · ${weather.timezone}`;
  elements.updated.textContent = `Actualizado ${formatLocalTime(current.time)}`;
  elements.currentSymbol.textContent = currentInfo[1];
  elements.currentDescription.textContent = currentInfo[0];
  elements.temperature.textContent = formatNumber(current.temperature_2m);
  elements.feelsLike.textContent = `${formatNumber(current.apparent_temperature)} °C`;
  elements.humidity.textContent = `${formatNumber(current.relative_humidity_2m)} %`;
  elements.wind.textContent = `${formatNumber(current.wind_speed_10m)} km/h`;
  elements.precipitation.textContent = `${formatNumber(current.precipitation, 1)} mm`;

  elements.forecast.replaceChildren();
  weather.daily.time.forEach((date, index) => {
    const info = getWeatherInfo(weather.daily.weather_code[index]);
    const card = document.createElement("article");
    card.className = "forecast-card";
    card.innerHTML = `
        <div class="forecast-day">${index === 0 ? "Hoy" : formatDay(date)}</div>
      <span class="forecast-symbol" aria-hidden="true">${info[1]}</span>
      <div class="forecast-description">${info[0]}</div>
      <div class="forecast-temps"><strong>${formatNumber(weather.daily.temperature_2m_max[index])}°</strong><span class="low">${formatNumber(weather.daily.temperature_2m_min[index])}°</span></div>
      <div class="rain-chance">${formatNumber(weather.daily.precipitation_probability_max[index])}% lluvia</div>
    `;
    elements.forecast.append(card);
  });

  elements.loading.hidden = true;
  elements.error.hidden = true;
  elements.content.hidden = false;
  elements.section.setAttribute("aria-busy", "false");
}

async function loadWeather(location) {
  setLoading(true);
  try {
    const weather = await fetchWeather(location);
    renderWeather(location, weather);
  } catch (error) {
    console.error(error);
    showError("No pudimos consultar el clima", "El servicio no respondió. Revisa tu conexión e inténtalo de nuevo.");
  }
}

async function searchCity(event) {
  event.preventDefault();
  const query = elements.input.value.trim();
  if (query.length < 2) {
    showError("Escribe una ciudad", "Ingresa al menos dos caracteres para realizar la búsqueda.");
    return;
  }
  setLoading(true);
  try {
    const location = await findCity(query);
    await loadWeather(location);
  } catch (error) {
    if (error.message === "CITY_NOT_FOUND") {
      showError("No encontramos esa ciudad", "Prueba con otro nombre, país o región.");
    } else {
      showError("No pudimos buscar la ciudad", "Comprueba tu conexión y vuelve a intentarlo.");
    }
  }
}

function useCurrentLocation() {
  if (!navigator.geolocation) {
    showError("Ubicación no disponible", "Tu navegador no permite obtener la ubicación. Busca una ciudad manualmente.");
    return;
  }
  setLoading(true);
  navigator.geolocation.getCurrentPosition(
    ({ coords }) => loadWeather({ name: "Mi ubicación", latitude: coords.latitude, longitude: coords.longitude }),
    () => showError("No pudimos obtener tu ubicación", "Concede permiso al navegador o busca una ciudad manualmente."),
    { enableHighAccuracy: false, timeout: 8000 },
  );
}

elements.form.addEventListener("submit", searchCity);
elements.locationButton.addEventListener("click", useCurrentLocation);
loadWeather({ name: "Ciudad de México", latitude: 19.4326, longitude: -99.1332, country: "México", admin1: "Ciudad de México" });
