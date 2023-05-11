import { html } from '../../node_modules/lit-html/lit-html.js'
import { deleteById, getById, getCreatorLikes, getTotalLikes, postLike } from '../data/services.js'

import { getUserData } from '../util.js'



const detailsTemplate = (album,userId,isCreator,totalLikes,onDelete,onLike,isAlredyLiked) => html`<section id="details">
    <div id="details-wrapper">
        <p id="details-title">Album Details</p>
        <div id="img-wrapper">
            <img src=${album.imageUrl} alt="example1" />
        </div>
        <div id="info-wrapper">
            <p><strong>Band:</strong><span id="details-singer">${album.singer}</span></p>
            <p>
                <strong>Album name:</strong><span id="details-album">${album.album}</span>
            </p>
            <p><strong>Release date:</strong><span id="details-release">${album.release}</span></p>
            <p><strong>Label:</strong><span id="details-label">${album.label}</span></p>
            <p><strong>Sales:</strong><span id="details-sales">${album.sales}</span></p>
        </div>
        <div id="likes">Likes: <span id="likes-count">${totalLikes}</span></div>

        ${checkConditions(album,userId, isCreator,onDelete,onLike,isAlredyLiked)}
        
    </div>
</section>`

function checkConditions(album,userId, isCreator,onDelete,onLike,isAlredyLiked) {
    if (userId) {
        if (isCreator == true) {
            return html`<div id="action-buttons">
    <a href=/edit/${album._id} id="edit-btn">Edit</a>
    <a href="javascript:void(0)" id="delete-btn" @click = ${onDelete.bind(null,album._id)}>Delete</a>
    </div>`
        } else if(!isAlredyLiked){
            return html`<div id="action-buttons">
            <a @click = ${onLike.bind(null,album._id)} href="javascript:void(0)" id="like-btn">Like</a>
            </div>`
        }
    }
    return ''
}


export async function showDetailsPage(ctx) {



    update()
  

    async function update() {


        const albumId = ctx.params.id

        const album = await getById(albumId)

        const userId = getUserData()?._id

        let totalLikes = await getTotalLikes(albumId)

        const isCreator = userId == album._ownerId
        const isAlredyLiked = await getCreatorLikes(albumId,userId) > 0
        isAlredyLiked
        
        
        ctx.render(detailsTemplate(album,userId,isCreator,totalLikes,onDelete,onLike,isAlredyLiked))

        async function onDelete(id) {
            const choice = confirm('Are you sure?')
    
            if(choice) {
                await deleteById(id)
                ctx.page.redirect('/catalog')
            }
    }

}

async function onLike(albumId) {
    await postLike(albumId)
    update()
    
}

}







