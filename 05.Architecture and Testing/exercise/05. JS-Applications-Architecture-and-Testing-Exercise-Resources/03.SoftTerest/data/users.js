import {del,post,put,get} from '../api/api.js'


const endpoints = {
    'login' : '/users/login',
    'register' : '/users/register',
    'logout' : '/users/logout',
    
}

export async function login (email,password) {
    const userData = await post(endpoints['login'],{email,password})
    localStorage.setItem('userData',JSON.stringify(userData))


}

export async function registerUser (email,password,repeatPassword) {
    const userData = await post(endpoints['register'],{email,password,repeatPassword})
    localStorage.setItem('userData',JSON.stringify(userData)) 
}





export async function logout (ctx) {
    get(endpoints['logout'])
    localStorage.removeItem('userData');
    ctx.updateNav();
    ctx.goTo('/');
}