import {getWeather} from "./getWeather.js";
import {getCityCoord} from "./forecastHistory.js";
import {setCurrentCity} from "./localStorage.js";
import {deg, cityBottom, forecastImg, imgUrl, feelsLike, sunsetBlock, sunriseBlock, inputValue} from "./globalConst.js";

export function renderHtml (city) {
    getCityCoord(city)
    getWeather(city)
        .then(result => {
            if(result !== undefined) {
                let mainInfo = result.main
                let mainIcon = result.weather[0]
                let oneKelvin = Number(273,15)
                let temp = Number(mainInfo.temp)
                let feels = Math.floor(mainInfo.feels_like - oneKelvin)
                let sunrise = new Date(result.sys['sunrise'] * 1000)
                let sunset = new Date(result.sys['sunset'] * 1000)
                let sunriseHours = sunrise.getHours().toString()
                let sunriseMinutes = sunrise.getMinutes().toString()
                let sunsetHours = sunset.getHours().toString()
                let sunsetMinutes = sunset.getMinutes().toString()
                let temperature = temp - oneKelvin
                let mainImg = `<img src="${imgUrl}${mainIcon.icon}@4x.png">`
                deg.textContent = Math.floor(temperature) + "°"
                cityBottom.textContent = result.name
                setCurrentCity(result.name)
                forecastImg.innerHTML = mainImg
                feelsLike.textContent = `Feels like: ${feels}`
                sunriseBlock.textContent = `Sunrise: ${sunriseHours.padStart(2, '0')}:${sunriseMinutes.padEnd(2, '0')}`
                sunsetBlock.textContent = `Sunset: ${sunsetHours.padStart(2, '0')}:${sunsetMinutes.padEnd(2, '0')}`
            }
        })

}
