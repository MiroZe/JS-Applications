import {html} from '../../node_modules/lit-html/lit-html.js'
import { editByID, getOfferById } from '../data/services.js'
import { createSubmitHandler } from '../util.js'


const editTemplate = (data,onSubmit) =>
 html`<section id="edit">
<div class="form">
  <h2>Edit Offer</h2>
  <form @submit = ${onSubmit} class="edit-form">
    <input
      type="text"
      name="title"
      id="job-title"
      placeholder="Title"
      .value = ${data.title}
    />
    <input
      type="text"
      name="imageUrl"
      id="job-logo"
      placeholder="Company logo url"
      .value = ${data.imageUrl}
    />
    <input
      type="text"
      name="category"
      id="job-category"
      placeholder="Category"
      .value = ${data.category}
    />
    <textarea
      id="job-description"
      name="description"
      placeholder="Description"
      rows="4"
      cols="50"
      .value = ${data.description}
    ></textarea>
    <textarea
      id="job-requirements"
      name="requirements"
      placeholder="Requirements"
      rows="4"
      cols="50"
      .value = ${data.requirements}
    ></textarea>
    <input
      type="text"
      name="salary"
      id="job-salary"
      placeholder="Salary"
      .value = ${data.salary}
    />

    <button type="submit">post</button>
  </form>
</div>
</section>`


export async function showEditPage(ctx) {

    const id = ctx.params.id

    const data = await getOfferById(id)
    

    ctx.render(editTemplate(data,createSubmitHandler(onSubmit)))


    async function onSubmit({title,imageUrl,category,description,requirements,salary}) {

        if(!title || !imageUrl || !category || !description || !requirements || !salary) {
            return alert('All fields are mandatory')
        }
        await editByID(id, {title,imageUrl,category,description,requirements,salary})

        ctx.page.redirect(`/details/${id}`)

    }






}