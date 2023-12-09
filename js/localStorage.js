import {showFromFavourite, renderListCities, favouriteCities} from "./addFavourite.js";
import {listcities, defaultCity} from "./globalConst.js";
import {deleteFavourite} from "./addFavourite.js";
import {renderHtml} from "./renderHtml.js"

export function setCurrentCity (city) {
    let currentCity
    let defaultCity = 'Moscow'
    if(city) {
        currentCity = localStorage.setItem('currentCity', city)
    }
    else {
        currentCity = localStorage.setItem('currentCity', defaultCity)
    }
    return currentCity

}
export function showFromLocalStorage () {
    renderListCities()
    let storageArray = JSON.parse(localStorage.getItem('cities'))
    for(const value of storageArray) {
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
}

export function addToLocalStorage(cities) {
    localStorage.clear()
    localStorage.setItem('cities', JSON.stringify(cities))
    showFromLocalStorage()
}



