import {html} from '../../node_modules/lit-html/lit-html.js'
import { getAlbumsByQuery } from '../data/services.js'
import { getUserData } from '../util.js'

const searchTemplate =(onSearch,result,userId) => html `<section id="searchPage">
<h1>Search by Name</h1>

<div class="search">
    <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
    <button @click = ${onSearch} class="button-list">Search</button>
</div>

<h2>Results:</h2>

<div class="search-result">
    ${result.length > 0 ? result.map(item => oneItem(item,userId)): html `<p class="no-result">No result.</p>`}
    
</div>
</section>`

function oneItem (item,userId) { 
    return html `<div class="card-box">
<img src=${item.imgUrl}>
<div>
    <div class="text-center">
        <p class="name">Name: ${item.name}</p>
        <p class="artist">Artist: ${item.artist}</p>
        <p class="genre">Genre: ${item.genre}</p>
        <p class="price">Price: $${item.price}</p>
        <p class="date">Release Date: ${item.releaseDate}</p>
    </div>
    ${userId == item._ownerId ? html`<div class="btn-group">
        <a href=/details/${item._id} id="details">Details</a>
    </div>` : null}
    
</div>
</div>`
}

export function showSearchPage (ctx) {

    ctx.render(searchTemplate(onSearch,[]))

    const userId = getUserData()?._id

   


    async function onSearch (e) {
        e.preventDefault()
        const query = document.getElementById('search-input').value

       const result = await getAlbumsByQuery(query)
       console.log(result);
       ctx.render(searchTemplate(onSearch,result,userId))

    }

}
