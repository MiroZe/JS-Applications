import page from './node_modules/page/page.mjs'
import { render } from './node_modules/lit-html/lit-html.js'
import{get} from './api/api.js'
import { getDataFromLocaleStorage } from './api/utils.js'
import { showCatalog } from './views/catalogPage.js'
import { showCreatePage } from './views/createPage.js'
import { deleteItem } from './views/deletePage.js'
import { detailsPage } from './views/detailsPage.js'
import { showLogin } from './views/loginPage.js'
import { showRegister } from './views/registerPage.js'
import { showItemToUpdate } from './views/updatePage.js'
import { myFurnituresPage } from './views/myFurniture.js'
import {clearLocaleStorage} from './api/utils.js'

updateNav()

const root = document.getElementById('root')
const logOutBtn = document.getElementById('logoutBtn').addEventListener('click', onLogout )
   
    



page(updateCtx)
page('/', showCatalog)
page('/Create', showCreatePage)
page('/Login', showLogin)
page('/Register', showRegister)
page('/Details/:id', detailsPage)
page('/Edit/:id', showItemToUpdate)
page('/My-furnitures',myFurnituresPage)
page('/Delete/:id', deleteItem)


function updateCtx(ctx, next) {
    ctx.render = (content) => (render(content, root))
    ctx.updateNav = updateNav

    next()
}

page.start()


function updateNav() {
    const userData = getDataFromLocaleStorage()
    const userDiv = document.getElementById('user')
    const guestDiv = document.getElementById('guest')
    if (userData) {
        userDiv.style.display = 'inline-block'
        guestDiv.style.display = 'none'
    } else {
        userDiv.style.display = 'none'
        guestDiv.style.display = 'inline-block'
    }
}

export async function onLogout() {
    await get('/users/logout')
    clearLocaleStorage()
    updateNav();
    page.redirect('/')
}