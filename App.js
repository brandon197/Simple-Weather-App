window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let temperatureSection = document.querySelector(".temperature");
  let temperatureSpan = document.querySelector(".temperature span");

  if (navigator.geolocation) {
    window.navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `https://api.weatherapi.com/v1/forecast.json?key=9419082efd794645b2b30257210701&q=${lat}, ${long}`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const tempC = data.current.feelslike_c;
          const tempF = data.current.feelslike_f;
          const condition = data.current.condition.text;
          const tz = data.location.tz_id;
          const icon = data.current.condition.icon;

          //set DOM elements from API
          locationTimezone.textContent = tz;
          temperatureDegree.textContent = tempF;
          temperatureDescription.textContent = condition;

          //change temp units
          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "°F") {
              temperatureSpan.textContent = "°C";
              temperatureDegree.textContent = tempC;
            } else {
              temperatureSpan.textContent = "°F";
              temperatureDegree.textContent = tempF;
            }
          });
          console.log(tempF);
        });
    });
  }
});
