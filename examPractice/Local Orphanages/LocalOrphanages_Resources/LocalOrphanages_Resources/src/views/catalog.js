import {html} from '../../node_modules/lit-html/lit-html.js'
import { getAll } from '../data/services.js'




const catalogTemplate = (data) => html`  <section id="dashboard-page">
<h1 class="title">All Posts</h1>


<div class="all-posts">
${data.length > 0 ? data.map(e => html `<div class="post">
        <h2 class="post-title">${e.title}</h2>
        <img class="post-image" src=${e.imageUrl} alt="Material Image">
        <div class="btn-wrapper">
            <a href=/details/${e._id} class="details-btn btn">Details</a>
        </div>
    </div>`) : html `<h1 class="title no-posts-title">No posts yet!</h1>`}

    
</div>


</section>`

export async function showCatalogPage(ctx) {


const data = await getAll()


ctx.render(catalogTemplate(data))
}