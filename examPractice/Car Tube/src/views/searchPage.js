import {html} from '../../node_modules/lit-html/lit-html.js'
import { getCarsByQuery } from '../data/service.js'


const searchTemplate =(search,cars) => html`<section id="search-cars">
<h1>Filter by year</h1>

<div class="container">
    <input id="search-input" type="text" name="search" placeholder="Enter desired production year">
    <button @click = ${search} class="button-list">Search</button>
</div>

<h2>Results:</h2>
<div class="listings">

    ${cars.length > 0 ? cars.map(resultTemplate)
    : html `<p class="no-cars"> No results.</p>`}
  
    
</div>
</section>
`

const resultTemplate = (item) => html `<div class="listing">
<div class="preview">
    <img src=${item.imageUrl}>
</div>
<h2>${item.brand} ${item.model}</h2>
<div class="info">
    <div class="data-info">
        <h3>Year: ${item.year}</h3>
        <h3>Price: ${item.price} $</h3>
    </div>
    <div class="data-buttons">
        <a href=/details/${item._id} class="button-carDetails">Details</a>
    </div>
</div>
</div>`

export function showSearchPage(ctx) {


    let cars = []
   
    ctx.render(searchTemplate(search,cars))

    async function search(e) {
        e.preventDefault()
        const query = document.querySelector('#search-input').value
       const result = await getCarsByQuery(query)
       cars = result
       ctx.render(searchTemplate(search,cars))

    }
}