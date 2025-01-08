const mainContainer = document.getElementById('main-container');
const extraContainer = document.getElementById('extra-container');
const search = document.querySelector('.search-box button');
const weatherinfo = document.querySelector('.weather-info');
const weatherBox = document.querySelector('.weather-box');
const WeatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');
const city = document.querySelector('.place-input1');
const APIKey = ''; //Enter your API key
const forecastItemContainer = document.querySelector('.forecast-item-container');

search.addEventListener('click', () => {

    if (city == '') {
        return;
    }
    
    if (city.value.trim() != '') {
        searchPlace(city.value)
        city.value = ''
        city.blur()
    }

    else {
        mainContainer.classList.remove('expand', 'move-left');
        setTimeout(()=>{
            extraContainer.classList.remove('show');
        }, 100);
        setTimeout(()=>{
            mainContainer.style.height='100px';
            weatherBox.classList.remove('active');
            weatherinfo.classList.remove('active');
            WeatherDetails.classList.remove('active');
            error404.classList.remove('active');
            document.body.style.backgroundImage = 'url(images/bg1.webp)';
        },600);
    }
})

city.addEventListener('keypress', (e) => {

    if (city == '') {
        return;
    }

    if (event.key === 'Enter' && city.value.trim() != '') {
        searchPlace(city.value)
        city.value = ''
        city.blur()
    }
    else {
        mainContainer.classList.remove('expand', 'move-left');
        setTimeout(()=>{
            extraContainer.classList.remove('show');
        }, 100);
        setTimeout(()=>{
            mainContainer.style.height='100px';
            weatherBox.classList.remove('active');
            weatherinfo.classList.remove('active');
            WeatherDetails.classList.remove('active');
            error404.classList.remove('active');
            document.body.style.backgroundImage = 'url(images/bg1.webp)';
        },600);
    }
})

async function getFetchData(endPoint, city) {
    const weburl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&units=metric&appid=${APIKey}`
    const response = await fetch(weburl)
    return response.json()
}

function getweatherIcon(id) {
    if (id <= 232) return 'thunderstorm.svg'
    if (id <= 321) return 'drizzle.svg'
    if (id <= 531) return 'rain.svg'
    if (id <= 622) return 'snow.svg'
    if (id <= 781) return 'atmosphere.svg'
    if (id <= 800) return 'clear.svg'
    else return 'clouds.svg'
}

async function searchPlace(city) {
    const weatherData = await getFetchData('weather', city)

    console.log(weatherData);

    if (!city){ 
        mainContainer.classList.remove('expand', 'move-left');
        setTimeout(()=>{
            extraContainer.classList.remove('show');
        }, 100);
        setTimeout(()=>{
            mainContainer.style.height='100px';
            weatherBox.classList.remove('active');
            weatherinfo.classList.remove('active');
            WeatherDetails.classList.remove('active');
            error404.classList.remove('active');
            document.body.style.backgroundImage = 'url(images/bg1.webp)';
        },600);
    }

    if(weatherData.cod == '404'){
        cityHide.textContent = city;
        mainContainer.classList.remove('move-left');
        setTimeout(()=>{
            extraContainer.classList.remove('show');
        }, 100);
        setTimeout(()=>{
            mainContainer.style.height='400px';
            error404.classList.add('active');
        }, 800);
        weatherinfo.classList.remove('active');
        weatherBox.classList.remove('active');
        WeatherDetails.classList.remove('active');
        document.body.style.backgroundImage = 'url(images/bg1.webp)';
        return;
    }

    else if (weatherData.cod != '404') { 
        mainContainer.classList.add('expand');
        setTimeout(() => { 
            mainContainer.classList.add('move-left'); 
            extraContainer.classList.add('show'); 
        }, 1200);
    }

    const image = document.querySelector('.weather-box img');
    const temperature = document.querySelector('.weather-box .temperature');
    const description = document.querySelector('.weather-box .description');
    const humidity = document.querySelector('.weather-details .humidity span');
    const wind = document.querySelector('.weather-details .wind span');
    const long = document.querySelector('.longlat .long');
    const lat = document.querySelector('.longlat .lat');
    const place = document.querySelector('.weather-info .location .place-name');
    const formattedDate = document.querySelector('.location-date-container .current-date');
    const extrplace = document.getElementById('extra-location');

    if(cityHide.textContent == city){
        return;
    }
    else{
        cityHide.textContent == city;

        mainContainer.style.height='555px';
        mainContainer.classList.add('active');
        weatherinfo.classList.add('active');
        weatherBox.classList.add('active');
        WeatherDetails.classList.add('active');
        error404.classList.remove('active');
        setTimeout(() => {
            mainContainer.classList.remove('active');
        }, 2500);

        let backgroundImage = '';

        switch(weatherData.weather[0].main){
            case 'Clear':
                image.src = 'images/clear.png';
                backgroundImage = 'url(images/Sunny.jpg)';
                break;
            case 'Rain':
                image.src = 'images/rain.png';
                backgroundImage = 'url(images/rainy.jpg)';
                break;
            case 'Snow':
                image.src = 'images/snow.png';
                backgroundImage = 'url(images/Snow.jpg)';
                break;
            case 'Clouds':
                image.src = 'images/cloud.png';
                backgroundImage = 'url(images/cloudy.jpg)';
                break;
            case 'Mist':
                image.src = 'images/mist.png';
                backgroundImage = 'url(images/mist.jpeg)';
                break;
            case 'Haze':
                image.src = 'images/mist.png';
                backgroundImage = 'url(images/mist.jpeg)';
                break;
            case 'Smoke':
                image.src = 'images/cloud.png';
                backgroundImage = 'url(images/smoke.jpg)';
                break;
            default:
                image.src = 'images/cloud.png';
                backgroundImage = 'url(images/bg1.webp)';    
        }
        document.body.style.backgroundImage = backgroundImage;

        temperature.innerHTML = `${parseInt(weatherData.main.temp)}<span>°C</span>`;
        description.innerHTML = `${weatherData.weather[0].description}`;
        humidity.innerHTML = `${weatherData.main.humidity}%`;
        wind.innerHTML = `${parseInt(weatherData.wind.speed)}Km/h`;
        long.innerHTML = `Longitude: ${weatherData.coord.lon}`;
        lat.innerHTML = `Latitude: ${weatherData.coord.lat}`;
        place.innerHTML = city;
        extrplace.innerHTML = `Location: ${city}`;

        const today = new Date();
        const options = { 
            weekday: 'short', 
            day: '2-digit', 
            month: 'short'
        }
        formattedDate.innerHTML = today.toLocaleDateString('en-GB', options);

        const infoWeather = document.querySelector('.info-weather');
        const infoHumidity = document.querySelector('.info-humidity');
        const infoWind = document.querySelector('.info-wind');

        const elcloneinfoWeather = infoWeather.cloneNode(true);
        const elcloneinfoHumidity = infoHumidity.cloneNode(true);
        const elcloneinfoWind = infoWind.cloneNode(true);

        elcloneinfoWeather.id = 'clone-info-weather';
        elcloneinfoWeather.classList.add('active-clone');

        elcloneinfoHumidity.id = 'clone-info-humidity';
        elcloneinfoHumidity.classList.add('active-clone');

        elcloneinfoWind.id = 'clone-info-wind';
        elcloneinfoWind.classList.add('active-clone');

        setTimeout(() => {
            infoWeather.insertAdjacentElement("afterend",elcloneinfoWeather);
            infoHumidity.insertAdjacentElement("afterend",elcloneinfoHumidity);
            infoWind.insertAdjacentElement("afterend",elcloneinfoWind);
        }, 2200);

        const cloneInfoWeather = document.querySelectorAll('.info-weather.active-clone');
        const totalCloneInfoWeather = cloneInfoWeather.length;
        const cloneInfoWeatherFirst = cloneInfoWeather[0];

        const cloneInfoHumidity = document.querySelectorAll('.info-humidity.active-clone');
        const cloneInfoHumidityFirst = cloneInfoHumidity[0];

        const cloneInfoWind = document.querySelectorAll('.info-wind.active-clone');
        const cloneInfoWindFirst = cloneInfoWind[0];

        if(totalCloneInfoWeather > 0){
            cloneInfoWeatherFirst.classList.remove('active-clone');
            cloneInfoHumidityFirst.classList.remove('active-clone');
            cloneInfoWindFirst.classList.remove('active-clone');

            setTimeout(() => {
                cloneInfoWeatherFirst.remove();
                cloneInfoHumidityFirst.remove();
                cloneInfoWindFirst.remove();
            }, 2200);
        }
        await updateForecast(city)
    } 
}
async function updateForecast(city) {
    const forecastdata = await getFetchData('forecast', city)
    const timetaken = '12:00:00'
    const todayDate = new Date().toISOString().split('T')[0]
    forecastItemContainer.innerHTML = ''
    forecastdata.list.forEach(forecastWeather => {
        if(forecastWeather.dt_txt.includes(timetaken) && !forecastWeather.dt_txt.includes(todayDate)) {
            updateForecastItems(forecastWeather)
        }
    })
}
function updateForecastItems(weatherData) {
    const {
        dt_txt: date,
        weather: [{ id }],
        main: { temp }
    } = weatherData

    const datetaken = new Date(date)
    const dateoption = {
        day: '2-digit',
        month: 'short'
    }
    const dateresult = datetaken.toLocaleDateString('en-US', dateoption)

    const forecastItem = `
        <div class="forecast-item">
            <h5 class="item-date regular-txt">${dateresult}</h5>
            <img src="images/weather/${getweatherIcon(id)}" class="item-image">
            <h5 class="item-temp">${Math.round(temp)}°C</h5>
        </div>
    `
    forecastItemContainer.insertAdjacentHTML('beforeend', forecastItem)
}