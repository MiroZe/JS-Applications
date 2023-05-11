
import { getDataFromLocaleStorage } from '../api/utils.js'
import { render, html } from '../node_modules/lit-html/lit-html.js'

const mainElement = document.getElementById('main')
const navigation = document.getElementById('header')


const userTemplate = () => html`
  <a id="logo" href="/"
          ><img id="logo-img" src="./images/logo.png" alt=""
        /></a>

        <nav id = "navigation">
          <div>
            <a href="/catalog">Dashboard</a>
            <a href="search">Search</a>
          </div>
          <div class="user">
            <a href="/add">Add Pair</a>
            <a href="/logout">Logout</a>
          </div>
          </nav>`


const guestTemplate = () => html`
<a id="logo" href="/"
        ><img id="logo-img" src="./images/logo.png" alt=""
      /></a>

      <nav id = "navigation">
        <div>
          <a href="/catalog">Dashboard</a>
          <a href="search">Search</a>
        </div>
        <div class="guest">
            <a href="/login">Login</a>
            <a href="register">Register</a>
          </div>
        </nav>`

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