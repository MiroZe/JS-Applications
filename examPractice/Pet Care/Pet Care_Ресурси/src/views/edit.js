import {html} from '../../node_modules/lit-html/lit-html.js'
import { editPet, getPetById } from '../data/services.js'
import { createSubmitHandler } from '../util.js'


//.value = ${pet.}

const editTemplate = (pet,onEdit) => html `<section id="editPage">
<form @submit=${onEdit} class="editForm">
    <img src=${pet.image}>
    <div>
        <h2>Edit PetPal</h2>
        <div class="name">
            <label for="name">Name:</label>
            <input name="name" id="name" type="text" value=${pet.name}>
        </div>
        <div class="breed">
            <label for="breed">Breed:</label>
            <input name="breed" id="breed" type="text" value=${pet.breed}>
        </div>
        <div class="Age">
            <label for="age">Age:</label>
            <input name="age" id="age" type="text" value=${pet.age}>
        </div>
        <div class="weight">
            <label for="weight">Weight:</label>
            <input name="weight" id="weight" type="text" value=${pet.weight}>
        </div>
        <div class="image">
            <label for="image">Image:</label>
            <input name="image" id="image" type="text" value=${pet.image}>
        </div>
        <button class="btn" type="submit">Edit Pet</button>
    </div>
</form>
</section>`


export async function showEditPage(ctx) {

    const id = ctx.params.id
    const pet = await getPetById(id)
    
ctx.render(editTemplate(pet,createSubmitHandler(onEdit)))



async function onEdit (inputData) {
    
    await editPet(id,inputData)
    ctx.page.redirect('/')
}


}