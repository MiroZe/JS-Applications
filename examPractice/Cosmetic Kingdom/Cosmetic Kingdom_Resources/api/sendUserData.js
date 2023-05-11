

import{del,post,get} from './api.js'
import { clearLocaleStorage, setDataToLocaleStorage } from './utils.js'


const endPoints = {
    'login': '/users/login',
    'register': '/users/register',
    'logout' : '/users/logout',
    
}



export async function onLogin(email, password) {

    return post (endPoints.login,{email,password})

}

export async function onRegister(email, password) {

    return post(endPoints.register,{email,password})

}


export async function onLogout() {
    return get(endPoints.logout)
}


