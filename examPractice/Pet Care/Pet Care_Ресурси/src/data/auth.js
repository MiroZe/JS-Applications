import { clearUserData, setUserData } from "../util.js"
import {get,post} from './api.js'


const endpoints = {
    login : '/users/login',
    register :'/users/register',
    logout : '/users/logout'

}


export async function login(userData) {
    const result = await post(endpoints.login,userData)
    setUserData(result)
}

export async function register(email, password) {
    const result = await post(endpoints.register,{email,password})
    setUserData(result)
}

export function logout() {
    get(endpoints.logout)
    clearUserData()
}