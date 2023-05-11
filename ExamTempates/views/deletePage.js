import { deleteById } from "../api/getData.js";



export async function showDeletePage(ctx) {

    await deleteById(ctx.params.id)
    ctx.page.redirect('/Wherere')

}