import { getAll } from '../api/getData.js'
import {html} from '../node_modules/lit-html/lit-html.js'



const dashBoardTemplate = (data) => html `<h2>Products</h2>
<section id="dashboard">

${data.length > 0 ? data.map(itemTemplate): html`<h2>No products yet.</h2>`}`

 
const itemTemplate = (item) => html `
<div class="product">
<img src=${item.imageUrl} alt="example1" />
<p class="title">${item.name}</p>
<p><strong>Price:</strong><span class="price">${item.price}</span>$</p>
<a class="details-btn" href="/details/${item._id}">Details</a>
</div>` 

export async function showCatalogPage(ctx) {

    const data = await getAll()

    ctx.render(dashBoardTemplate(data))


}