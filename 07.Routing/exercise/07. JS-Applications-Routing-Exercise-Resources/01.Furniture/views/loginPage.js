import { onLogin } from '../api/sendUserData.js';
import { setDataToLocaleStorage } from '../api/utils.js';
import {html} from '../node_modules/lit-html/lit-html.js'

const loginTemplate = () => html`<div class="row space-top">
<div class="col-md-12">
    <h1>Login User</h1>
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
        <input type="submit" class="btn btn-primary" value="Login" />
    </div>
</div>
</form>`

let context = null;
export function showLogin(ctx) {
    context = ctx;
    ctx.render(loginTemplate(),document.getElementById('root'))

}


async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget)
    const {email,password} = Object.fromEntries(formData.entries());

    try {
        if(!email || !password) {
            throw new Error('All fields are mandatory')
        }
        const userData = await onLogin(email,password) 
        console.log(userData);
        setDataToLocaleStorage(userData)
        e.target.reset();
        context.updateNav()
        context.page.redirect('/')


    } catch (error) {
        alert(error.message)
    }
}