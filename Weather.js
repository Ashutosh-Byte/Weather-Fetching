var input = document.querySelector(".CityName");
var btn = document.querySelector(".Search");
var CityName = document.querySelector(".cityname");
var CityTemp = document.querySelector(".citytemp");
var CityZone = document.querySelector(".cityzone");
var aqi = document.querySelector(".aqi");
var currentlocation = document.querySelector(".currentlocation");

async function getdata(cityname) {
  let promise = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=9c7feae23a764a2f8bc174236251006&q=${cityname}&aqi=yes`
  );
  return await promise.json();
}

btn.addEventListener("click", async () => {
  const value = input.value;
  const result = await getdata(value);
  CityName.innerText = `${result.location.name} ${result.location.region} ${result.location.country}`;
  CityTemp.innerHTML = `${result.current.temp_c}°C `;
  CityZone.innerHTML = `${result.location.localtime}`;
  animateWeatherData();
});

async function gotdata(lat, long) {
  let promise = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=9c7feae23a764a2f8bc174236251006&q=${lat},${long}&aqi=yes`
  );
  return await promise.json();
}
async function gotlocation(position) {
  const result1 = await gotdata(
    position.coords.latitude,
    position.coords.longitude
  );
  CityName.innerText = `${result1.location.name} ${result1.location.region} ${result1.location.country}`;
  CityTemp.innerHTML = `${result1.current.temp_c}°C `;
  CityZone.innerHTML = `${result1.location.localtime}`;
  animateWeatherData();
}

function failedtoget() {
  console.log("failed to get the position");
}

currentlocation.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(gotlocation, failedtoget);
});
