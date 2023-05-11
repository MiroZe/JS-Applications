import {html} from '../../node_modules/lit-html/lit-html.js'
import { getallFruits } from '../data/services.js'



const dashboardTemplate = (allFruits) => html `<h2>Fruits</h2>
<section id="dashboard">
  ${allFruits.length > 0 ? allFruits.map(fruitCard) : html `<h2>No fruit info yet.</h2>`}
 
</section>

 `

const fruitCard = (fruit) => html ` <div class="fruit">
<img src=${fruit.imageUrl} />
<h3 class="title">${fruit.name}</h3>
<p class="description">${fruit.description}</p>
<a class="details-btn" href=/details/${fruit._id}>More Info</a>
</div>`

export async function showDashboardPage(ctx) {


const allFruits = await getallFruits()

ctx.render(dashboardTemplate(allFruits))

}