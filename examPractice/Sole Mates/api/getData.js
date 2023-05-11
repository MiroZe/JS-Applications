import {del,post,get,put} from './api.js'


const endPoints = {
    'getAll' : '/data/shoes?sortBy=_createdOn%20desc',
    'createItem' : '/data/shoes',
    'getOneItem' : '/data/shoes',
    'delete' : '/data/shoes'


}


 export async function getAll() {
    return get(endPoints.getAll)
    

}

 export async function sendCreatedItem(brand,model,imageUrl,release,designer,value) {
    return  post(endPoints['createItem'],({brand,model,imageUrl,release,designer,value}))
}


export function getOneItem(id) {
    return get(`${endPoints.getOneItem}/${id}`)

}

export async function updateItem(id,brand,model,imageUrl,release,designer,value){
    return put(`${endPoints.getOneItem}/${id}`,{brand,model,imageUrl,release,designer,value})
}

export async function deleteById (id) {
    return del(`${endPoints.delete}/${id}`)
}

export async function getSearchedItems(query) {

    return  get(`/data/shoes?where=brand%20LIKE%20%22${query}%22`)
}