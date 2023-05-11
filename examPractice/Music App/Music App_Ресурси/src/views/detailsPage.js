
import {html} from '../../node_modules/lit-html/lit-html.js'
import { deleteAlbumById, getAlbumById } from '../data/services.js'
import { getUserData } from '../util.js'



const detailsTemplate = (currentAlbum,isCreator,onDelete) => html`<section id="detailsPage">
<div class="wrapper">
    <div class="albumCover">
        <img src=${currentAlbum.imgUrl}>
    </div>
    <div class="albumInfo">
        <div class="albumText">

            <h1>Name: ${currentAlbum.name}</h1>
            <h3>Artist: ${currentAlbum.artist}</h3>
            <h4>Genre: ${currentAlbum.genre}</h4>
            <h4>Price: $${currentAlbum.price}</h4>
            <h4>Date: ${currentAlbum.releaseDate}</h4>
            <p>Description: ${currentAlbum.description}</p>
        </div>

        <${isCreator ? html `<div class="actionBtn">
            <a href=/edit/${currentAlbum._id} class="edit">Edit</a>
            <a @click = ${onDelete} href="javascript:void(0)" class="remove">Delete</a>
        </div>` : null}
        
    </div>
</div>
</section>`


export async function showDetailsPage(ctx) {

    const albumId = ctx.params.id

    const currentAlbum = await getAlbumById(albumId)

    const userId = getUserData()?._id

    const isCreator = userId == currentAlbum._ownerId

    ctx.render(detailsTemplate(currentAlbum,isCreator,onDelete))

    async function onDelete(e) {
        e.preventDefault()
        const choice = confirm ('Are you sure to delete this album')

        if(choice) {

            await deleteAlbumById(ctx.params.id)
            ctx.page.redirect('/catalog')

        }
    }


}