import {html} from '../../node_modules/lit-html/lit-html.js'
import { deleteById, getById, getDonationsForPost, getDonationsForUser, postDonation } from '../data/services.js'
import { getUserData } from '../util.js'


const detailsTemplate = (item,userId,isCreator,onDelete,isUserDonate,donations) => html `<section id="details-page">
<h1 class="title">Post Details</h1>

<div id="container">
    <div id="details">
        <div class="image-wrapper">
            <img src=${item.imageUrl} class="post-image">
        </div>
        <div class="info">
            <h2 class="title post-title">${item.title}</h2>
            <p class="post-description">Description: ${item.description}</p>
            <p class="post-address">Address: ${item.address}</p>
            <p class="post-number">Phone number: ${item.phone}</p>
            <p class="donate-Item">Donate Materials: ${donations}</p>

            <!--Edit and Delete are only for creator-->
            <div class="btns">
                ${ checkConditions(item,userId,isCreator,onDelete,isUserDonate)}
            </div>

        </div>
    </div>
</div>
</section>`



 function checkConditions (item,userId,isCreator,onDelete,isUserDonate){
    if(userId) {
        
        if(isCreator == true) {
            return html `<div class="btns">
            <a href=/edit/${item._id} class="edit-btn btn">Edit</a>
            <a @click = ${onDelete} href="javascript:void(0)" class="delete-btn btn">Delete</a>`
        } else if(isUserDonate == false) {
            return html `<a id="donateBtn" href= javascript:void(0) class="donate-btn btn"
             @click = ${makeDonation.bind(null,item)}>Donate</a>`
        }
    }
    return ''
}

async function makeDonation (item) {
    
    const [_,donations] = await Promise.all([
        postDonation(item._id),
        getDonationsForPost(item._id),
        ]);
        
        document.querySelector('.donate-Item').textContent = `Donate Materials: ${donations}`
        document.getElementById('donateBtn').style.display = 'none'

}



export async function showDetailsPage(ctx) {

    const itemId = ctx.params.id

const item = await getById(itemId)




const userId = getUserData()?._id

const isCreator = userId == item._ownerId

let isUserDonate = await getDonationsForUser(itemId,userId) > 0

const donations = await  getDonationsForPost(itemId)





ctx.render(detailsTemplate(item,userId,isCreator,onDelete,isUserDonate,donations))



async function onDelete (e) {
    e.preventDefault()

    const choice = confirm('Are you sure to delete this item')

    if(choice) {
        await deleteById(itemId)
        ctx.page.redirect('/catalog')

    }
}


}
