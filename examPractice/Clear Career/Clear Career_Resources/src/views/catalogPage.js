import {html} from '../../node_modules/lit-html/lit-html.js'
import { getAllOffers } from '../data/services.js'



const catalogTemplate = (data) => 
html`<section id="dashboard">
<h2>Job Offers</h2>

${data == 0 ? html `<h2>No offers yet.</h2>` : 
data.map(offer)}

</section>`
 
export async function showCatalogPage(ctx) {

    const data = await getAllOffers()
    
    ctx.render(catalogTemplate(data))


}

const offer = (offer) => html`<div class="offer">
<img src=${offer.imageUrl} alt="example1" />
<p>
  <strong>Title: </strong><span class="title">${offer.title}</span>
</p>
<p><strong>Salary:</strong><span class="salary">${offer.salary}</span></p>
<a class="details-btn" href=/details/${offer._id}>Details</a>
</div>`
