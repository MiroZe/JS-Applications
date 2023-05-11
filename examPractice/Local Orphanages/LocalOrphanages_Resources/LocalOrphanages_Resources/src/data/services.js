import {get,post,put,del} from './api.js'


const endpoinst = {
    getAll : '/data/posts?sortBy=_createdOn%20desc',
    createItem : '/data/posts',
    getById : '/data/posts/',
    deleteById : '/data/posts/',
    editItem : '/data/posts/'
}



export function getAll() {

    return get(endpoinst.getAll)
}

export function createItem (title,description,imageUrl,address,phone) {

    return post(endpoinst.createItem,{title,description,imageUrl,address,phone})
}

export function getById(itemId) {

    return get(endpoinst.getById + itemId)
}

export function deleteById(id) {

    return del(endpoinst.deleteById + id)
}

export function editItem(itemId,title,description,imageUrl,address,phone) {
    return put(endpoinst.editItem + itemId, {title,description,imageUrl,address,phone})
}

export function getMyItems(userId) {
    return get(`/data/posts?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
}


//bonus donations

export function postDonation (postId) {
    return post('/data/donations',{postId})
}

export function getDonationsForPost(postId) {
    return get(`/data/donations?where=postId%3D%22${postId}%22&distinct=_ownerId&count`)
}

export function getDonationsForUser(postId,userId) {
    return get(`/data/donations?where=postId%3D%22${postId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
}