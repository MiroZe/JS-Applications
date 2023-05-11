import { onLogout } from '../api/sendUserData.js'
import { clearLocaleStorage } from '../api/utils.js'
import {html} from '../node_modules/lit-html/lit-html.js'


export function showLogoutPage(ctx) {
    
    onLogout()
    clearLocaleStorage()
   
    ctx.page.redirect('/')

}



