import { registerUser } from "./users.js";
import * as api from '../api/api.js'


const endpoints = {
    'getAllIdeas' : '/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc',
    'createIdea' : '/data/ideas',
    'detailsIdea' : '/data/ideas',
    'deleteIdea' : '/data/ideas'
}

export async function getAllIdeas() {
       return await api.get(endpoints['getAllIdeas'])
}

export async function getDetailsIdea(id) {
    return await api.get(`${endpoints['detailsIdea']}/${id}`)
}


export async function postIdea(title,description,imageURL) {
    let img = imageURL
    return await api.post(endpoints['createIdea'],{title,description,img})
}

export async function deleteIdea(id) {
    return await api.del(`${endpoints['deleteIdea']}/${id}`)
}