import page from "../node_modules/page/page.mjs"
import {render} from "../node_modules/lit-html/lit-html.js"
import { getUserData } from "./utils.js"
import { showHomePage } from "./views/homePage.js"
import { layoutTemplate } from "./views/layout.js"
import { showLoginPage } from "./views/loginPage.js"
import { logout } from '../src/data/auth.js'
import { showRegisterPage } from "./views/registerPage.js"
import { showAllGames } from "./views/allGames.js"
import { showCreatePage } from "./views/createGame.js"
import { showDetailsPage } from "./views/detailsPage.js"
import { showEditPage } from "./views/editPage.js"


const root = document.getElementById('box')

page(decorateContext)

page('index.html', '/')
page('/', showHomePage)
page('/login', showLoginPage)
page('/logout',logoutAction )
page('/register', showRegisterPage)
page('/catalog', showAllGames)
page('/create', showCreatePage)
page('/details/:id', showDetailsPage)
page('/edit/:id', showEditPage)


page.start()


function decorateContext(ctx, next) {

    ctx.render = renderView

    next()
}


function renderView(content) {
    const userData = getUserData()
 render(layoutTemplate(userData,content),root)
}

function logoutAction(ctx) {
    logout();
    ctx.page.redirect('/')
}