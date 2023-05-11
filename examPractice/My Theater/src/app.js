import page from "../node_modules/page/page.mjs"
import { render } from "../node_modules/lit-html/lit-html.js"
import { layoutTemplate } from "./views/layout.js"
import { getUserData } from "./util.js"
import { showLoginPage } from "./views/loginPage.js"
import { showregisterPage } from "./views/registerPage.js"
import { logout } from "./data/auth.js"
import { showHomePage } from "./views/homePage.js"
import { showCreatePage } from "./views/createPage.js"
import { showDetailsPage } from "./views/detailsPage.js"
import { showEditPage } from "./views/editPage.js"
import { showProfilePage } from "./views/profilePage.js"

//TO DO change root with correct root
const root = document.getElementById('container')
page(decorateContext)
page('index.html', '/')
page('/', showHomePage)
page('/login', showLoginPage)
page('/register', showregisterPage)
page('/logout', logoutAction)
page('/create', showCreatePage)
page('/details/:id', showDetailsPage)
page('/edit/:id', showEditPage)
page('/profile', showProfilePage)


page.start()


function decorateContext(ctx, next) {

    ctx.render = renderView


    next();
}

function renderView(content) {
    const userData = getUserData()
 render(layoutTemplate(userData,content),root)
}

function logoutAction(ctx) {
    logout();
    ctx.page.redirect('/')
}