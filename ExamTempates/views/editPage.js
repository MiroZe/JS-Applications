import { getOneItem, updateItem } from '../api/getData.js'
import {html} from '../node_modules/lit-html/lit-html.js'

const editTemplate = (onSubmit,data) => html ``
 

export async function showEditPage (ctx) {


  const id = ctx.params.id
  const data = await getOneItem(id)
  ctx.render(editTemplate(onSubmit,data))


  async function onSubmit (e) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const {singer,album,imageUrl,release,label,sales} = Object.fromEntries(formData.entries())

    try {
        if(!singer || !album || !imageUrl || !release || !label || !sales) {
            throw new Error ('Please fill all input fields')
        }

        await updateItem(id,singer,album,imageUrl,release,label,sales)
        ctx.page.redirect(`/details/${id}`)


    } catch (error) {
        alert (error.message)
    }
}

}