import { html } from '../../node_modules/lit-html/lit-html.js'
import { editById, getById } from '../data/services.js'
import { createSubmitHandler } from '../util.js'


const editTemplate = (data,onEdit) => html ` <section id="edit">
<div class="form">
  <h2>Edit Album</h2>
  <form @submit = ${onEdit} class="edit-form">
    <input .value = ${data.singer} type="text" name="singer" id="album-singer" placeholder="Singer/Band" />
    <input .value = ${data.album} type="text" name="album" id="album-album" placeholder="Album" />
    <input .value = ${data.imageUrl} type="text" name="imageUrl" id="album-img" placeholder="Image url" />
    <input .value = ${data.release} type="text" name="release" id="album-release" placeholder="Release date" />
    <input .value = ${data.label} type="text" name="label" id="album-label" placeholder="Label" />
    <input .value = ${data.sales} type="text" name="sales" id="album-sales" placeholder="Sales" />

    <button type="submit">post</button>
  </form>
</div>
</section>`



export async function showEditPage(ctx) {

const albumId = ctx.params.id
const data = await getById(albumId)


ctx.render(editTemplate(data,createSubmitHandler(onEdit)))

async function onEdit (albumData) {



    await editById(albumId,albumData)
    ctx.page.redirect(`/details/${albumId}`)

}
}