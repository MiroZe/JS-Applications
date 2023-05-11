import { login } from "../data/users.js";


const loginSection = document.getElementById('login')

const loginForm = document.getElementById('form-login')
loginForm.addEventListener('submit', onSubmit)

let context = null;

export function showLogin(ctx) {
    context = ctx;
    ctx.showTargetSection(loginSection)
}


async function onSubmit(e) {
    e.preventDefault()
    const formData = new FormData(loginForm)

    const {email,password} = Object.fromEntries(formData.entries())

    try {
        if( !email || !password) {
            throw new Error ('All fields are mandatory')
        }
        await login(email,password)
         loginForm.reset();
         context.updateNav()
         context.goTo('/')

    } catch (error) {
        alert(error.message)
    }

}