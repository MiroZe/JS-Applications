import {html} from '../../node_modules/lit-html/lit-html.js'
import { editCar, getCarById } from '../data/service.js'
import { createSubmitHandler } from '../util.js'



const editTemplate = (car,postCar)=> html `<section id="edit-listing">
<div class="container">

    <form @submit = ${postCar} id="edit-form">
        <h1>Edit Car Listing</h1>
        <p>Please fill in this form to edit an listing.</p>
        <hr>

        <p>Car Brand</p>
        <input type="text" placeholder="Enter Car Brand" name="brand" .value = ${car.brand}>

        <p>Car Model</p>
        <input type="text" placeholder="Enter Car Model" name="model" .value=${car.model}>

        <p>Description</p>
        <input type="text" placeholder="Enter Description" name="description" .value=${car.description}>

        <p>Car Year</p>
        <input type="number" placeholder="Enter Car Year" name="year" .value=${car.year}>

        <p>Car Image</p>
        <input type="text" placeholder="Enter Car Image" name="imageUrl" .value=${car.imageUrl}>

        <p>Car Price</p>
        <input type="number" placeholder="Enter Car Price" name="price" .value=${car.price}>

        <hr>
        <input type="submit" class="registerbtn" value="Edit Listing">
    </form>
</div>
</section>`



export async function showEditCarPage(ctx) {

    const carId = ctx.params.id

    const car = await getCarById(carId)

ctx.render(editTemplate(car,createSubmitHandler(postCar)))

async function postCar({brand,model,description,year,imageUrl,price}) {

if(!brand || !model || !description || !year || !imageUrl || !price) {
    return alert ('All fields are mandatory')
}
if( Number(year)<= 0 || Number(price) <= 0) {
    return alert ('Year and Price should be a positive number')
}

    await editCar(carId,brand,model,description,Number(year),imageUrl,Number(price))

ctx.page.redirect(`/details/${carId}`)
}
} 