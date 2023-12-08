import {addfavourite, inputForm, inputValue, body} from "./globalConst.js";
import {renderHtml} from "./renderHtml.js";
import {addToFavourite} from "./addFavourite.js";
import {showFromLocalStorage} from "./localStorage.js";
inputForm.addEventListener('submit', showForecast)
addfavourite.addEventListener('click', addToFavourite)




showFromLocalStorage()
function showForecast (event) {
    event.preventDefault()
    let cityName = inputValue.value.trim()
    renderHtml(cityName)
}



