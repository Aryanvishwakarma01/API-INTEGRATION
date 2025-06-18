async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const resultDiv = document.getElementById("weatherResult");
  
  if (!city) {
    resultDiv.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  resultDiv.innerHTML = "Loading...";

  try {
    // Get coordinates using geocoding API
    const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
      resultDiv.innerHTML = `<p>City not found.</p>`;
      return;
    }

    const { latitude, longitude, name, country } = geoData.results[0];

    // Get weather using Open-Meteo API
    const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
    const weatherData = await weatherResponse.json();

    const temp = weatherData.current_weather.temperature;
    const wind = weatherData.current_weather.windspeed;

    resultDiv.innerHTML = `
      <h2>Weather in ${name}, ${country}</h2>
      <p>Temperature: ${temp}°C</p>
      <p>Wind Speed: ${wind} km/h</p>
    `;
  } catch (error) {
    resultDiv.innerHTML = `<p>Error fetching weather data. Try again.</p>`;
    console.error(error);
  }
}
