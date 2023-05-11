import { getOneItem } from '../api/getData.js'
import {html, nothing} from '../node_modules/lit-html/lit-html.js'



const detailTemplate = (data,ctx,validation,isLoggedUser) => html `<section id="details">
<div id="details-wrapper">
  <img id="details-img" src=${data.imageUrl} />
  <p id="details-title">${data.name}</p>
  <p id="details-category">
    Category: <span id="categories">${data.category}</span>
  </p>
  <p id="details-price">
    Price: <span id="price-number">${data.price}</span>$</p>
  <div id="info-wrapper">
    <div id="details-description">
      <h4>Bought: <span id="buys">0</span> times.</h4>
      <span
        >${data.description}</span
      >
    </div>
  </div>

  <div id="action-buttons">
    ${isLoggedUser ?
    validation(ctx.user._id,data._ownerId): nothing
    
    }
  </div>
</div>
</section>`

export async function showDetailsPage(ctx) {

    const id = ctx.params.id

    const data = await getOneItem(ctx.params.id)

    let isLoggedUser = ctx.user !== null
    
    function validation(userId,ownerId,){
        if(userId && (userId == ownerId) ) {
            return html`
                <a href="/edit/${data._id}" id="edit-btn">Edit</a>
                <a href="/delete/${data._id}" id="delete-btn">Delete</a>`
        } else if(userId && (userId !== ownerId)) {
                return html `<a href="" id="buy-btn">Buy</a>`
        }
    }
    ctx.render(detailTemplate(data,ctx,validation,isLoggedUser))
   
    const buyBtn = document.getElementById('buy-btn')
    buyBtn.addEventListener('click',buyFunc)


    function buyFunc(e) {
        e.preventDefault();
        buyBtn.parentElement.remove()
        
    }

}




