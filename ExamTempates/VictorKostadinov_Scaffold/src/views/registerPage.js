import {html} from '../../node_modules/lit-html/lit-html.js'
import { createSubmitHandler } from '../util.js'
import { register } from '../data/auth.js'


//@submit = ${onRegister}

const registerTemplate = (onRegister) => html``


export function showregisterPage(ctx) {
    ctx.render(registerTemplate(createSubmitHandler(onRegister)))

    async function onRegister({email,password,repass}) {

        if(!email || !password) {
            return alert ('All fields are mandatory')
        }
        if(password != repass) {
            return alert ('Passwords and Repeat Password are not equal')
        }

        await register(email,password)
        form.reset()
        ctx.page.redirect('/whererere')
    }
}