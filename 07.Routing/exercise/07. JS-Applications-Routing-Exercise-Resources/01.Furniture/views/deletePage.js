import { deleteById } from "../api/getData.js";




export  function deleteItem(ctx) {
    
deleteById(ctx.params.id)
ctx.page.redirect('/')

}