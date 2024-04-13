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

//function cityTime(city) {
  //let cityDate = city.querySelector(".date");
  //let currentCityDate = moment().format("MMMM Do, YYYY");
  //cityDate.innerHTML = currentCityDate;
  //let cityTime = city.querySelector(".time");
  //displayCityTime(city);
  //setInterval(displayCityTime, 1000, city);
//}
//cityTime(londonElement);
//cityTime(losAngelesElement);

//function updateCity(event) {
//if (event.target.value.length > 0) {
//let cityTimeZone = event.target.value;
//if (cityTimeZone === "current") {
//cityTimeZone = moment.tz.guess();
//}
//let cityName = cityTimeZone.replace("_", " ").split("/")[1];
//let cityTime = moment().tz(cityTimeZone);
//let citiesElement = document.querySelector("#cities");
//citiesElement.innerHTML = `<div class="city">
//      <div>
//<h2>${cityName}</h2>
//<div class="date">${cityTime.format("MMMM Do, YYYY")}</div>
//</div>
//<div class="time">${cityTime.format(
// "H:mm:ss [<small>]A[</small>]"
//)}</div>
//</div>
//<div>
//<a href="https://world-clockish.netlify.app/">All cities</a>
//</div>
//`;
//}
//}

//let citiesSelect = document.querySelector("#select-cities");
//citiesSelect.addEventListener("change", updateCity);

function capitalizeFirstLetter(string) {
  //string = string.replaceAll(" ", "");
  let firstLetter = string.charAt(0);
  firstLetter = firstLetter.toUpperCase();
  let remainder = string.slice(1).toLowerCase();
  return firstLetter + remainder;
}

function changeCity(event) {
  event.preventDefault();
  let input = document.querySelector("#search-input");
  input = capitalizeFirstLetter(input.value);

  let apiKey = "do37btb04e66032f8eb1ab0493255777";
  let context = "Provide a short answer of the form: Europe/London. The answer has to be one of the time-zones as in https://momentjs.com/timezone/";
  let prompt = `What is the time-zone of ${input}?`;
  let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

  let cityTimeZone = [];
  function showAnswer(response) {
    cityTimeZone[0] = response.data.answer;
    let cityTime = moment()
      .tz(cityTimeZone[0])
      .format("H:mm:ss [<small>]A[</small>]");
    let citiesElement = document.querySelector("#cities");
    citiesElement.classList.add("city");
    citiesElement.innerHTML = ` <div>
    <h2>${input}</h2>
    <div class="date">${moment().format("MMMM Do, YYYY")}</div>
  </div>
  <div class="time">${cityTime}</div>`;
    
  }
  axios.get(apiUrl).then(showAnswer);
}

let searchForm = document.querySelector(".enter-city-form");

searchForm.addEventListener("submit", changeCity);

//searchForm.addEventListener("submit",setInterval(changeCity());)

