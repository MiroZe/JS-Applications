
//Todo import page

import { editById } from "../data/services"



export async function onDelete (id){

const choice = confirm ('Are you sure to delete this item')
if(choice) {
    await deleteById(id)
    ctx.page.redirect('/catalog')
}

}



export async function onEdit ({el1,el2,el3,el4}) {
    const id = ctx.params.id
    if('!el1...') {
        return alert ('Please fill all fields')
    }

    await editById(id,el1,el2,el3,el4)
    ctx.page.redirect(`/details/${id}`)
}