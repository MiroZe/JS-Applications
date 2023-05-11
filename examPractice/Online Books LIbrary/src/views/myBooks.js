import {html} from '../../node_modules/lit-html/lit-html.js'
import { getMyBooks } from '../data/services.js'
import { getUserData } from '../util.js'



const myBookTemplate = (myBooks) => html `<section id="my-books-page" class="my-books">
<h1>My Books</h1>

<ul class="my-books-list">
   ${myBooks.length > 0 ? myBooks.map(oneBookTemplate) : html `<p class="no-books">No books in database!</p>`}
    
</ul>

</section>`

const oneBookTemplate = (book) => html `<li class="otherBooks">
<h3>${book.title}</h3>
<p>Type: ${book.type}</p>
<p class="img"><img src=${book.imageUrl}></p>
<a class="button" href=/details/${book._id}>Details</a>
</li>`

export async function showMyBooksPage(ctx) {
const userId = getUserData()?._id

const myBooks = await getMyBooks(userId)
ctx.render(myBookTemplate (myBooks))


}