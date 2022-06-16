const selectMainContainer = document.querySelector('.main__container')
const selectContainerForm = document.querySelector('.container__form')
const selectFormInputText = document.querySelector('.form__input-text')
const selectFormInputButton = document.querySelector('.form__input-button')
const selectContainerWeather = document.querySelector('.container__weather')
const selectWeatherTemp = document.querySelector('.weather__temp')
const selectWeatherCity = document.querySelector('.weather__city')
const selectWeatherInfos = document.querySelector('.weather__infos')
const apiKey = '7692fdfcc503a7509f924505444ba26a'
let cityName = ""



function getCityName(){
    cityName = selectFormInputText.value
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=fr`)
    .then(response => response.json())
    .then(data => {
        let recupName = data['name']
        let recupTimeZone = data['timezone']
        let recupDesc = data['weather']['0']['description']
        let recupTemp = data['main']['temp']
        let recupWind = data['wind']['speed']

        selectWeatherInfos.innerHTML = recupTimeZone + "<br/>" + recupDesc + "<br/>" + recupWind
        selectWeatherTemp.innerHTML = recupTemp
        selectWeatherCity.innerHTML = recupName

        if(recupDesc == 'couvert' || recupDesc == 'nuageux' || recupDesc == 'partiellement nuageux'){
            selectMainContainer.setAttribute('style', 'background-image: url("https://i.gifer.com/srG.gif"); background-repeat: no-repeat; background-size: cover;')
        }else if(recupDesc == 'ciel dégagé'){
            selectMainContainer.setAttribute('style', 'background-image: url("https://i.gifer.com/GIWH.gif"); background-repeat: no-repeat; background-size: cover;')
        }else if(recupDesc == 'peu nuageux'){
            selectMainContainer.setAttribute('style', 'background-image: url("https://i.gifer.com/Lx0q.gif"); background-repeat: no-repeat; background-size: cover;')
        }else if(recupDesc == 'brume sèche'){
            selectMainContainer.setAttribute('style', 'background-image: url("https://i.gifer.com/DfSR.gif"); background-repeat: no-repeat; background-size: cover;')
        }else if(recupDesc == 'neige'){
            selectMainContainer.setAttribute('style', 'background-image: url("https://i.gifer.com/1Uiq.gif"); background-repeat: no-repeat; background-size: cover;')
        }else if(recupDesc == 'orage' || recupDesc == 'orageux'){
            selectMainContainer.setAttribute('style', 'background-image: url("https://i.gifer.com/Rnim.gif"); background-repeat: no-repeat; background-size: cover;')
        }else if(recupDesc == 'pluie' || recupDesc == 'pluvieux'){
            selectMainContainer.setAttribute('style', 'background-image: url("https://i.gifer.com/DbH.gif"); background-repeat: no-repeat; background-size: cover;')
        }
    })
    .catch(err => alert('You entered Wrong city name'))

    

}

selectFormInputButton.addEventListener('click', getCityName)


