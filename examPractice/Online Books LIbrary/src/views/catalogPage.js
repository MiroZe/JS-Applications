import { html } from '../../node_modules/lit-html/lit-html.js'
import { getAllBooks } from '../data/services.js'



const catalogTemplate = (allBoooks) => html`<section id="dashboard-page" class="dashboard">
<h1>Dashboard</h1>
<!-- Display ul: with list-items for All books (If any) -->
<ul class="other-books-list">
    ${allBoooks.length > 0 ? allBoooks.map(bookTemplate)
    : html `<p class="no-books">No books in database!</p>`}
    
</ul>

</section>`


const bookTemplate = (book) => html `
<li class="otherBooks">
<h3>${book.title}</h3>
<p>Type: ${book.type}</p>
<p class="img"><img src=${book.imageUrl}></p>
<a class="button" href=/details/${book._id}>Details</a>
</li>
`

export async function showCatalogPage(ctx) {

const allBoooks = await getAllBooks()

ctx.render(catalogTemplate(allBoooks))





}