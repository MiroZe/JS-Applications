import {html} from '../../node_modules/lit-html/lit-html.js'
import { login } from '../data/auth.js'
import { createSubmitHandler } from '../util.js'



const loginTemplate = (onLogin) => html``


export function showLoginPage(ctx) {
    ctx.render(loginTemplate(createSubmitHandler(onLogin)))

    async function onLogin({email,password}) {
        await login(email,password)
        form.reset()
        ctx.page.redirect('/whererere')
    }
}