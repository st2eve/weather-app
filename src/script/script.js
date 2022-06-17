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
const imgClass = ['infos__clear', 'infos__clouds', 'infos__abitclouds', 'infos__mist', 'infos__snow', 'infos__thunder', 'infos__rain']
const imgSrc = ['src/img/sun.png', 'src/img/clouds.png', 'src/img/abitclouds.png', 'src/img/mist.png', 'src/img/snow.png', 'src/img/thunder.png', 'src/img/rain.png']


function getForecast(){

    getCityName()

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&cnt=5&appid=${apiKey}&units=metric&lang=fr`)
    .then(response => response.json())
    .then(data => {

        for(let i = 0; i < 5; i++){
            let recupForTemp = data['list'][i]['main']['temp']
            let recupForcastDesc = data['list'][i]['weather'][0]['description']
            let createArticle = document.createElement('article')
            createArticle.setAttribute('class', 'infos__nextdays')

            let createPForTemp = document.createElement('p')
            createPForTemp.setAttribute('class', 'nextdays__temp')
            createPForTemp.innerHTML = ""
            createPForTemp.innerHTML = `${recupForTemp} °c`
            createArticle.appendChild(createPForTemp)

            let createForDesc = document.createElement('p')
            createForDesc.setAttribute('class', 'nextdays__desc')
            createForDesc.innerHTML = ""
            createForDesc.innerHTML = recupForcastDesc
            createArticle.appendChild(createForDesc)

            for(let j = 0; j < imgClass.length; j++){
                let creatImg = document.createElement('img')
                creatImg.setAttribute('class', imgClass[j])
                creatImg.setAttribute('src', imgSrc[j])
                createArticle.appendChild(creatImg)   
            }

            selectWeatherInfos.appendChild(createArticle)

            const selectInfosDescs = document.querySelectorAll('.nextdays__desc')
            const infosDescsClouds = document.querySelectorAll('.infos__clouds')
            const infosDescClears = document.querySelectorAll('.infos__clear')
            const infosDescABitClouds = document.querySelectorAll('.infos__abitclouds')
            const infosDescsMists = document.querySelectorAll('.infos__mist')
            const infosDescsSnows = document.querySelectorAll('.infos__snow')
            const infosDescsThunders = document.querySelectorAll('.infos__thunder')
            const infosDescsRains = document.querySelectorAll('.infos__rain')

                if(selectInfosDescs[i].innerHTML == 'couvert' || selectInfosDescs[i].innerHTML == 'nuageux' || selectInfosDescs[i].innerHTML == 'partiellement nuageux'){

                    infosDescsClouds[i].setAttribute('style', 'display: initial')
                    
                }else if(selectInfosDescs[i].innerHTML == 'ciel dégagé'){

                    infosDescClears[i].setAttribute('style', 'display: initial')
                    
                }else if(selectInfosDescs[i].innerHTML == 'peu nuageux'){

                    infosDescABitClouds[i].setAttribute('style', 'display: initial')
                    
                }else if(selectInfosDescs[i].innerHTML == 'brume sèche'){

                    infosDescsMists[i].setAttribute('style', 'display: initial')
                    
                }else if(selectInfosDescs[i].innerHTML == 'neige'){

                    infosDescsSnows[i].setAttribute('style', 'display: initial')
                    
                }else if(selectInfosDescs[i].innerHTML == 'orage' || selectInfosDescs[i].innerHTML == 'orageux'){

                    infosDescsThunders[i].setAttribute('style', 'display: initial')
                    
                }else if(selectInfosDescs[i].innerHTML == 'pluie' || selectInfosDescs[i].innerHTML == 'pluvieux' || selectInfosDescs[i].innerHTML == 'légère pluie' || selectInfosDescs[i].innerHTML == 'pluie modérée'){

                    infosDescsRains[i].setAttribute('style', 'display: initial')
                    
                }
            

        }

        

    })
    .catch(err => alert('There is a problem with the coord of the city'))

}


function getCityName(){

    
    cityName = selectFormInputText.value


    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=fr`)
    .then(response => response.json())
    .then(data => {
        let recupName = data['name']
        let recupDesc = data['weather']['0']['description']
        let recupTemp = data['main']['temp']
        let recupWind = data['wind']['speed']

        selectWeatherTemp.innerHTML = ""
        selectWeatherCity.innerHTML = ""

        if(document.querySelector('.infos__wind')){

            const removeWind = document.querySelector('.infos__wind')
            const removeDesc = document.querySelector('.infos__desc')
            const removeArticle = document.querySelectorAll('.infos__nextdays')

            removeWind.remove()
            removeDesc.remove()

            for(let l = 0; l < removeArticle.length; l++){
                removeArticle[l].remove()
            }
        }

        let createPDesc = document.createElement('p')
        createPDesc.setAttribute('class', 'infos__desc')
        createPDesc.innerHTML = recupDesc
        selectWeatherInfos.prepend(createPDesc)

        let createPWind = document.createElement('p')
        createPWind.setAttribute('class', 'infos__wind')
        createPWind.innerHTML = `Vent : ${Math.round(recupWind*3.6)} km/h`
        selectWeatherInfos.prepend(createPWind)
        
        selectWeatherTemp.innerHTML = `${recupTemp} °c`
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
        }else if(recupDesc == 'pluie' || recupDesc == 'pluvieux' || recupDesc == 'pluie modérée' || recupDesc == 'légère pluie'){
            selectMainContainer.setAttribute('style', 'background-image: url("https://i.gifer.com/DbH.gif"); background-repeat: no-repeat; background-size: cover;')
        }
    })
    .catch(err => alert('You entered Wrong city name'))

}

selectFormInputButton.addEventListener('click', getForecast)


