function attachEvents() {

    const symbols = {
    Sunny :'\u2600', // ☀
    'Partly sunny' :'\u26C5', // ⛅
    Overcast: '\u2601', // ☁
    Rain :'\u2614 ',// ☂
    Degrees :'\u00B0'   // 

    }
    
const location = document.getElementById('location')
const divCurrent = document.getElementById('current')
const hiddenDiv = document.getElementById('forecast')
const threeDayForecast = document.getElementById('upcoming')

const submitBtn = document.getElementById('submit')
submitBtn.addEventListener('click', showWeather)

async function showWeather(e) {
    e.preventDefault()
    divCurrent.innerHTML = ''
    threeDayForecast.innerHTML = ''
    let baseurl = `http://localhost:3030/jsonstore/forecaster/locations`
try {
    const res = await fetch(baseurl)
    const data = await res.json()
   
    
   
     const foundCity = data.find(c => c.name == location.value)
     
        const currentForecastURL = `http://localhost:3030/jsonstore/forecaster/today/${foundCity.code}`
        let resOne = await fetch(currentForecastURL)
        const dataOne = await resOne.json()
        hiddenDiv.style.display = 'inline';
        const div1 = createEl('div','',divCurrent,{className:"forecasts"})
        const div1Span = createEl('span',`${symbols[dataOne.forecast.condition]}`,div1,{className:"condition symbol"})
        const spanCond = createEl('span','',div1,{className:"condition"})

        const spanCond1 = createEl('span',`${dataOne.name}`,spanCond,{className:"forecast-data"})
        const spanCond2 = createEl('span',`${dataOne.forecast.low}${symbols.Degrees}/${dataOne.forecast.high}${symbols.Degrees}`,spanCond,{className:"forecast-data"})
        const spanCond3 = createEl('span',`${dataOne.forecast.condition}`,spanCond,{className:"forecast-data"})

        const upcomingForecastURL = `http://localhost:3030/jsonstore/forecaster/upcoming/${foundCity.code}`
        const resTwo = await fetch(upcomingForecastURL)
        const dataTwo = await resTwo.json()
        dataTwo.forecast.forEach(element => {
            const upcomingDiv = createEl('div','',threeDayForecast,{className:"forecast-info"})
            const mainSpan = createEl('span','',upcomingDiv,{className:"upcoming"})
            const upcomingSpan = createEl('span',`${symbols[element.condition]}`,mainSpan,{className:"symbol"})
            const upcomingSpanT = createEl('span',`${element.low}${symbols.Degrees}/${element.high}${symbols.Degrees}`,mainSpan,{className:"forecast-data"})
            const upcomingSpanConditions = createEl('span',`${element.condition}`,mainSpan,{className:"forecast-data"})
        });

        function createEl(type,content,parent,attribute) {
            const el = document.createElement(type)
            if(content) {
                el.textContent = content
            }
            if(parent){
                parent.appendChild(el)
            }
            if(attribute) {
                Object.assign(el,attribute)
            }
            return el
        }
} catch (error){
   console.log(error)
}

        
        

        
        
    

}




}

attachEvents();