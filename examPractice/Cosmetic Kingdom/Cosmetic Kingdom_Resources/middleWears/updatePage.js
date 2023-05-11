
import { getDataFromLocaleStorage } from '../api/utils.js'
import { render, html } from '../node_modules/lit-html/lit-html.js'

const mainElement = document.getElementById('main')
const navigation = document.getElementById('navigation')


const userTemplate = () => html`<div>
    <a href="/catalog">Products</a>
</div>
<div class="user">
    <a href="/add">Add Product</a>
    <a href="/logout">Logout</a>
</div>`


const guestTemplate = () => html`<nav id="navigation">
    <div>
        <a href="/catalog">Products</a>
    </div>
    <div class="guest">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
    </div>`

export function updateMIdlleWare(ctx, next) {
    updateNavigation(getDataFromLocaleStorage())
    ctx.render = renderTemplate
    ctx.user = getDataFromLocaleStorage()
   

    next()

}

function renderTemplate(template) {
    render(template, mainElement)
}


function updateNavigation(user) {
    if (user) {
        render(userTemplate(),navigation)
    } else {
        render(guestTemplate(),navigation)
    }


}