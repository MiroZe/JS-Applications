import {del,post,get,put} from './api.js'


const endPoints = {
    'getAll' : '/data/albums?sortBy=_createdOn%20desc',
    'createItem' : '/data/albums',
    'getOneItem' : '/data/albums',
    'delete' : '/data/albums'


}


 export async function getAll() {
    return get(endPoints.getAll)
    

}

 export async function sendCreatedItem(singer,album,imageUrl,release,label,sales) {
    return  post(endPoints['createItem'],({singer,album,imageUrl,release,label,sales}))
}


export function getOneItem(id) {
    return get(`${endPoints.getOneItem}/${id}`)

}

export async function updateItem(id,singer,album,imageUrl,release,label,sales){
    return put(`${endPoints.getOneItem}/${id}`,{singer,album,imageUrl,release,label,sales})
}

export async function deleteById (id) {
    return del(`${endPoints.delete}/${id}`)
}

export async function getMyItems(userId) {

    return  get(`/data/catalog?where=_ownerId%3D%22${userId}%22`)
}