document.getElementById('logout').style.display = 'none';

const loginForm = document.querySelector('form');
loginForm.addEventListener('submit',userLogin);
const loginUrl = 'http://localhost:3030/users/login'


async function userLogin(e) {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget)
    const {email,password} = Object.fromEntries([...formData.entries()]);
    try {
        if(!email || !password) {
            throw new Error('The fields can not be empty');
        }
        const options = {method: 'POST',
                        Headers:{'content-type':'application/json'},
                        body: JSON.stringify({email,password})};

        const response = await fetch(loginUrl,options)
        if(!response.ok) {
            const error = await response.json();
            throw error;
        }
        const data = await response.json();
        console.log(data);
        localStorage.setItem('token',data.accessToken);
        localStorage.setItem('email',data.email);
        localStorage.setItem('id',data._id);
        location = './index.html';
        
    } catch (error) {
        alert(error.message);
        loginForm.reset();

    }

   
}