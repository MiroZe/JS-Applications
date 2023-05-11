import { getAll } from '../api/getData.js'
import {html} from '../node_modules/lit-html/lit-html.js'



      const dashBoardTemplate = (data) => html `<section id="dashboard">
      <h2>Collectibles</h2>
      <ul class="card-wrapper">
    
        ${data.length > 0 ? data.map(oneItem) : html `<h2>There are no items added yet.</h2>`}
       
      </ul>

    </section>`

export async function showDashboardPage(ctx) {
    const data = await getAll()
    
    ctx.render(dashBoardTemplate(data))
    

    
}


function oneItem (item) {
    return html`<li class="card">
    <img src=${item.imageUrl} />
    <p>
      <strong>Brand: </strong><span class="brand">${item.brand}</span>
    </p>
    <p>
      <strong>Model: </strong
      ><span class="model">${item.model}</span>
    </p>
    <p><strong>Value:</strong><span class="value">${item.value}</span>$</p>
    <a class="details-btn" href=/details/${item._id}>Details</a>
  </li>`
}