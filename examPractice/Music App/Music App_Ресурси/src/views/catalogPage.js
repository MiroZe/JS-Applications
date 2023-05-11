import {html} from '../../node_modules/lit-html/lit-html.js'
import { getAllAlbums } from '../data/services.js'
import { getUserData } from '../util.js'




const catalogTemplate = (allAlbums,userDataId) => html `<section id="catalogPage">
<h1>All Albums</h1>


${allAlbums.length > 0 ? allAlbums.map( e => albumTemplate(e,userDataId)):html `<p>No Albums in Catalog!</p>`}


</section>
`
const albumTemplate = (album,userDataId) => html `<div class="card-box">
<img src=${album.imgUrl}>
<div>
    <div class="text-center">
        <p class="name">Name: ${album.name}</p>
        <p class="artist">Artist: ${album.artist}</p>
        <p class="genre">Genre: ${album.genre}</p>
        <p class="price">Price: $${album.price}</p>
        <p class="date">Release Date: ${album.releaseDate}</p>
    </div>
    ${userDataId  ? html `<div class="btn-group">
        <a href=/details/${album._id} id="details">Details</a>
    </div>` :null}
    
</div>
</div>` 




export async  function showCatalogPage(ctx) {

    const userDataId = getUserData()?._id

    console.log(userDataId);

    

    const allAlbums = await getAllAlbums()

    ctx.render(catalogTemplate(allAlbums,userDataId))
}




