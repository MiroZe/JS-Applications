import { registerUser } from "../data/users.js";



const registerSection = document.getElementById('register')

const registerForm = document.getElementById('register-form');
registerForm.addEventListener('submit',getDataUserForRegestration )

let context = null

export function showRegister(ctx) {
    context = ctx
    ctx.showTargetSection(registerSection)
}

async function getDataUserForRegestration(e) {
    e.preventDefault()

    const formData = new FormData(registerForm)

    const {email,password,repeatPassword} = Object.fromEntries(formData.entries())

    try {
        if( !email || !password || !repeatPassword){
            throw new Error ('All fields are mandatory')
        }
        if( password != repeatPassword) {
            throw new Error ('Password and Repeatpassword dont match ')
        }
        if(email.length < 3) {
            throw new Error ('Email should be minimum 3 symbols ')
        }
        if(password.length < 3) {
            throw new Error ('Password should be minimum 3 symbols ')
        }
        await registerUser(email,password,repeatPassword)
        registerForm.reset();
        context.updateNav();
         context.goTo('/');

    } catch (error) {
        alert(error.message)
    }

}


