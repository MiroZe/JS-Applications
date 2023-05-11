import { getOneItem, updateItem } from '../api/getData.js'
import {html} from '../node_modules/lit-html/lit-html.js'


const editTemplate = (onSubmit,data) => html `<section id="edit">
<div class="form">
  <h2>Edit Product</h2>
  <form  @submit = ${onSubmit} class="edit-form">
    <input
      type="text"
      name="name"
      id="name"
      placeholder="Product Name"
      .value = ${data.name}
    />
    <input
      type="text"
      name="imageUrl"
      id="product-image"
      placeholder="Product Image"
      .value = ${data.imageUrl}
    />
    <input
      type="text"
      name="category"
      id="product-category"
      placeholder="Category"
      .value = ${data.category}
    />
    <textarea
      id="product-description"
      name="description"
      placeholder="Description"
      rows="5"
      cols="50"
      .value = ${data.description}
    ></textarea>
    
    <input
      type="text"
      name="price"
      id="product-price"
      placeholder="Price"
      .value = ${data.price}
    />
    <button type="submit">post</button>
  </form>
</div>
</section>` 

export async function showEditPage(ctx) {

    const id = ctx.params.id
    const data = await getOneItem(id)


    ctx.render(editTemplate(onSubmit,data))

    async function onSubmit(e) {
        e.preventDefault();

    
    const formData = new FormData(e.target)
        const {name,imageUrl,category,description,price} = Object.fromEntries(formData.entries())
        try {
            if(!name || !imageUrl || !category || !description || !price ) {
                throw new Error('All fields are mandatory')
            }
            await updateItem(id,name,imageUrl,category,description,price)
            ctx.page.redirect(`/details/${id}`)

            
        } catch (error) {
            alert(error.message)
        }
    }

}