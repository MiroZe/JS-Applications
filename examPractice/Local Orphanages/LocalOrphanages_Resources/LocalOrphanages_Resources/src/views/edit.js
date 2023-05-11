import {html} from '../../node_modules/lit-html/lit-html.js'
import { editItem, getById } from '../data/services.js'
import { createSubmitHandler } from '../util.js'

//${data.}

const editTemplate = (data,onEdit) => html `<section id="edit-page" class="auth">
<form @submit = ${onEdit} id="edit">
    <h1 class="title">Edit Post</h1>

    <article class="input-group">
        <label for="title">Post Title</label>
        <input type="title" name="title" id="title" .value=${data.title}>
    </article>

    <article class="input-group">
        <label for="description">Description of the needs </label>
        <input type="text" name="description" id="description" .value=${data.description}>
    </article>

    <article class="input-group">
        <label for="imageUrl"> Needed materials image </label>
        <input type="text" name="imageUrl" id="imageUrl" .value=${data.imageUrl}>
    </article>

    <article class="input-group">
        <label for="address">Address of the orphanage</label>
        <input type="text" name="address" id="address" .value=${data.address}>
    </article>

    <article class="input-group">
        <label for="phone">Phone number of orphanage employee</label>
        <input type="text" name="phone" id="phone" .value=${data.phone}>
    </article>

    <input type="submit" class="btn submit" value="Edit Post">
</form>
</section>`


export async function showEditPage(ctx) {

    const itemId = ctx.params.id
    const data = await getById(itemId)


    ctx.render(editTemplate(data,createSubmitHandler(onEdit)))

    async function onEdit({title,description,imageUrl,address,phone}) {

        if (!title || !description || !imageUrl || !address || !phone) {
            return alert('All fields are mandatory')
        }

        await editItem(itemId,title,description,imageUrl,address,phone)
        ctx.page.redirect(`/details/${itemId}`)

    }


}