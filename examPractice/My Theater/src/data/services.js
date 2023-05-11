import {del,post,put,get} from './api.js'

const endpoint = {

    getAll : '/data/theaters?sortBy=_createdOn%20desc&distinct=title',
    createItem : '/data/theaters',
    getEvent : '/data/theaters/',
    deleteItem : '/data/theaters/',
    editItem : '/data/theaters/',

}



export  function getAll() {

    return get(endpoint.getAll)

}

export function createEvent(data) {
    return post(endpoint.createItem, data)
}

export function getEventById(id) {
   return  get(endpoint.getEvent + id)
}

export function deleteItemById(id) {
    return del(endpoint.deleteItem + id)

}

export function postEdited(id, data) {
    return put(endpoint.editItem + id, data)
}

export function showMyEvents(userId) {
    return get(`/data/theaters?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
}

//bonus fetch

export function getTheterAllLikes(theaterId) {
    return get(`/data/likes?where=theaterId%3D%22${theaterId}%22&distinct=_ownerId&count`)
}

export function getUserLikes (theaterId,userId) {
    return get (`/data/likes?where=theaterId%3D%22${theaterId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
    //return 0 or 1

}

export function postLike(theaterId) {
    return post('/data/likes', {theaterId})
}