import {html} from '../../node_modules/lit-html/lit-html.js'
import { getOfferById, onDelete } from '../data/services.js'
import { getUserData } from '../util.js'



const detailsTemplate = (offer,deleteOffer,userDataId) => 
html`<section id="details">
<div id="details-wrapper">
  <img id="details-img" src=${offer.imageUrl} alt="example1" />
  <p id="details-title">${offer.title}</p>
  <p id="details-category">
    Category: <span id="categories">${offer.category}</span>
  </p>
  <p id="details-salary">
    Salary: <span id="salary-number">${offer.salary}</span>
  </p>
  <div id="info-wrapper">
    <div id="details-description">
      <h4>Description</h4>
      <span>${offer.description}</span>
    </div>
    <div id="details-requirements">
      <h4>Requirements</h4>
      <span>${offer.requirements}</span>
    </div>
  </div>
  <p>Applications: <strong id="applications">1</strong></p>
  <div id="action-buttons">
   ${offer.isOwner ? 
    html `
    <a href=/edit/${offer._id} id="edit-btn">Edit</a>
    <a href="javascript:void(0)" id="delete-btn" @click = ${deleteOffer} >Delete</a>` : null}
  

   ${offer.isOwner == false && userDataId  ? html `<a href="" id="apply-btn">Apply</a>` : null} 
    
  </div>
</div>
</section>`


export async function showDetailsPage(ctx) {

    const id = ctx.params.id
    const offer = await getOfferById(id)
    const userDataId = getUserData()?._id
    
    let isOwner = userDataId && userDataId == offer._ownerId
    offer.isOwner = isOwner
    
    
    ctx.render(detailsTemplate(offer,deleteOffer,userDataId))
   

    async function deleteOffer(e) {
        e.preventDefault()
        
        let confirmation = confirm('Are you sure to delete this offer')
        if(confirmation) {
            await onDelete(id)
            ctx.page.redirect('/catalog')
        }
    }


}