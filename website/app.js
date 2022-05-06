// Personal API Key for OpenWeatherMap API
const apiKey = "677d3e553f00470e6f6cfbcc3294cbd5";
const unit = "metric";

/* Global Variables */
// Get date from Date function
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

// select generate button to add event listener to it
const generatingButton = document.querySelector("#generate");

// asynchronous function to get information from api and using it to update html
generatingButton.addEventListener("click", async function () {
  try {
    // select api elements
    const zipCode = document.querySelector("#zip").value;
    const content = document.querySelector("#feelings").value;
    const url = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&zip=${zipCode}&units=${unit}`;

    // fetching url to get data
    const fetchURL = await fetch(url);
    const jsonData = await asynJSON(fetchURL);
    const tempDeg = jsonData.main.temp;
    const cityName = jsonData.name;

    // sending data to the server to store it
    await fetch("/postData", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: newDate,
        name: cityName,
        temp: tempDeg,
        content: content,
      }),
    });

    // showing the final data to the client
    const finalData = await fetch("/getData");
    const finalJsonData = await asynJSON(finalData);

    await dynamicUi(finalJsonData);
  } catch (err) {
    console.log("Errror", err);
  }
});

// a function to make json data
function asynJSON(ele) {
  return ele.json();
}

// a function to dynamically update html elements
function dynamicUi(res) {
  try {
    document.querySelector("#date").innerHTML = "Date: " + res.date + "  🕑";
    document.querySelector("#temp").innerHTML =
      "Temperature: " + Math.round(res.temp) + " degrees   💦";
    document.querySelector("#content").innerHTML =
      "Feeling: " + res.content + "  ✔";
    const city = document.createElement("div");
    city.setAttribute("id", "name");
    document.querySelector("#entryHolder").appendChild(city);
    document.querySelector("#name").innerHTML = "City: " + res.name + "  🌏";
  } catch (error) {
    console.log("Error", error);
  }
}
