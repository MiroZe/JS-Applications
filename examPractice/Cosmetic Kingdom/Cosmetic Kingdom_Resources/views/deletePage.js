import { deleteById } from "../api/getData.js";



export async function showDeletePage(ctx) {

    let question = confirm('Are you sure to delete this item?')

    if(question) {
        await deleteById(ctx.params.id)
        ctx.page.redirect('/catalog')
    }

}