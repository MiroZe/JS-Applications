
import { cats } from './catSeeder.js'
import { html, render } from './node_modules/lit-html/lit-html.js'


const allCatsSection = document.getElementById('allCats')

const template = (data) => html`


    
    <ul> ${data.map(c => html`
        <li>
            <img src="./images/${c.imageLocation}.jpg">
            <div class="info">
                <button @click = ${showMore} class="showBtn">Show status code</button>
                <div class="status" style="display: none" id=${c.id}>
                    <h4>Status Code: ${c.statusCode}</h4>
                    <p>${c.statusMessage}</p>
                </div>
            </div>
        </li>`)}
    </ul>`

    render(template(cats),allCatsSection)


function showMore(e) {
   const div = e.target.parentElement.querySelector('.status')
   if(div.style.display == 'none') {
    e.currentTarget.textContent = 'Hide status code'
    div.style.display = 'block'
   } else {
    e.currentTarget.textContent = 'Show status code'
    div.style.display = 'none'
   }
}