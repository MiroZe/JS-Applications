import {html} from '../../node_modules/lit-html/lit-html.js'
import { getEventById, postEdited } from '../data/services.js'
import { createSubmitHandler } from '../util.js'


const editTemplate = (play,onEdit) => html`<section id="editPage">
<form @submit = ${onEdit} class="theater-form">
    <h1>Edit Theater</h1>
    <div>
        <label for="title">Title:</label>
        <input id="title" name="title" type="text" placeholder="Theater name" .value=${play.title}>
    </div>
    <div>
        <label for="date">Date:</label>
        <input .value = ${play.date} id="date" name="date" type="text" placeholder="Month Day, Year" >
    </div>
    <div>
        <label for="author">Author:</label>
        <input id="author" name="author" type="text" placeholder="Author"
            value=${play.author}>
    </div>
    <div>
        <label for="description">Theater Description:</label>
        <textarea id="description" name="description"
            placeholder="Description" .value = ${play.description}></textarea>
    </div>
    <div>
        <label for="imageUrl">Image url:</label>
        <input id="imageUrl" name="imageUrl" type="text" placeholder="Image Url"
            .value=${play.imageUrl}>
    </div>
    <button class="btn" type="submit">Submit</button>
</form>
</section>`



export async function showEditPage (ctx) {

    const eventId = ctx.params.id
    const play = await getEventById(eventId)
    console.log(play);

ctx.render(editTemplate(play,createSubmitHandler(onEdit)))


async function onEdit({title,date,author,imageUrl,description}) {

    if(!title || !author || !description || !imageUrl) {
        return alert('All fields are mandatory')
    }
    
    await postEdited(eventId,{title,date,author,imageUrl,description})

    ctx.page.redirect(`/details/${eventId}`)

}

}