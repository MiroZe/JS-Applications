import { getOneItem } from '../api/getData.js'
import { getDataFromLocaleStorage } from '../api/utils.js'
import { html } from '../node_modules/lit-html/lit-html.js'



const detailTemplate = (detail,isOwner) => html`<div class="row space-top">
<div class="col-md-12">
    <h1>Furniture Details</h1>
</div>
</div>
<div class="row space-top">
<div class="col-md-4">
    <div class="card text-white bg-primary">
        <div class="card-body">
            <img src=${detail.img} />
        </div>
    </div>
</div>
<div class="col-md-4">
    <p>Make: <span>${detail.make}</span></p>
    <p>Model: <span>${detail.model}</span></p>
    <p>Year: <span>${detail.year}</span></p>
    <p>Description: <span>${detail.description}</span></p>
    <p>Price: <span>${detail.price}</span></p>
    <p>Material: <span>${detail.material}</span></p>
    ${isOwner ? html `<div>
        <a href=/Edit/${detail._id} class="btn btn-info">Edit</a>
        <a href=/Delete/${detail._id} class="btn btn-red">Delete</a>
    </div>`:null}
    
    
</div>
</div>`


export async function detailsPage (ctx) {
   const userData = getDataFromLocaleStorage();
  
    let isOwner = false;
    const detail =  await getOneItem(ctx.params.id)
    
     
   if(userData) {
       isOwner = userData._id == detail._ownerId
   }
   
   ctx.render(detailTemplate(detail,isOwner),document.getElementById('root'))

}