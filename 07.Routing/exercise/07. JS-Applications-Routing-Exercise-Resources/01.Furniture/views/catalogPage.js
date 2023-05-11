
import { getAllFurniture } from '../api/getData.js'
import { html,render } from '../node_modules/lit-html/lit-html.js'


const template = (data) => html`<div class="row space-top">
    <div class="col-md-12">
        <h1>Welcome to Furniture System</h1>
        <p>Select furniture from the catalog to view details.</p>
    </div>
    <div class="row space-top">
        ${data.map( e => html`<div class="col-md-4">
    <div class="card text-white bg-primary">
        <div class="card-body">
            <img src=${e.img} />
            <p>${e.description}</p>
            <footer>
                <p>Price: <span>${e.price} $</span></p>
            </footer>
            <div>
                <a href='/Details/${e._id}' class="btn btn-info">Details</a>
            </div>
        </div>
    </div>
</div>
        `)}
    </div>
</div>`

export async function showCatalog(ctx) {

    const data = await getAllFurniture()
    ctx.render(template(data), document.getElementById('root'))
    
}
