import { html } from "../../node_modules/lit-html/lit-html.js"
import { register } from "../data/auth.js"
import { createSubmitHandler } from "../utils.js"



const registerTemplate = (onRegister) => html`<section id="register-page" class="content auth">
<form @submit = ${onRegister} id="register">
    <div class="container">
        <div class="brand-logo"></div>
        <h1>Register</h1>

        <label for="email">Email:</label>
        <input type="email" id="email" name="email" placeholder="maria@email.com">

        <label for="pass">Password:</label>
        <input type="password" name="password" id="register-password">

        <label for="con-pass">Confirm Password:</label>
        <input type="password" name="confirm-password" id="confirm-password">

        <input class="btn submit" type="submit" value="Register">

        <p class="field">
            <span>If you already have profile click <a href="#">here</a></span>
        </p>
    </div>
</form>
</section>`

export function showRegisterPage(ctx) {


    ctx.render(registerTemplate(createSubmitHandler(onRegister)))

    async function onRegister({email,password,['confirm-password']: rePassword}) {
        if(!email || !password ) {
            return alert ('All fields are mandatory')
        }
        if(password != rePassword) {
            return alert ('Paswword and Repeat password are not equal')
        }

        await register(email,password)
        ctx.page.redirect('/')
    }

} 