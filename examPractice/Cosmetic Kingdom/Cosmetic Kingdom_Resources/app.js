
import { updateMIdlleWare } from './middleWears/updatePage.js'
import page from './node_modules/page/page.mjs'
import { showAddPage } from './views/addPage.js'
import { showCatalogPage } from './views/catalogPage.js'
import { showDeletePage } from './views/deletePage.js'
import { showDetailsPage } from './views/detailsPage.js'
import { showEditPage } from './views/editPage.js'
import { showHomePage } from './views/homePage.js'
import { showLoginPage } from './views/loginPage.js'
import { showLogoutPage } from './views/logoutPage.js'
import { showRegisterPage } from './views/registerPage.js'



page(updateMIdlleWare)


page('/', showHomePage)
page('/catalog', showCatalogPage)
page('/add', showAddPage)
page('/login', showLoginPage)
page('/register', showRegisterPage)
page('/logout', showLogoutPage)
page('/details/:id', showDetailsPage)
page('/edit/:id', showEditPage)
page('/delete/:id', showDeletePage)



page.start()