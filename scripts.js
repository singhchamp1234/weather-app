window.addEventListener("load", () => {
  // loads when the entire page gets loaded

  let long; // declare the long variable

  let lat; // declare the lat variable

  let temperatureDescription = document.querySelector(
    //declare a variable to ".temperature-description"
    ".temperature-descripton"
  );
  let temperatureDegree = document.querySelector(".temperature-degree"); // declare a variable to ".temperature-degree"

  let locationTimezone = document.querySelector(".location-timezone"); // declare a variable to ".location-timezone"

  let temperatureSection = document.querySelector(".temperature"); // declare a variable to ".temperature"

  const temperatureSpan = document.querySelector(".temperature span"); // declare a varible to ".temperature span"

  if (navigator.geolocation) {
    // if the navigator.geolocation is allowed then run this function
    navigator.geolocation.getCurrentPosition(position => {
      // we are getting the current position
      long = position.coords.longitude; // long is equal to position.coords.longitude

      lat = position.coords.latitude; // lat is equal to coords.latitude

      const proxy = "https://cors-anywhere.herokuapp.com/"; // for cross orgin

      const api = `${proxy}https://api.darksky.net/forecast/a954b6a8c126c627b19ac81d8118776e/${lat},${long}`; // our api

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data); // we are console logging our the data

          const { temperature, summary, icon } = data.currently; // getting temperature, summary, and icon from data.currently

          temperatureDegree.textContent = temperature; // changing the text content

          temperatureDescription.textContent = summary; // changing the text content

          locationTimezone.textContent = data.timezone; // changing the text content

          let celsius = (temperature - 32) * (5 / 9); // changing the text content

          setIcons(icon, document.querySelector(".icons"));

          // Add a click event listener to change from farenheit to celsius

          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "F") {
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = Math.floor(celsius);
            } else {
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = temperature;
            }
          });
        });
    });
  }
  // Skycons implementation
  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
