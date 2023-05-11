import { deleteItemById, getEventById, getTheterAllLikes, getUserLikes, postLike } from "../data/services.js";
import {html} from '../../node_modules/lit-html/lit-html.js'
import { getUserData } from "../util.js";





const detailsTemplate = (play,userId,isOwner,onDelete,totalLikes,isAlreadyLiked,like) => html `<section id="detailsPage">
<div id="detailsBox">
    <div class="detailsInfo">
        <h1>Title: ${play.title}</h1>
        <div>
            <img src=${play.imageUrl}/>
        </div>
    </div>

    <div class="details">
        <h3>Theater Description</h3>
        <p>${play.description}</p>
        <h4>Date: ${play.date}</h4>
        <h4>Author: ${play.author}</h4>
        <div class="buttons">
        ${isOwner ? html `
            <a class="btn-delete" href="javascript:void(0)" @click = ${onDelete}>Delete</a>
            <a class="btn-edit" href="/edit/${play._id}">Edit</a>
            
        `: null}
        ${!isAlreadyLiked && !isOwner ? 
            html `<a class="btn-like" href="javascript:void(0)" @click = ${like}>Like</a>` : null}
        </div>
        <p class="likes">Likes: ${totalLikes}</p>
    </div>
</div>
</section>`



export async function showDetailsPage(ctx) {

const playId = ctx.params.id

const play = await getEventById(playId)

const userId = getUserData()?._id
const isOwner = userId == play._ownerId
const totalLikes = await getTheterAllLikes(playId)

 const isAlreadyLiked = await getUserLikes(playId,userId) > 0


ctx.render(detailsTemplate(play,userId,isOwner,onDelete,totalLikes,isAlreadyLiked,like))


 async function onDelete(id) {

    const choice = confirm ('Are you sure to delete this event')

    if(choice) {
        await deleteItemById(playId)
        ctx.page.redirect('/profile')

    }

}

async function like (e) {
    e.preventDefault()
    const result = await postLike(playId)
    ctx.render(detailsTemplate(play,userId,isOwner,onDelete,totalLikes,isAlreadyLiked,like))
    ctx.page.redirect(`/details/${playId}`)
}


}