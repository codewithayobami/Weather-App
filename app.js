const apiKey = "4df83d0ec2c95e0cb9442d4d1b951f3c";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status === 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
         var data = await response.json();

        // Update weather info
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        const weatherType = data.weather[0].main;
        const card = document.querySelector(".card");
        const body = document.body;

        // Define gradient colors for both card and background
        const gradients = {
            Clouds: "linear-gradient(135deg, #757F9A, #D7DDE8)",
            Clear: "linear-gradient(135deg, #56CCF2, #2F80ED)",
            Rain: "linear-gradient(135deg, #2C5364, #203A43, #0F2027)",
            Snow: "linear-gradient(135deg, #E0EAFC, #CFDEF3)",
            Wind: "linear-gradient(135deg, #74ebd5, #ACB6E5)",
            Drizzle: "linear-gradient(135deg, #83a4d4, #b6fbff)",
            Mist: "linear-gradient(135deg, #606c88, #3f4c6b)",
            Default: "linear-gradient(135deg, #667eea, #764ba2)"
        };

        // Update weather icon and card + background gradient
        switch (weatherType) {
            case "Clouds":
                weatherIcon.src = "images/clouds.png";
                break;
            case "Clear":
                weatherIcon.src = "images/clear.png";
                break;
            case "Rain":
                weatherIcon.src = "images/rain.png";
                break;
            case "Snow":
                weatherIcon.src = "images/snow.png";
                break;
            case "Wind":
                weatherIcon.src = "images/wind.png";
                break;
            case "Drizzle":
                weatherIcon.src = "images/drizzle.png";
                break;
            case "Mist":
                weatherIcon.src = "images/mist.png";
                break;
            default:
                weatherIcon.src = "images/default.png";
        }

        // Update card color
        card.style.background = gradients[weatherType] || gradients.Default;

        // 🌈 Animated background update (matches card)
        body.style.background = gradients[weatherType] || gradients.Default;
        body.style.backgroundSize = "400% 400%";
        body.style.animation = "gradientShift 12s ease infinite";
        body.style.transition = "background 1s ease";

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }

}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});