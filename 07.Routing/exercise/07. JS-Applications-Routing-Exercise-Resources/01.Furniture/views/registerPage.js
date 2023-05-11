import { onRegister } from '../api/sendUserData.js';
import { setDataToLocaleStorage } from '../api/utils.js';
import {html} from '../node_modules/lit-html/lit-html.js'

const registerTemplate = () => html`<div class="row space-top">
<div class="col-md-12">
    <h1>Register New User</h1>
    <p>Please fill all fields.</p>
</div>
</div>
<form @submit=${onSubmit}>
<div class="row space-top">
    <div class="col-md-4">
        <div class="form-group">
            <label class="form-control-label" for="email">Email</label>
            <input class="form-control" id="email" type="text" name="email">
        </div>
        <div class="form-group">
            <label class="form-control-label" for="password">Password</label>
            <input class="form-control" id="password" type="password" name="password">
        </div>
        <div class="form-group">
            <label class="form-control-label" for="rePass">Repeat</label>
            <input class="form-control" id="rePass" type="password" name="rePass">
        </div>
        <input type="submit" class="btn btn-primary" value="Register" />
    </div>
</div>
</form>`

let context = null;

export async function showRegister (ctx) {
context = ctx;
    ctx.render(registerTemplate(),document.getElementById('root'))

}



async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget)
    const {email,password,rePass} = Object.fromEntries(formData.entries());

    try {
        if(!email || !password) {
            throw new Error('All fields are mandatory')
        }
        if(password !== rePass) {
            throw new Error ( 'Password and Repeat password don`t match' )
        }
        const userData = await onRegister(email,password) 
        setDataToLocaleStorage(userData)
        e.target.reset();
        context.updateNav()
        context.page.redirect('/')


    } catch (error) {
        alert(error.message)
    }
}