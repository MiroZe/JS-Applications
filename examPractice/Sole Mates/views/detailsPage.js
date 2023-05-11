import { getOneItem } from '../api/getData.js'
import { getDataFromLocaleStorage } from '../api/utils.js'
import {html} from '../node_modules/lit-html/lit-html.js'



const detailsTemplate = (data,validationView) => html ` <section id="details">
<div id="details-wrapper">
  <p id="details-title">Shoe Details</p>
  <div id="img-wrapper">
    <img src="${data.imageUrl}" alt="example1" />
  </div>
  <div id="info-wrapper">
    <p>Brand: <span id="details-brand">${data.brand}</span></p>
    <p>
      Model: <span id="details-model">${data.model}</span>
    </p>
    <p>Release date: <span id="details-release">${data.release}</span></p>
    <p>Designer: <span id="details-designer">${data.designer}</span></p>
    <p>Value: <span id="details-value">${data.value}</span></p>
  </div>

  ${validationView(data)}
  
</div>
</section>`

let isOwner;

export async function showDetailsPage(ctx) {
    const id = ctx.params.id
    
    const data = await getOneItem(id)

    ctx.render(detailsTemplate(data,validationView))
    
    

}

function validationView (data) {
  let userId = getDataFromLocaleStorage()
  if(userId && (userId._id == data._ownerId)) {
   return html `<div id="action-buttons">
   <a href=/edit/${data._id} id="edit-btn">Edit</a>
   <a href=/delete/${data._id} id="delete-btn">Delete</a>
 </div>`
  } 
}
