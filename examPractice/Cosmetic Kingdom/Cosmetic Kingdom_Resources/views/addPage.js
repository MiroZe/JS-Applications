import { sendCreatedItem } from '../api/getData.js'
import {html} from '../node_modules/lit-html/lit-html.js'



const addTemplate = (onsubmit) => html`<section id="create">
<div class="form">
  <h2>Add Product</h2>
  <form @submit = ${onsubmit} class="create-form">
    <input
      type="text"
      name="name"
      id="name"
      placeholder="Product Name"
    />
    <input
      type="text"
      name="imageUrl"
      id="product-image"
      placeholder="Product Image"
    />
    <input
      type="text"
      name="category"
      id="product-category"
      placeholder="Category"
    />
    <textarea
      id="product-description"
      name="description"
      placeholder="Description"
      rows="5"
      cols="50"
    ></textarea>
    
    <input
      type="text"
      name="price"
      id="product-price"
      placeholder="Price"
    />

    <button type="submit">Add</button>
  </form>
</div>
</section>`

export function showAddPage(ctx) {
    ctx.render(addTemplate(onSubmit))


    async function onSubmit(e) {
        e.preventDefault()

        const formData = new FormData(e.target)
        const {name,imageUrl,category,description,price} = Object.fromEntries(formData.entries())
        try {
            if(!name || !imageUrl || !category || !description || !price ) {
                throw new Error('All fields are mandatory')
            }
            await sendCreatedItem(name,imageUrl,category,description,price)
            ctx.page.redirect('/catalog')

            
        } catch (error) {
            alert(error.message)
        }

    }
}