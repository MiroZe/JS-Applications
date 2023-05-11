import { html } from "../../node_modules/lit-html/lit-html.js"
import { getAllGames } from "../data/services.js"




const allGamesTemplate = (allGames,renderGame) => html `<section id="catalog-page">
<h1>All Games</h1>

${allGames.length > 0 ? allGames.map(renderGame) : html `<h3 class="no-articles">No articles yet</h3>`}


</section>`




export async function showAllGames(ctx) {

    const allGames = await getAllGames()

    ctx.render(allGamesTemplate(allGames,renderGame))


function renderGame (game) { return html`<div class="allGames">
<div class="allGames-info">
    <img src=${game.imageUrl}>
    <h6>${game.category}</h6>
    <h2>${game.title}</h2>
    <a href=/details/${game._id} class="details-button">Details</a>
</div>
</div>`
}
}