import {html} from '../../node_modules/lit-html/lit-html.js'
import { deleteFruitById, getFruitById } from '../data/services.js'
import { getUserData } from '../util.js'



const detailsTemplate = (fruit,isCreator,onDelete) => html ` <section id="details">
<div id="details-wrapper">
  <img id="details-img" src=${fruit.imageUrl} alt="example1" />
  <p id="details-title">${fruit.name}</p>
  <div id="info-wrapper">
    <div id="details-description">
      <p>${fruit.description}</p>
          <p id="nutrition">Nutrition</p>
         <p id = "details-nutrition">${fruit.nutrition}</p>
    </div>
     <!--Edit and Delete are only for creator-->
     ${isCreator ? html `<div id="action-buttons">
  <a href=/edit/${fruit._id} id="edit-btn">Edit</a>
  <a @click = ${onDelete.bind(null,fruit._id)} href="javascript:void(0)" id="delete-btn">Delete</a>
</div>` : null}

  </div>
</div>
</section>`


export async function showDetailsPage(ctx) {

const fruitId = ctx.params.id
const fruit = await getFruitById(fruitId)

const userId = getUserData()?._id
const isCreator = userId == fruit._ownerId

ctx.render(detailsTemplate(fruit,isCreator,onDelete))

async function onDelete(fruitId) {

    const choice = confirm ('Are you sure to delete this fruit?')

    if(choice) {

        await deleteFruitById(fruitId)
        ctx.page.redirect('/catalog')
    }

}



}