import page from "../node_modules/page/page.mjs"
import { render } from "../node_modules/lit-html/lit-html.js"
import { layoutTemplate } from "./views/layout.js"
import { getUserData } from "./util.js"
import { showLoginPage } from "./views/loginPage.js"
import { showregisterPage } from "./views/registerPage.js"
import { logout } from "./data/auth.js"
import { showCatalogPage } from "./views/catalogPage.js"
import { showCreatePage } from "./views/addBook.js"
import { showDetailsPage } from "./views/detailsPage.js"
import { showEditPage } from "./views/editPage.js"
import { showMyBooksPage } from "./views/myBooks.js"

//TO DO change root with correct root
const root = document.getElementById('container')
page(decorateContext)
page('index.html','/')
page('/','/catalog')
page('/catalog', showCatalogPage)
page('/login', showLoginPage)
page('/register', showregisterPage)
page('/logout', logoutAction)
page('/create', showCreatePage)
page('/details/:id', showDetailsPage)
page('/edit/:id', showEditPage)
page('/my-books', showMyBooksPage)


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
    ctx.page.redirect('/catalog')
}