import {html} from '../../node_modules/lit-html/lit-html.js'
import { deletePetById, getDonationForThisUser, getPetById, getTotalDonations, postDonation } from '../data/services.js'
import { getUserData } from '../util.js'

const detailsTemplate = (pet,userId,isCreator,onDelete,totalDonations,isAlreadyDonated,donate) => html `<section id="detailsPage">
<div class="details">
    <div class="animalPic">
        <img src=${pet.image}>
    </div>
    <div>
        <div class="animalInfo">
            <h1>Name: ${pet.name}</h1>
            <h3>Breed: ${pet.breed}</h3>
            <h4>Age: ${pet.age}</h4>
            <h4>Weight: ${pet.weight}</h4>
            <h4 class="donation">Donation: ${totalDonations}$</h4>
        </div>
        <div class="actionBtn">
        ${checkCondition(pet,userId,isCreator,onDelete,totalDonations,isAlreadyDonated,donate)}
        </div>
    </div>
</div>
</section>`


function checkCondition(pet,userId,isCreator,onDelete,totalDonations,isAlreadyDonated,donate) {
    if(userId) {
        if(isCreator == true) {
            return html `
            
            <a href=/edit/${pet._id} class="edit">Edit</a>
            <a @click = ${onDelete.bind(null,pet._id)} href="javascript:void(0)" class="remove">Delete</a>
            `
        } else if (isAlreadyDonated) {
            return html`<a @click = ${donate.bind(null,pet._id)} href="javascript:void(0)" class="donate">Donate</a>`
        }
    }
    return ''
}



export async function showDetailsPage(ctx) {
    update()

    async function update () {

        const petId = ctx.params.id
        const userId = getUserData()?._id

        const totalDonations = Number(await getTotalDonations(petId)) *100
        
        const isAlreadyDonated = await getDonationForThisUser(petId,userId) < 1
        console.log(isAlreadyDonated);


        const pet = await getPetById(petId)
        
        const isCreator = userId == pet._ownerId
        
        ctx.render(detailsTemplate(pet,userId,isCreator,onDelete,totalDonations,isAlreadyDonated,donate))

    }


async function onDelete(id) {

    const choice = confirm (' Are you sure to delete this pet?')
    if(choice) {
        await deletePetById(ctx.params.id)
        ctx.page.redirect('/')
    }

}
async function donate(id) {
    await postDonation(id)
    update()
}

}