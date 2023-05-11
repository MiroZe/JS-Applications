import {html} from '../../node_modules/lit-html/lit-html.js'
import { getMyItems } from '../data/service.js'
import { getUserData } from '../util.js'


const myListTemplate = (myItems) => html ` <section id="my-listings">
<h1>My car listings</h1>
<div class="listings">

    ${myItems.length > 0 ? myItems.map(oneCarTemplate) 
    : html ` <p class="no-cars"> You haven't listed any cars yet.</p>`}

   
</div>
</section>`

const oneCarTemplate = (item) => html `<div class="listing">
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
        <a href= /details/${item._id} class="button-carDetails">Details</a>
    </div>
</div>
</div>`

export async function showMyListPage(ctx) {

    const userId = getUserData()._id

const myItems = await getMyItems(userId)

ctx.render(myListTemplate(myItems))





}