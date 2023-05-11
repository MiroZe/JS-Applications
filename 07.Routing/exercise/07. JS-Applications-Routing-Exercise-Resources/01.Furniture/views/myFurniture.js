import { getMyItems } from '../api/getData.js'
import { getDataFromLocaleStorage } from '../api/utils.js'
import {html} from '../node_modules/lit-html/lit-html.js'

const myTemplate = (data) => html`<div class="row space-top">
<div class="col-md-12">
    <h1>My Furniture</h1>
    <p>This is a list of your publications.</p>
</div>
</div>
<div class="row space-top">
    ${data.map(e=> html`<div class="col-md-4">
    <div class="card text-white bg-primary">
        <div class="card-body">
                <img src=${e.img} />
                <p>Description here</p>
                <footer>
                    <p>Price: <span>${e.price} $</span></p>
                </footer>
                <div>
                    <a href='/Details/${e.id}' class="btn btn-info">Details</a>
                </div>
        </div>
    </div>`)}

</div>`


export async function myFurnituresPage (ctx) {
    const userData = getDataFromLocaleStorage()

    

const data = await getMyItems(userData._id)



ctx.render(myTemplate(data),document.getElementById('root'))


}