import {cityBottom, deg, forecastImg, imgUrl, inputValue, listcities} from "./globalConst.js";
import {getCityCoord} from "./forecastHistory.js";
let favouriteCities = []

export function addToFavourite () {
    if(favouriteCities.includes(cityBottom.textContent)) {
        alert('Error: Такой город уже есть в избранном!')
        return
    }
    else {
        favouriteCities.push(cityBottom.textContent)
        renderFavourite()
    }
}

function renderFavourite () {
    renderListCities()
    for(const value of favouriteCities) {
        let li = document.createElement('li')
        let span = document.createElement('span')
        span.classList.add('delete-button')
        span.addEventListener('click', deleteFavourite)
        li.classList.add('city')
        li.textContent = value
        li.appendChild(span)
        li.addEventListener('click', showFromFavourite)
        listcities.appendChild(li)
    }
    console.log(favouriteCities)

}

export function renderListCities() {
    while (listcities.firstChild) {
        listcities.removeChild(listcities.lastChild)
    }
}

function deleteFavourite (event) {
    event.stopPropagation()
    const deletedLi = event.target.parentNode.textContent
    favouriteCities = favouriteCities.filter(city => city !== deletedLi)
    renderFavourite()
}

export function showFromFavourite (event) {
    const cityName = event.target.textContent
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
                let temperature = temp - oneKelvin
                let mainImg = `<img src="${imgUrl}${mainIcon.icon}@4x.png">`
                deg.textContent = Math.floor(temperature) + "°"
                cityBottom.textContent = result.name
                forecastImg.innerHTML = mainImg
            }
            getCityCoord (cityName)
        })
}
