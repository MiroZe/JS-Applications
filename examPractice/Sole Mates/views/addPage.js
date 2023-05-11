import { sendCreatedItem } from '../api/getData.js'
import {html} from '../node_modules/lit-html/lit-html.js'


const addTemplate = (eventHandler) => html ` <section id="create">
<div class="form">
  <h2>Add item</h2>
  <form @submit = ${eventHandler} class="create-form">
    <input
      type="text"
      name="brand"
      id="shoe-brand"
      placeholder="Brand"
    />
    <input
      type="text"
      name="model"
      id="shoe-model"
      placeholder="Model"
    />
    <input
      type="text"
      name="imageUrl"
      id="shoe-img"
      placeholder="Image url"
    />
    <input
      type="text"
      name="release"
      id="shoe-release"
      placeholder="Release date"
    />
    <input
      type="text"
      name="designer"
      id="shoe-designer"
      placeholder="Designer"
    />
    <input
      type="text"
      name="value"
      id="shoe-value"
      placeholder="Value"
    />

    <button type="submit">post</button>
  </form>
</div>
</section>`

export  function  showAddPage(ctx) {

    ctx.render(addTemplate(onSubmit))
function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target)
    const {brand,model,imageUrl,release,designer,value} = Object.fromEntries(formData.entries()) 
    try {
        if(!brand ||!model || !imageUrl || !release || !designer || !value) {
            throw new Error('All fields are mandatory')
        }

        sendCreatedItem(brand,model,imageUrl,release,designer,value)
        ctx.page.redirect('/catalog')
    } catch (error) {
        alert (error.message)
    }
      
}

}