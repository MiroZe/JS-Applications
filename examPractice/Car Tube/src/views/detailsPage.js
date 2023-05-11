import {html} from '../../node_modules/lit-html/lit-html.js'
import { deleteCarById, getCarById } from '../data/service.js'
import { createSubmitHandler, getUserData } from '../util.js'



const detailsTemplate = (car,onDelete,userId,ownerId) => html `<section id="listing-details">
<h1>Details</h1>
<div class="details-info">
    <img src=${car.imageUrl}>
    <hr>
    <ul class="listing-props">
        <li><span>Brand:</span>${car.brand}</li>
        <li><span>Model:</span>${car.model}</li>
        <li><span>Year:</span>${car.year}</li>
        <li><span>Price:</span>${car.price}$</li>
    </ul>

    <p class="description-para">${car.description}</p>
    ${buttonControl(car,userId,ownerId,onDelete)}
    
</div>
</section>`

function buttonControl (car,userId,ownerId,onDelete) {
    if(userId == ownerId) {
        return html`<div class="listings-buttons">
        <a href=/edit/${car._id} class="button-list">Edit</a>
        <a href=javascript:void(0) class="button-list" @click = ${onDelete}>Delete</a>
    </div>`
    }
    return ''
}

export async function showDetailsPage(ctx) {

    const carId = ctx.params.id
    const car = await getCarById(carId)

    const userId = getUserData()?._id
    const ownerId = car._ownerId


    ctx.render(detailsTemplate(car, onDelete,userId,ownerId))

async function onDelete(e) {
    e.preventDefault()
    const choice = confirm ('Are you sure to delete this car')
    if(choice) {

        await deleteCarById(carId)
        ctx.page.redirect('/catalog')
    }
}


}