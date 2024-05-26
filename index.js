let londonElement = document.querySelector("#cities #london");
let losAngelesElement = document.querySelector("#cities #losAngeles");


function displayCityTimeLondon() {
  let cityTimeZone="Europe/London";
  londonElement.innerHTML = ` <div>
  <h2>London</h2>
  <div class="date">${moment().format("MMMM Do, YYYY")}</div>
</div>
<div class="time">${moment()
  .tz(cityTimeZone)
  .format("H:mm:ss [<small>]A[</small>]")}</div>`;
}

function displayCityTimeLosAngeles() {
  let cityTimeZone="America/Los_Angeles";
  losAngelesElement.innerHTML = ` <div>
  <h2>Los Angeles</h2>
  <div class="date">${moment().format("MMMM Do, YYYY")}</div>
</div>
<div class="time">${moment()
  .tz(cityTimeZone)
  .format("H:mm:ss [<small>]A[</small>]")}</div>`;
}
displayCityTimeLondon();
displayCityTimeLosAngeles();
setInterval(displayCityTimeLondon,1000);
setInterval(displayCityTimeLosAngeles,1000);


function capitalizeFirstLetter(string) {
  //string = string.replaceAll(" ", "");
  let firstLetter = string.charAt(0);
  firstLetter = firstLetter.toUpperCase();
  let remainder = string.slice(1).toLowerCase();
  return firstLetter + remainder;
}




//try
function changeCity(event) {
  event.preventDefault();

  if (window.cityTimeInterval) {
    clearInterval(window.cityTimeInterval);
  }

  let input = document.querySelector("#search-input").value;
  input = capitalizeFirstLetter(input);

  let apiKey = "do37btb04e66032f8eb1ab0493255777";
  let context = "Provide a short answer of the form: Europe/London. The answer has to be one of the time-zones as in https://momentjs.com/timezone/";
  let prompt = `What is the time-zone of ${input}?`;
  let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

  axios.get(apiUrl).then(response => {
    let cityTimeZone = response.data.answer;

    function updateCityTime() {
      let cityTime = moment()
        .tz(cityTimeZone)
        .format("H:mm:ss [<small>]A[</small>]");
      let citiesElement = document.querySelector("#cities");
      citiesElement.classList.add("city");
      citiesElement.innerHTML = ` <div>
      <h2>${input}</h2>
      <div class="date">${moment().format("MMMM Do, YYYY")}</div>
    </div>
    <div class="time">${cityTime}</div>`;
    }

    // Update once immediately
    updateCityTime();

    // Then set interval to update every second
    window.cityTimeInterval = setInterval(updateCityTime, 1000);
  }).catch(error => {
    console.error('Failed to fetch city time zone:', error);
  });
}
let searchForm = document.querySelector(".enter-city-form");

searchForm.addEventListener("submit", changeCity);