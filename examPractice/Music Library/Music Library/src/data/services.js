import {get,post,del,put} from './api.js'




const endpoints = {

    getAll : '/data/albums?sortBy=_createdOn%20desc',
    getById : '/data/albums/',
    cteateById : '/data/albums',
    deleteById : '/data/albums/',
    editById : '/data/albums/',


}



export function getAll() {

    return get(endpoints.getAll)
}

export function getById(id) {
    return get(endpoints.getById + id)
}

export function createAlbum(albumData) {
    return post(endpoints.cteateById,albumData)
}

export function editById(id,albumData) {
    return put(endpoints.editById + id,albumData)
}

export function deleteById (id) {
    return del(endpoints.deleteById + id)
}


// bonus

export function postLike (albumId) {
    return post ('/data/likes', {albumId})
}

export function getTotalLikes (albumId) {
    return get(`/data/likes?where=albumId%3D%22${albumId}%22&distinct=_ownerId&count`)
}

export function getCreatorLikes(albumId,userId) {
    return get(`/data/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
}