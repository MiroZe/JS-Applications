import {html} from '../node_modules/lit-html/lit-html.js'
import {onLogin} from '../api/sendUserData.js'
import { setDataToLocaleStorage } from '../api/utils.js';



const loginTemplate = (submitHandler) => html``

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
           
            ctx.page.redirect('/')
            


        } catch (error) {
            alert (error.message)
        }
    }

}