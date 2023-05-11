import { showDashboard } from '../views/dashboard.js'
import { showLogin } from '../views/login.js'
import { showRegister } from '../views/register.js'
import { showCreate } from '../views/createIdea.js'
import { showHome } from '../views/home.js'
import { logout } from '../data/users.js'
import { showDetailsPage } from '../views/details.js'




const main = document.getElementById('main')
const navBar = document.getElementById('navigation');

function initilaze() {



}

const links = {
    '/': showHome,
    '/Dashboard': showDashboard,
    '/Login': showLogin,
    '/Create': showCreate,
    '/Register': showRegister,
    '/Logout': logout,
    '/Details': showDetailsPage
}


navBar.addEventListener('click', showSection)

const ctx = {
    showTargetSection,
    goTo,
    updateNav
}

export function showSection(e) {

    e.preventDefault();
    let target = e.target

    if (target.tagName === 'IMG') {
        target = e.target.parentElement
    }

    if (target.tagName === 'A') {
        const url = new URL(target.href);
        const path = links[url.pathname]
        goTo(url.pathname)

    }
}

function goTo(path, ...params) {
    const handler = links[path]
    
    if (typeof handler == 'function') {
        handler(ctx, ...params)
    }
}

function showTargetSection(section) {
    main.replaceChildren(section)
}

export function updateNav() {
    const user = localStorage.getItem('userData')
    if (user) {
        Array.from(document.querySelectorAll('.guest')).forEach(a => a.style.display = 'none')
        Array.from(document.querySelectorAll('.user')).forEach(a => a.style.display = 'block')
    } else {
        Array.from(document.querySelectorAll('.guest')).forEach(a => a.style.display = 'block')
        Array.from(document.querySelectorAll('.user')).forEach(a => a.style.display = 'none')
    }
}