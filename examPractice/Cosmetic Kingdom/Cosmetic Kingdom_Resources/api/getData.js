import {del,post,get,put} from './api.js'


const endPoints = {
    'getAll' : '/data/products?sortBy=_createdOn%20desc',
    'createItem' : '/data/products',
    'getOneItem' : '/data/products',
    'delete' : '/data/products',
    'edit' : '/data/products'


}


 export async function getAll() {
    return get(endPoints.getAll)
    

}

 export async function sendCreatedItem(name,imageUrl,category,description,price) {
    return  post(endPoints['createItem'],({name,imageUrl,category,description,price}))
}


export function getOneItem(id) {
    return get(`${endPoints.getOneItem}/${id}`)

}

export async function updateItem(id,name,imageUrl,category,description,price){
    return put(`${endPoints.edit}/${id}`,{name,imageUrl,category,description,price})
}

export async function deleteById (id) {
    return del(`${endPoints.delete}/${id}`)
}

export async function getMyItems(userId) {

    return  get(`/data/catalog?where=_ownerId%3D%22${userId}%22`)
}