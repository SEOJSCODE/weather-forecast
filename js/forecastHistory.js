import {daysBlock, time, oneKelvin, imgUrl} from "./globalConst.js";

export function getCityCoord (city) {
    const serverUrl = 'https://api.openweathermap.org/data/2.5/forecast'
    const cityName = city
    const apiKey = 'a21a4e21ee96247f35e1dab8b15d2fd0\n'
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}`
    return fetch(`${url}`)
        .then(response => {
            return response.json()
        })
        .then(response => {
            let weatherObjects = response.list
            let forecastObjects = weatherObjects.slice(0,3)
            return forecastObjects
        })
        .then(forecastObjects => {
            renderForecastBlocks()
            for(let object of forecastObjects) {
                let newObject = new ForecastObject(object)
                let dayTime = createElement('div', 'day-time')
                let divTime = createElement('div', 'time', `${newObject.hours.padStart(2, '0')}:${newObject.minutes.padEnd(2, '0')}`)
                let divForecast = createElement('div', 'forecast-item')
                let divTemp = createElement('div', 'feel-temp')
                let dayTemp = createElement('p', 'day-temp', `Temperature: ${newObject.temper}`)
                let dayFeel = createElement('p', 'day-feel', `Feels like: ${newObject.feels}`)
                let dayIcon = createElement('div', 'day-icon')
                dayIcon.innerHTML = `<img src="${imgUrl}${newObject.icon}@4x.png">`
                daysBlock.appendChild(dayTime)
                dayTime.appendChild(divTime)
                dayTime.appendChild(divForecast)
                divForecast.appendChild(divTemp)
                divTemp.appendChild(dayTemp)
                divTemp.appendChild(dayFeel)
                divForecast.appendChild(dayIcon)

            }
        })
}

function ForecastObject (object) {
    this.time = Date.parse(object.dt_txt)
    this.hours = new Date(this.time).getHours().toString()
    this.minutes = new Date(this.time).getMinutes().toString()
    this.temper = Math.floor(object.main['temp'] - oneKelvin)
    this.feels = Math.floor(object.main['feels_like'] - oneKelvin)
    this.icon = object.weather[0]['icon']
}

function createElement (elem, elemClass, elemContent) {
    let element = document.createElement(elem)
    element.classList.add(elemClass)
    element.textContent = elemContent
    return element
}

export function renderForecastBlocks() {
    while (daysBlock.firstChild) {
        daysBlock.removeChild(daysBlock.lastChild)
    }
}


