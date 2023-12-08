import {showFromFavourite, renderListCities, favouriteCities} from "./addFavourite.js";
import {listcities} from "./globalConst.js";
import {deleteFavourite} from "./addFavourite.js";
import {renderHtml} from "./renderHtml.js"

export function setCurrentCity (city) {
    let defaultCity = 'Moscow'
    if(city) {
        localStorage.setItem('currentCity', city)
    }
    else {
        localStorage.setItem('currentCity', defaultCity)
    }

}
export function showFromLocalStorage () {
    basicCityInfo()
    renderListCities()
    let keys = Object.keys(localStorage).filter(city => city !== 'currentCity')
    for(const value of keys) {
        let li = document.createElement('li')
        let span = document.createElement('span')
        span.classList.add('delete-button')
        span.addEventListener('click', deleteFavourite)
        li.classList.add('city')
        li.textContent = localStorage.getItem(value)
        li.appendChild(span)
        li.addEventListener('click', showFromFavourite)
        listcities.appendChild(li)
    }
}

export function addToLocalStorage(cities) {
    localStorage.clear()
    for (let value of cities) {
        localStorage.setItem(value, value)
    }
    showFromLocalStorage()
}
export function deleteFromLocalStorage (city) {
    localStorage.removeItem(city)
    setCurrentCity()
}

export function basicCityInfo () {
    if(favouriteCities.length === 0) {
        let keys = Object.keys(localStorage).filter(city => city !== 'currentCity')
        for(let value of keys) {
            favouriteCities.push(localStorage.getItem(value))
        }
    }
    let savedCity = localStorage.getItem('currentCity')
    if(savedCity) {
        renderHtml(savedCity)
    }
    else {
        renderHtml(setCurrentCity())
    }
}