import {html} from '../../node_modules/lit-html/lit-html.js'
import { login } from '../data/auth.js'
import { createSubmitHandler } from '../util.js'



const loginTemplate = (onLogin) => html`  <section id="loginPage">
<form @submit = ${onLogin} class="loginForm">
    <img src="./images/logo.png" alt="logo" />
    <h2>Login</h2>

    <div>
        <label for="email">Email:</label>
        <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
    </div>

    <div>
        <label for="password">Password:</label>
        <input id="password" name="password" type="password" placeholder="********" value="">
    </div>

    <button class="btn" type="submit">Login</button>

    <p class="field">
        <span>If you don't have profile click <a href="#">here</a></span>
    </p>
</form>
</section>`


export function showLoginPage(ctx) {
    ctx.render(loginTemplate(createSubmitHandler(onLogin)))

    async function onLogin(userData,form) {
        await login(userData)
        form.reset()
        ctx.page.redirect('/')
    }
}