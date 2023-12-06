import {addfavourite, inputForm} from "./globalConst.js";
import {renderHtml} from "./renderHtml.js";
import {addToFavourite} from "./addFavourite.js";
inputForm.addEventListener('submit', showForecast)
addfavourite.addEventListener('click', addToFavourite)


function showForecast (event) {
    event.preventDefault()
    renderHtml()
}



