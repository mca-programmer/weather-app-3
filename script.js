const apiKey = "b7cbdc030e34264d4433f79288650723"; // Replace with your OpenWeatherMap API key
const weatherList = document.getElementById("weatherList");
const cityCount = document.getElementById("cityCount");

let addedCities = [];

async function addCity() {
  const input = document.getElementById("cityInput");
  const city = input.value.trim();

  if (!city) return;
  if (addedCities.includes(city.toLowerCase())) {
    alert("City already added!");
    return;
  }

   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${"b7cbdc030e34264d4433f79288650723"}&units=metric`;
 


  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod !== 200) {
      alert("City not found!");
      return;
    }

    addedCities.push(city.toLowerCase());
    updateCityCount();

    const { name } = data;
    const { temp } = data.main;
    const { description, icon } = data.weather[0];

    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${name}</h3>
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" />
      <p><strong>${temp}°C</strong> - ${description}</p>
    `;
    weatherList.appendChild(card);
    input.value = "";

  } catch (error) {
    alert("Error fetching data.");
  }
}

function updateCityCount() {
  cityCount.textContent = `Cities: ${addedCities.length}`;
}

function clearCities() {
  weatherList.innerHTML = "";
  addedCities = [];
  updateCityCount();
}
