import {html} from '../../node_modules/lit-html/lit-html.js'
import { createSubmitHandler } from '../util.js'
import { register } from '../data/auth.js'




const registerTemplate = (onRegister) => html`<section id="register">
<div class="container">
    <form @submit = ${onRegister} id="register-form">
        <h1>Register</h1>
        <p>Please fill in this form to create an account.</p>
        <hr>

        <p>Username</p>
        <input type="text" placeholder="Enter Username" name="username" required>

        <p>Password</p>
        <input type="password" placeholder="Enter Password" name="password" required>

        <p>Repeat Password</p>
        <input type="password" placeholder="Repeat Password" name="repeatPass" required>
        <hr>

        <input type="submit" class="registerbtn" value="Register">
    </form>
    <div class="signin">
        <p>Already have an account?
            <a href="#">Sign in</a>.
        </p>
    </div>
</div>
</section>`


export function showregisterPage(ctx) {
    ctx.render(registerTemplate(createSubmitHandler(onRegister)))

    async function onRegister({username,password,repeatPass}) {

        if(!username || !password) {
            return alert ('All fields are mandatory')
        }
        if(password != repeatPass) {
            return alert ('Passwords and Repeat Password are not equal')
        }

        await register(username,password)
        form.reset()
        ctx.page.redirect('/catalog')
    }
}