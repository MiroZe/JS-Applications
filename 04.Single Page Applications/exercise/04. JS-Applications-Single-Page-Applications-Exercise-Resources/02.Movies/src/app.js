import { showSection,hideAll } from "./router.js";
import { loadMovies } from "./showMovies.js";
import {showHome} from './router.js'
import {onLogin} from './login.js'


hideAll()
showHome()




const nav = document.querySelector('nav');
nav.addEventListener('click',loadSection)





const sections = {
    '/Home' : document.getElementById('home-page'),
    '/add' : document.getElementById('add-movie'),
    '/home' : document.getElementById('movie-example'),
    '/Login' : document.getElementById('form-login'),
    '/Register' : document.getElementById('form-sign-up'),
    '/Edit' : document.getElementById('edit-movie')
}

  


function loadSection(event) {
    
    if(event.target.tagName == 'A' && event.target.href) {
        event.preventDefault();
       
       const url = new URL(event.target.href);
       const pathName = url.pathname;  
       if(pathName == '/Home') {
           hideAll();
           showHome()

    } else if(pathName == '/Logout'){
        hideAll()
        logout();
        showHome()
        
      
    } else {
        hideAll()
        showSection(sections[pathName])
    }
    
}
}

function logout() {
    const user = localStorage.getItem('user');
    if(user) {
        localStorage.removeItem('user')
    }
    showHome()
}


