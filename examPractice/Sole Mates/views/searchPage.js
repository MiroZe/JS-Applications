import { getSearchedItems } from '../api/getData.js';
import { getDataFromLocaleStorage } from '../api/utils.js';
import { html, nothing } from '../node_modules/lit-html/lit-html.js'



const searchTemplate = (onSubmit, data, renderOneShow, user) => html`<section id="search">
    <h2>Search by Brand</h2>

    <form @submit=${onSubmit} class="search-wrapper cf">
        <input id="#search-input" type="text" name="search" placeholder="Search here..." required />
        <button type="submit">Search</button>
    </form>

    <h3>Results:</h3>
    <div id="search-container">
    <ul class="card-wrapper"></ul>
    ${data.length > 0 ?
       data.map(e => renderOneShow(e, user)) :
       html`<h2>There are no results found.</h2>`}

</ul>
</div>
</section>`

export async function showSearchPage(ctx) {

    ctx.render(searchTemplate(onSubmit, []))

    async function onSubmit(e) {
        e.preventDefault();

        let user = ctx.user
        const searchedValue = document.getElementById('#search-input').value
        const data =  await getSearchedItems(searchedValue)
        console.log(data);

        ctx.render(searchTemplate(onSubmit, data, renderOneShow, user))
    }


    function renderOneShow(item, user) {
    
        return html`<li class="card">
    
        <img src=${item.imageUrl} alt="travis" />
        <p>
            <strong>Brand: </strong><span class="brand">${item.brand}</span>
        </p>
        <p>
            <strong>Model: </strong><span class="model">${item.model}</span>
        </p>
        <p><strong>Value:</strong><span class="value">${item.value}</span>$</p>
        ${user ? html`<a class="details-btn" href=/details/${item._id}>Details </a> </li>` : null}
        
        `
    }
}





