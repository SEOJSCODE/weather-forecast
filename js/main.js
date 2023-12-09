import {addfavourite, defaultCity, inputForm, inputValue} from "./globalConst.js";
import {renderHtml} from "./renderHtml.js";
import {addToFavourite} from "./addFavourite.js";
import {showFromLocalStorage} from "./localStorage.js";
inputForm.addEventListener('submit', showForecast)
addfavourite.addEventListener('click', addToFavourite)



renderHtml(defaultCity)
showFromLocalStorage()
function showForecast (event) {
    event.preventDefault()
    let cityName = inputValue.value.trim()
    renderHtml(cityName)
}



