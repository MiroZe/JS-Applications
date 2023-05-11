
import {html,render} from '../node_modules/lit-html/lit-html.js'
import { showDashboard } from '../views/dashboard.js'
import {showSection, updateNav} from './router.js'
import {showRegister} from '../views/register.js'
import { showHome } from '../views/home.js'

const homeSection = document.getElementById('home')
const main = document.getElementById('main')

function init() {
main.replaceChildren(homeSection)
updateNav()
}

init()


