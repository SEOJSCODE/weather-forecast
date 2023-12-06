import {inputValue} from "./globalConst.js";


export function getWeather() {
    const serverUrl = 'https://api.openweathermap.org/data/2.5/weather'
    const cityName = inputValue.value.trim()
    const apiKey = 'a21a4e21ee96247f35e1dab8b15d2fd0\n'
    const currentDate = Date.now()
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
}


