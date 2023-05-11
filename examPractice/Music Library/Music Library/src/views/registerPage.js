import {html} from '../../node_modules/lit-html/lit-html.js'
import { createSubmitHandler } from '../util.js'
import { register } from '../data/auth.js'




const registerTemplate = (onRegister) => html`    <section id="register">
<div class="form">
  <h2>Register</h2>
  <form @submit = ${onRegister} class="login-form">
    <input type="text" name="email" id="register-email" placeholder="email" />
    <input type="password" name="password" id="register-password" placeholder="password" />
    <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
    <button type="submit">register</button>
    <p class="message">Already registered? <a href="#">Login</a></p>
  </form>
</div>
</section>`


export function showregisterPage(ctx) {
    ctx.render(registerTemplate(createSubmitHandler(onRegister)))

    async function onRegister({email,password,['re-password']:repass},form) {

        if(!email || !password) {
            return alert ('All fields are mandatory')
        }
        if(password != repass) {
            return alert ('Passwords and Repeat Password are not equal')
        }

        await register(email,password)
        form.reset()
        ctx.page.redirect('/catalog')
    }
}