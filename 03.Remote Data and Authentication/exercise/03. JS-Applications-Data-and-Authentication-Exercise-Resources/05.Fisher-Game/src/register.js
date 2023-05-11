const registerForm = document.querySelector('form');
registerForm.addEventListener('submit', registerUser);
const url = 'http://localhost:3030/users/register';
const welcomeSpan = document.querySelector('.email span');
const logoutBtn = document.getElementById('logout').style.display = 'none'

async function registerUser(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const userData = {
        email:data.get('email'),
        password:data.get('password'),
        rePass:data.get('rePass')
    }
    try {   
    if(!userData.email || !userData.password){
        throw new Error('Please submit correct data')
    }
    if(userData.password != userData.rePass) {
        throw new Error('Password and Repass not match!')
    }
    
        const option = {
            method:'POST',
            headers:{'content-type':'application/json'},
            body:JSON.stringify({email:userData.email,password:userData.password})
        }
        const response = await fetch(url,option);
        if(!response.ok) {
            const error = await response.json();
            throw error;
        }
        const result = await response.json();
        localStorage.setItem('accessToken',result.accessToken);
        localStorage.setItem('email',result.email);
        localStorage.setItem('id',data._id);
        
        welcomeSpan.textContent = localStorage.getItem('email')
        
        location = './index.html';
        
    } catch (error) {
        alert(error.message)
        event.target.reset()
    }
}