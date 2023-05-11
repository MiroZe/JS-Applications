import { html } from "../../node_modules/lit-html/lit-html.js"
import { createComment, deleteById, gameDetails, getComments } from "../data/services.js"
import { getUserData } from "../utils.js"



const detailsTemplate = (game,isOwner,userId,onDelete,allComments,post) => html`<section id="game-details">
<h1>Game Details</h1>
<div class="info-section">

    <div class="game-header">
        <img class="game-img" src=${game.imageUrl} />
        <h1>${game.title}</h1>
        <span class="levels">MaxLevel: ${game.maxLevel}</span>
        <p class="type">${game.category}</p>
    </div>

    <p class="text">${game.summary}</p>

    <!-- Bonus ( for Guests and Users ) -->
    ${(userId == undefined && !isOwner) || (userId != undefined && !isOwner) ? html `<div class="details-comments">
        <h2>Comments:</h2>
        <ul>
            ${allComments.length > 0 ? 
                allComments.map(e=> html `<li class="comment">
                <p>Content: ${e.content}</p>
            </li>`) : html `<p class="no-comment">No comments.</p>`}
              
        </ul>
        <!-- Display paragraph: If there are no games in the database -->
        
    </div>` : null}

    <!-- Edit/Delete buttons ( Only for creator of this game )  -->
    ${isOwner ? html `<div class="buttons">
        <a href="/edit/${game._id}" class="button">Edit</a>
        <a href="javascript:void(0)" class="button" @click = ${onDelete}>Delete</a>
    </div>`: null}
    
</div>

<!-- Bonus -->
<!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) -->
${userId && !isOwner ? html `<article class="create-comment">
    <label>Add new comment:</label>
    <form @submit = ${post} class="form">
        <textarea name="comment" placeholder="Comment......"></textarea>
        <input class="btn submit" type="submit" value="Add Comment">
    </form>
</article>`: null}


</section>
`


export async function showDetailsPage(ctx) {

const id = ctx.params.id
const gameId = ctx.params.id
console.log(gameId);

const [game,allComments] = await Promise.all([
     gameDetails(gameId),
     getComments(gameId)
])

const userId = getUserData()?._id
const isOwner = userId == game._ownerId


console.log(allComments);



ctx.render(detailsTemplate(game,isOwner,userId,onDelete,allComments,post))


async function onDelete (id) {

    const confirmation = confirm(`Are you sure to delete ${game.title} game`)
    if(confirmation) {
        await deleteById(ctx.params.id)
        ctx.page.redirect('/')

    }
}

async function post(e) {
    e.preventDefault();
    let id = ctx.params.id
    const formData = new FormData(e.currentTarget)
    const contentObj = Object.fromEntries(formData.entries())
    const content = contentObj.comment
    const result = await createComment({id,content})
    e.target.reset()

    ctx.page.redirect(`/details/${id}`)
    
    
}


}
