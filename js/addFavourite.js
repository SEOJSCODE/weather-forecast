import {
    cityBottom, defaultCity,
    deg,
    feelsLike,
    forecastImg,
    imgUrl,
    inputValue,
    listcities,
    sunriseBlock,
    sunsetBlock
} from "./globalConst.js";
import {getCityCoord} from "./forecastHistory.js";
import {addToLocalStorage, showFromLocalStorage, setCurrentCity} from "./localStorage.js";
import {renderHtml} from "./renderHtml.js";

export let favouriteCities = []
export function addToFavourite (event) {
    event.stopPropagation()
    if(favouriteCities.includes(cityBottom.textContent)) {
        alert('Error: Такой город уже есть в избранном!')
        return
    }
    else {
        let favouriteCity = cityBottom.textContent
        favouriteCities.push(favouriteCity)
        addToLocalStorage(favouriteCities)
        setCurrentCity(cityBottom.textContent)
    }
}


export function renderListCities() {
    while (listcities.firstChild) {
        listcities.removeChild(listcities.lastChild)
    }
}

export function deleteFavourite (event) {
    event.stopPropagation()
    const deletedLi = event.target.parentNode.textContent
    favouriteCities = favouriteCities.filter(city => city !== deletedLi)
    addToLocalStorage(favouriteCities)
    renderHtml(defaultCity)
}

export function showFromFavourite (event) {
    const cityName = event.target.textContent
    setCurrentCity(cityName)
    const serverUrl = 'https://api.openweathermap.org/data/2.5/weather'
    const apiKey = 'a21a4e21ee96247f35e1dab8b15d2fd0\n'
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}`
    return fetch(`${url}`)
        .then(response => {
            if(response.status !== 200) {
                throw new Error('Произошла ошибка')
            }
            inputValue.value = ''
            return response.json()

        })
        .catch(error => console.log(error))
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
            getCityCoord (cityName)
        })
}
