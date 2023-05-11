import {html,render} from './node_modules/lit-html/lit-html.js'

const townsInput = document.getElementById('towns')
const root = document.getElementById('root')
document.getElementById('btnLoadTowns').addEventListener('click',addTowns)


function addTowns (e) {
    e.preventDefault()
    const arr = townsInput.value.split(', ')
   

    const template = (arr) => html`<ul>
        ${arr.map(e => html`<li>${e}</li>`)}
    </ul>`
    
    render(template(arr),root)
    townsInput.value = ''

}