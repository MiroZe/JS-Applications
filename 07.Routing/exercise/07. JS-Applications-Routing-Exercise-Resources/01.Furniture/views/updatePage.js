
import { getOneItem, updateItem } from '../api/getData.js'
import {html} from '../node_modules/lit-html/lit-html.js'

const updateTemplate = (data) => html`<div class="row space-top">
<div class="col-md-12">
    <h1>Edit Furniture</h1>
    <p>Please fill all fields.</p>
</div>
</div>
<form @submit = ${onSubmit}>
<div class="row space-top">
    <div class="col-md-4">
        <div class="form-group">
            <label class="form-control-label" for="new-make">Make</label>
            <input class=${"form-control" + (validation.isMakeValid ? ' is-valid':' is-invalid')} id="new-make" type="text" name="make" value=${data.make}>
        </div>
        <div class="form-group has-success">
            <label class="form-control-label" for="new-model">Model</label>
            <input class=${"form-control" + (validation.isModelValid ? ' is-valid':' is-invalid')} id="new-model" type="text" name="model" value=${data.model}>
        </div>
        <div class="form-group has-danger">
            <label class="form-control-label" for="new-year">Year</label>
            <input class=${"form-control" + (validation.isYearValid ? ' is-valid':' is-invalid')} id="new-year" type="number" name="year" value=${data.year}>
        </div>
        <div class="form-group">
            <label class="form-control-label" for="new-description">Description</label>
            <input class="form-control" id="new-description" type="text" name="description" value=${data.description}>
        </div>
    </div>
    <div class="col-md-4">
        <div class="form-group">
            <label class="form-control-label" for="new-price">Price</label>
            <input class=${"form-control" + (validation.isPriceValid ? ' is-valid':' is-invalid')} id="new-price" type="number" name="price" value=${data.price}>
        </div>
        <div class="form-group">
            <label class="form-control-label" for="new-image">Image</label>
            <input class=${"form-control" + (validation.isImgValid ? ' is-valid':' is-invalid')} id="new-image" type="text" name="img" value=${data.img}>
        </div>
        <div class="form-group">
            <label class="form-control-label" for="new-material">Material (optional)</label>
            <input class="form-control" id="new-material" type="text" name="material" value=${data.material}>
        </div>
        <input type="submit" class="btn btn-info" value="Edit" />
    </div>
</div>
</form>`

let validation = {isMakeValid : undefined,
    isModelValid:undefined,
    isYearValid:undefined,
    isDescriptionValid:undefined,
    isPriceValid:undefined,
    isImgValid:undefined
}

let context = null

export async function showItemToUpdate(ctx) {
    context = ctx;
    const data = await getOneItem(ctx.params.id)
    
    ctx.render(updateTemplate(data),document.getElementById('root'))



} 

async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    let {make,model,year,description,price,img,material} = Object.fromEntries(formData.entries())
   
    price = Number(price)
    year = Number(year)
    try {
        
        if(!make || make.length < 4) {
            validation.isMakeValid = false
            throw new Error('Make input should be minimun 4 symbols ')
        } else {
            validation.isMakeValid = true
        }
        if(!year || year < 1950 || year > 2050) {
           validation.isYearValid = false
            throw new Error('Please input correct data')
        } else {
            validation.isYearValid = true
        }
        if( !description || description.length < 10) {
            validation.isDescriptionValid = false
            throw new Error('Description input should be minimun 10 symbols ')
        } else {
            validation.isDescriptionValid = true
        }
        if(!price || price <=0 ) {
            validation.isPriceValid = false
            throw new Error('Price must be positive number ')
        } else {
            validation.isPriceValid = true
        }
        if(!model || model.length < 4) {
            validation.isModelValid = false
            throw new Error('Model input should be minimun 4 symbols ')
        } else {
            validation.isModelValid = true
        }
        if(!img ) {
            validation.isImgValid = false
            throw new Error('Img is mandatory ')
        } else {
            validation.isImgValid = true
        }
        const id = context.params.id
        await updateItem(id,make,model,year,description,price,img,material)
        e.target.reset();
        
        context.page.redirect('/')
 
       
    } catch (error) {
        context.render(createTemplate(validation),document.getElementById('root'))
        alert(error.message)
    }


}