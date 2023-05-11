import {html} from '../../node_modules/lit-html/lit-html.js'
import { searchFruitsByQuery } from '../data/services.js'
import { createSubmitHandler } from '../util.js'


const searchTemplate = (foundFruits,onSearch) => 
html ` <section id="search">

<div class="form">
  <h2>Search</h2>
  <form @submit = ${onSearch} class="search-form">
    <input
      type="text"
      name="search"
      id="search-input"
    />
    <button class="button-list">Search</button>
  </form>
</div>
<h4>Results:</h4>
  <div class="search-result">
    ${foundFruits.length > 0 ? foundFruits.map(fruitCard) : html `<p class="no-result">No result.</p>`}

 
  </div>
        </section>`


const fruitCard = (fruit) => html `<div class="fruit">
<img src=${fruit.imageUrl} alt="example1" />
<h3 class="title">${fruit.name}</h3>
<p class="description">${fruit.description}</p>
<a class="details-btn" href=/details/${fruit._id}>More Info</a>
</div>`


export function showSearchPage(ctx) {

ctx.render(searchTemplate([],createSubmitHandler(onSearch)))


async function onSearch() {
   const query = document.getElementById('search-input').value
   const foundFruits = await searchFruitsByQuery(query)
   
   ctx.render(searchTemplate(foundFruits,createSubmitHandler(onSearch)))
   

}

}