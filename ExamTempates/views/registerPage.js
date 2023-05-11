import { onRegister } from '../api/sendUserData.js';
import { setDataToLocaleStorage } from '../api/utils.js';
import {html} from '../node_modules/lit-html/lit-html.js'


const registerTemplate = (submitHandler) => html` `

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
           
            ctx.page.redirect('/')
            


        } catch (error) {
            alert (error.message)
        }
    }


}