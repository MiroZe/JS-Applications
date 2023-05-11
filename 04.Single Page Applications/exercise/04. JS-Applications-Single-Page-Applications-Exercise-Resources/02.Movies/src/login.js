import {showHome} from './router.js'


const loginSection = document.querySelector('#login-form');


loginSection.addEventListener('submit',onLogin);
const loginUrl = 'http://localhost:3030/users/login'



export async function onLogin(event) {
    event.preventDefault();
    
    const formData = new FormData(loginSection);
    const {email, password} = Object.fromEntries(formData.entries());
   
    try {
        const response = await fetch(loginUrl, {
            method: 'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({email,password})
        })
        if(!response.ok) {
            const error = await response.json();
            throw error
        }
        const userData = await response.json();
       localStorage.setItem('user',JSON.stringify(userData))
       showHome()
       
        
    } catch (error) {
        alert(error.message);
        throw error;
    }



}