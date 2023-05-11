import {del,post,get,put} from './api.js'


const endPoints = {
    'getAll' : '/data/catalog',
    'createItem' : '/data/catalog',
    'getOneItem' : '/data/catalog',
    'delete' : '/data/catalog'


}


 export async function getAllFurniture() {
    return get(endPoints.getAll)
    

}

 export async function sendCreatedItem(make,model,year,description,price,img,material) {
    return  post(endPoints['createItem'],({make,model,year,description,price,img,material}))
}


export function getOneItem(id) {
    return get(`${endPoints.getOneItem}/${id}`)

}

export async function updateItem(id,make,model,year,description,price,img,material){
    return put(`${endPoints.getOneItem}/${id}`,{make,model,year,description,price,img,material})
}

export async function deleteById (id) {
    return del(`${endPoints.delete}/${id}`)
}

export async function getMyItems(userId) {

    return  get(`/data/catalog?where=_ownerId%3D%22${userId}%22`)
}