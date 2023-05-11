import {html} from '../node_modules/lit-html/lit-html.js'
import { onRegister } from '../api/sendUserData.js';
import { setDataToLocaleStorage } from '../api/utils.js';



const registerTemplate = (submitHandler) => html`<section id="register">
<div class="form">
  <h2>Register</h2>
  <form @submit = ${submitHandler}class="register-form">
    <input
      type="text"
      name="email"
      id="register-email"
      placeholder="email"
    />
    <input
      type="password"
      name="password"
      id="register-password"
      placeholder="password"
    />
    <input
      type="password"
      name="re-password"
      id="repeat-password"
      placeholder="repeat password"
    />
    <button type="submit">register</button>
    <p class="message">Already registered? <a href="#">Login</a></p>
  </form>
</div>
</section>`


export function showRegisterPage(ctx) {

    ctx.render(registerTemplate(onSubmit))
    
    async function onSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        const{email,password,['re-password'] : repassword} = Object.fromEntries(formData.entries());
        
        try {
            if(!email || !password ) {
                throw new Error ('All fields are mandatory')
            }
            if(repassword !== password) {
                throw new Error ('Password adn RePassword mismatch')
            }
            const userData = await onRegister(email,password);
            setDataToLocaleStorage(userData);
            
            ctx.page.redirect('/catalog')
            


        } catch (error) {
            alert (error.message)
        }
    }
 
   
}