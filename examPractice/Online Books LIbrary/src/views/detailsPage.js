import { html } from '../../node_modules/lit-html/lit-html.js'
import { addLike, deleteById, getBookById, getLikeForUser, getTotalBookLike } from '../data/services.js'
import { getUserData } from '../util.js'



const detailsTemplate = (book,onDelete,isCreator,userId,totalBookLikes,onLike,isUserLiked) => 
html `<section id="details-page" class="details">
<div class="book-information">
    <h3>${book.title}</h3>
    <p class="type">Type: ${book.type}</p>
    <p class="img"><img src=${book.imageUrl}></p>
    <div class="actions">
        
        ${isCreator ? html `<a class="button" href=/edit/${book._id}>Edit</a>
        <a class="button" href=javascript:void(0) @click = ${onDelete.bind(null,book,book._id)}>Delete</a>`
        : null}
        
       ${showLikeBtn(book,userId,onLike,isUserLiked)}
        
        <div class="likes">
            <img class="hearts" src="/images/heart.png">
            <span id="total-likes">Likes: ${totalBookLikes}</span>
        </div>
   
    </div>
</div>
<div class="book-description">
    <h3>Description:</h3>
    <p>${book.description}</p>
</div>
</section>`

function showLikeBtn(book,userId,onLike,isUserLiked) {
    if(userId !== undefined ){
        if(userId != book._ownerId && !isUserLiked) {
            return html `<a @click = ${onLike} class="button" href=javascript:void(0)>Like</a>`
        }
    } else {
        return ''
    }
}



export async function showDetailsPage(ctx) {


    const bookId = ctx.params.id

    const book = await getBookById(bookId)
    const userId = getUserData()?._id

    const isCreator = userId == book._ownerId

    const totalBookLikes = await getTotalBookLike(bookId)
    const isUserLiked = await getLikeForUser(bookId,userId) > 0

    ctx.render(detailsTemplate(book,onDelete,isCreator,userId,totalBookLikes,onLike,isUserLiked))

    async function onDelete(book,bookId) {

        const choice = confirm(`Are you sure to delete book ${book.title}`)

        if(choice) {
            await deleteById(bookId)
            ctx.page.redirect('/catalog')
        }
    }

    async function onLike() {

       
    
        await addLike(bookId)
        ctx.render(detailsTemplate(book,onDelete,isCreator,userId,totalBookLikes,onLike,isUserLiked))
        ctx.page.redirect(`/details/${ctx.params.id}`)



    }

}