import { loadMovies } from "./showMovies.js";

const homeSection = document.getElementById('home-page');
const userNav = document.querySelectorAll('.user')
const guestNav = document.querySelectorAll('.guest')
const wolcomeSection = document.getElementById('welcome-msg')

export function hideAll () {
    Array.from(document.querySelectorAll('section')).map(s => s.style.display = 'none');
    }  


export function showSection (section) {
    section.style.display = 'block';
}
export function showHome() {
    document.getElementById('home-page').style.display = 'block';
    document.getElementById('movie-example').style.display = 'block';
    const user = JSON.parse(localStorage.getItem('user'))

    if(!user) {
        userNav.forEach(li => li.style.display = 'none')
        guestNav.forEach(li => li.style.display = 'block')
        wolcomeSection.textContent = `Welcome guest`
    } else {
        userNav.forEach(li => li.style.display = 'block')
        guestNav.forEach(li => li.style.display = 'none')
        wolcomeSection.textContent = `Welcome ${user.email}`
    }
    
    loadMovies()
    
}
