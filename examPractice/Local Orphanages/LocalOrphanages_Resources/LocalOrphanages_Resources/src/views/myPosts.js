import {html} from '../../node_modules/lit-html/lit-html.js'
import { getMyItems } from '../data/services.js'
import { getUserData } from '../util.js'



const myPostsTemplate = (data) => html `<section id="my-posts-page">
<h1 class="title">My Posts</h1>

${data.length > 0 ? data.map(e=> html `<div class="my-posts">
    <div class="post">
        <h2 class="post-title">${e.title}</h2>
        <img class="post-image" src=${e.imageUrl} alt="Material Image">
        <div class="btn-wrapper">
            <a href=/details/${e._id} class="details-btn btn">Details</a>
        </div>
    </div>`) : html `<h1 class="title no-posts-title">You have no posts yet!</h1>`}



</section>`


export async  function showMyPosts(ctx) {

    const userId = getUserData()?._id

    const data = await getMyItems(userId)


    ctx.render(myPostsTemplate(data))






}