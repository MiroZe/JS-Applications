import {html} from '../node_modules/lit-html/lit-html.js'
import {onLogin} from '../api/sendUserData.js'
import { setDataToLocaleStorage } from '../api/utils.js';



const loginTemplate = (submitHandler) => html`<section id="login">
<div class="form">
  <h2>Login</h2>
  <form @submit = ${submitHandler} class="login-form">
    <input type="text" name="email" id="email" placeholder="email" />
    <input
      type="password"
      name="password"
      id="password"
      placeholder="password"
    />
    <button type="submit">login</button>
    <p class="message">
      Not registered? <a href="/register">Create an account</a>
    </p>
  </form>
</div>
</section>`

export function showLoginPage(ctx) {
    ctx.render(loginTemplate(onSubmit))
    
    async function onSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        const{email,password} = Object.fromEntries(formData.entries());
        
        try {
            if(!email || !password ) {
                throw new Error ('All fields are mandatory')
            }
            const userData = await onLogin(email,password);
            setDataToLocaleStorage(userData);
           
            ctx.page.redirect('/catalog')
            


        } catch (error) {
            alert (error.message)
        }
    }

}