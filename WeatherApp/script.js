const apiKey = `b5b8c9390c3c42db93c81229242207`;

async function fetchWeatherData(city) {
    try{
        const response = await fetch(
            `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
        );
    
        if (!response.ok){
            throw new Error("Unable to fetch weather data");
        }
        const data = await response.json();
        console.log(data);
        updateWeatherUI(data);
    } catch (error) {
        console.error(error);
    }
}

const cityElement = document.querySelector(".city");
const temperature = document.querySelector(".temp");
const wind = document.querySelector(".wind-speed");
const humidity = document.querySelector(".humidity");
const visibility = document.querySelector(".visibility-distance");
const description = document.querySelector(".description-text");
const date = document.querySelector(".date");
const descriptionicon = document.querySelector(".description i");

function updateWeatherUI(data) {
    cityElement.textContent = data.location.name;
    temperature.textContent = `${Math.round(data.current.temp_c)}°`;
    wind.textContent = `${data.current.wind_kph} km/h`;
    humidity.textContent = `${data.current.humidity}%`;
    visibility.textContent = `${data.current.vis_km} km`;
    description.textContent = `${data.current.condition.text}`;
    const currentDate = new Date();
    date.textContent = currentDate.toDateString();
    let status = data.current.condition.text;
    const weatherIconName = getWeatherIconName(status.trim());
    descriptionicon.innerHTML = `<i class="material-icons">${weatherIconName}</i>`;
}

const formElement = document.querySelector(".search-form");
const inputElement = document.querySelector(".city-input")

formElement.addEventListener('submit', function(e){
    e.preventDefault();
    const city = inputElement.value;
    if(city !== ""){
        fetchWeatherData(city);
        inputElement.value = "";
    }
});

function getWeatherIconName(weatherCondition) {
    const iconMap ={
        Clear: "wb_sunny",
        Clouds: "wb_cloudy",
        Rain: "umbrella",
        Thunderstorm: "flash_on",
        Drizzle: "grain",
        Snow: "ac_unit",
        Mist: "cloud",
        Smoke: "cloud",
        Haze: "cloud",
        Fog: "cloud",
    };
    return iconMap[weatherCondition] || "help"
}
 5
// Call fetchWeatherData with default city
fetchWeatherData("mahuva");
