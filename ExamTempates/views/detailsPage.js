import { getOneItem } from '../api/getData.js'
import { getDataFromLocaleStorage } from '../api/utils.js'
import {html} from '../node_modules/lit-html/lit-html.js'



const detailsTemplate = (data,isOwner) => html ``

let isOwner;

export async function showDetailsPage(ctx) {
    const id = ctx.params.id
    
    const data = await getOneItem(id)

    
   
    ctx.render(detailsTemplate(data,isOwner))
    
    

}

// function validationView (data) {
//   let userId = getDataFromLocaleStorage()
//   if(userId && (userId._id == data._ownerId)) {
//    return html `<a href="/edit/${data._id}" id="edit-btn">Edit</a>
//            <a href="/delete/${data._id}" id="delete-btn">Delete</a>`
//   } else if( userId && (userId._id != data._ownerId)) {
//    return html ` <a href="" id="like-btn">Like</a>`
//   }
// }
