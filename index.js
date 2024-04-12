let londonElement = document.querySelector("#london");
let losAngelesElement = document.querySelector("#losAngeles");

let londonTime = londonElement.querySelector(".time");
let losAngelesTime = losAngelesElement.querySelector(".time");

function displayCityTime(city) {
  let cityTime = city.querySelector(".time");
  let cityTimeZone;
  if (city === londonElement) {
    cityTimeZone = "Europe/London";
  }
  if (city === losAngelesElement) {
    cityTimeZone = "America/Los_Angeles";
  }
  cityTime.innerHTML = moment()
    .tz(cityTimeZone)
    .format("H:mm:ss [<small>]A[</small>]");
}

function cityTime(city) {
  let cityDate = city.querySelector(".date");
  let currentCityDate = moment().format("MMMM Do, YYYY");
  cityDate.innerHTML = currentCityDate;
  let cityTime = city.querySelector(".time");
  displayCityTime(city);
  setInterval(displayCityTime, 1000, city);
}
cityTime(londonElement);
cityTime(losAngelesElement);

function updateCity(event) {
  if (event.target.value.length > 0) {
    let cityTimeZone = event.target.value;
    if (cityTimeZone === "current") {
      cityTimeZone = moment.tz.guess();
    }
    let cityName = cityTimeZone.replace("_", " ").split("/")[1];
    let cityTime = moment().tz(cityTimeZone);
    let citiesElement = document.querySelector("#cities");
    citiesElement.innerHTML = `<div class="city">
            <div>
        <h2>${cityName}</h2>
        <div class="date">${cityTime.format("MMMM Do, YYYY")}</div>
        </div>
        <div class="time">${cityTime.format(
          "H:mm:ss [<small>]A[</small>]"
        )}</div>
        </div>
        <div>
        <a href="https://world-clockish.netlify.app/">All cities</a>
        </div>
        `;
  }
}

let citiesSelect = document.querySelector("#select-cities");
citiesSelect.addEventListener("change", updateCity);
