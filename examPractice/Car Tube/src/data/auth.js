import { clearUserData, setUserData } from "../util.js"
import {post,get} from './api.js'

const endpoints = {
    login : '/users/login',
    register :'/users/register',
    logout : '/users/logout'

}


export async function login(username, password) {
    const result = await post(endpoints.login,{username,password})
    setUserData(result)
}

export async function register(username, password) {
    const result = await post(endpoints.register,{username,password})
    setUserData(result)
}

export function logout() {
    get(endpoints.logout)
    clearUserData()
}