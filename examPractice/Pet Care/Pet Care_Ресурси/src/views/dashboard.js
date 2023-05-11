import { html } from '../../node_modules/lit-html/lit-html.js'
import { getAllPets } from '../data/services.js'


const dashBoardTemplate = (allPetCards) =>
 html`<section id="dashboard">
    <h2 class="dashboard-title">Services for every animal</h2>
    <div class="animals-dashboard">

    ${allPetCards.length > 0 ? allPetCards.map(petCard) : 
        html `<div>
                    <p class="no-pets">No pets in dashboard</p>
                </div>`}            

       
    </div>
</section>`

const petCard = (pet) =>
    html`<div class="animals-board">
    <article class="service-img">
        <img class="animal-image-cover" src=${pet.image}>
    </article>
    <h2 class="name">${pet.name}</h2>
    <h3 class="breed">${pet.breed}</h3>
    <div class="action">
        <a class="btn" href=/details/${pet._id}>Details</a>
    </div>
</div>`

export async function showDashboardPage(ctx) {

const allPetCards = await getAllPets()

ctx.render(dashBoardTemplate(allPetCards))

}