const selectMainContainer = document.querySelector('.main__container')
const selectContainerForm = document.querySelector('.container__form')
const selectFormInputText = document.querySelector('.form__input-text')
const selectFormInputButton = document.querySelector('.form__input-button')
const selectContainerWeather = document.querySelector('.container__weather')
const selectWeatherTemp = document.querySelector('.weather__temp')
const selectWeatherCity = document.querySelector('.weather__city')
const selectWeatherInfos = document.querySelector('.weather__infos')
const selectButtonCompare = document.querySelector('.main__button-compare')
const selectBlockCompare = document.querySelector('.main__block-compare')
const selectCityOne = document.querySelector('.form__input-cityOne')
const selectCityTwo = document.querySelector('.form__input-cityTwo')
const selectButtonCityOne = document.querySelector('.form__input-buttonOne-compare')
const selectButtonCityTwo = document.querySelector('.form__input-buttonTwo-compare')
const selectMain = document.querySelector('main')
const apiKey = '7692fdfcc503a7509f924505444ba26a'
let cityName = ""
let cityNameOne = ""
let cityNameTwo = ""
const imgClass = ['infos__clear', 'infos__clouds', 'infos__abitclouds', 'infos__mist', 'infos__snow', 'infos__thunder', 'infos__rain']
const imgSrc = ['src/img/sun.png', 'src/img/clouds.png', 'src/img/abitclouds.png', 'src/img/mist.png', 'src/img/snow.png', 'src/img/thunder.png', 'src/img/rain.png']


function getForecast(){

    getCityName()


    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&cnt=5&appid=${apiKey}&units=metric&lang=fr`)
    .then(response => response.json())
    .then(dataBis => {

        for(let i = 0; i < 5; i++){
            let recupForTemp = dataBis['list'][i]['main']['temp']
            let recupForcastDesc = dataBis['list'][i]['weather'][0]['description']
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

        getChart()

    })
    .catch(err => alert('There is a problem with the coord of the city'))


}


function getChart(){

    const canvasRemove = document.querySelector('#myChart')
    canvasRemove.remove()
    const createCanvas = document.createElement('canvas')
    createCanvas.setAttribute('id', 'myChart')
    const selectDivCanvas = document.querySelector('.main__charts')
    selectDivCanvas.appendChild(createCanvas)

    let selectTempCharts = document.querySelectorAll('.nextdays__temp')

    let TempChartsA = selectTempCharts[0].innerHTML.match(/(\d+)/)
    let TempChartsB = selectTempCharts[1].innerHTML.match(/(\d+)/)
    let TempChartsC = selectTempCharts[2].innerHTML.match(/(\d+)/)
    let TempChartsD = selectTempCharts[3].innerHTML.match(/(\d+)/)
    let TempChartsE = selectTempCharts[4].innerHTML.match(/(\d+)/)


    const labels = [
        'jour 1',
        'jour 2',
        'jour 3',
        'jour 4',
        'jour 5',
    ];
    
    const data = {
        labels: labels,
        datasets: [{
          label: 'Temp. over days',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: [TempChartsA[0], TempChartsB[0], TempChartsC[0], TempChartsD[0], TempChartsE[0]],
        }]
    };
    
    const config = {
        type: 'line',
        data: data,
        options: {}
    };

    const myChart = new Chart(
        document.getElementById('myChart'),
        config
    );


}

function resetContent(){
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
}

function getCityName(){

    resetContent()


    cityName = selectFormInputText.value


    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=fr`)
    .then(response => response.json())
    .then(data => {
        let recupName = data['name']
        let recupDesc = data['weather']['0']['description']
        let recupTemp = data['main']['temp']
        let recupWind = data['wind']['speed']

        let createPWind = document.createElement('p')
        createPWind.setAttribute('class', 'infos__wind')
        createPWind.innerHTML = `Vent : ${Math.round(recupWind*3.6)} km/h`
        selectWeatherInfos.prepend(createPWind)

        let createPDesc = document.createElement('p')
        createPDesc.setAttribute('class', 'infos__desc')
        createPDesc.innerHTML = recupDesc
        selectWeatherInfos.prepend(createPDesc)

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
            selectMainContainer.setAttribute('style', 'background-image: url("https://i.gifer.com/JTCO.gif"); background-repeat: no-repeat; background-size: cover;')
        }
    })
    .catch(err => alert('You entered Wrong city name'))

    
    if(selectBlockCompare.getAttribute('style') != null){
        selectButtonCompare.setAttribute('style', 'display: none')
    }else{
        selectButtonCompare.setAttribute('style', 'display: block')
    }

    const selectTitle = document.querySelector('.main__title')
    selectTitle.setAttribute('style', 'display: none')
    
}

function cityCompareDisplay(){

    selectMain.setAttribute('style', 'grid-template-columns: 2fr 1fr;')
    selectButtonCompare.setAttribute('style', 'display: none')
    selectBlockCompare.setAttribute('style', 'display: grid; grid-template-rows: 1fr 1fr; justify-content: center;')

}


function cityCompareOne(){

    cityNameOne = selectCityOne.value


    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityNameOne}&appid=${apiKey}&units=metric&lang=fr`)
    .then(response => response.json())
    .then(data => {

        let recupName = data['name']
        let recupDesc = data['weather']['0']['description']
        let recupTemp = data['main']['temp']
        let recupWind = data['wind']['speed']
        let selectTempCityOne = document.querySelector('.compare__temp-cityOne')

        let createPWind = document.createElement('p')
        createPWind.setAttribute('class', 'infos__wind')
        createPWind.innerHTML = `Vent : ${Math.round(recupWind*3.6)} km/h`
        selectTempCityOne.prepend(createPWind)

        let createPDesc = document.createElement('p')
        createPDesc.setAttribute('class', 'infos__desc')
        createPDesc.innerHTML = recupDesc
        selectTempCityOne.prepend(createPDesc)

        let createPTemp = document.createElement('p')
        createPTemp.setAttribute('class', 'infos__temp')
        createPTemp.innerHTML = `${recupTemp} °c`
        selectTempCityOne.prepend(createPTemp)

        let createPName = document.createElement('p')
        createPName.setAttribute('class', 'infos__name')
        createPName.innerHTML = recupName
        selectTempCityOne.prepend(createPName)

    })

}

function cityCompareTwo(){

    cityNameTwo = selectCityTwo.value

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityNameTwo}&appid=${apiKey}&units=metric&lang=fr`)
    .then(response => response.json())
    .then(data => {

        let recupName = data['name']
        let recupDesc = data['weather']['0']['description']
        let recupTemp = data['main']['temp']
        let recupWind = data['wind']['speed']
        let selectTempCityTwo = document.querySelector('.compare__temp-cityTwo')

        let createPWind = document.createElement('p')
        createPWind.setAttribute('class', 'infos__wind')
        createPWind.innerHTML = `Vent : ${Math.round(recupWind*3.6)} km/h`
        selectTempCityTwo.prepend(createPWind)

        let createPDesc = document.createElement('p')
        createPDesc.setAttribute('class', 'infos__desc')
        createPDesc.innerHTML = recupDesc
        selectTempCityTwo.prepend(createPDesc)

        let createPTemp = document.createElement('p')
        createPTemp.setAttribute('class', 'infos__temp')
        createPTemp.innerHTML = `${recupTemp} °c`
        selectTempCityTwo.prepend(createPTemp)

        let createPName = document.createElement('p')
        createPName.setAttribute('class', 'infos__name')
        createPName.innerHTML = recupName
        selectTempCityTwo.prepend(createPName)

    })
}

selectContainerForm.addEventListener('keydown', event => {
    if (event.which === 13) {
        event.preventDefault();
        getForecast();
    }
})
selectFormInputButton.addEventListener('click', getForecast)

selectButtonCompare.addEventListener('click', cityCompareDisplay)

selectCityOne.addEventListener('keydown', event => {
    if (event.which === 13) {
        event.preventDefault();
        cityCompareOne();
    }
})
selectButtonCityOne.addEventListener('click', cityCompareOne)

selectCityTwo.addEventListener('keydown', event => {
    if (event.which === 13) {
        event.preventDefault();
        cityCompareTwo();
    }
})
selectButtonCityTwo.addEventListener('click', cityCompareTwo)