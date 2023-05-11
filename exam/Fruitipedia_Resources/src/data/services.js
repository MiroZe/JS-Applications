import {get,post,put,del} from './api.js'



const endpoints = {

    getallFruits : '/data/fruits?sortBy=_createdOn%20desc',
    createFruit: '/data/fruits',
    getFruitById : '/data/fruits/',
    editFruit : '/data/fruits/',
    deleteById : '/data/fruits/'

}


export function getallFruits() {
    return get(endpoints.getallFruits)
}

export function createFruit(fruitData) {
    return post(endpoints.createFruit, fruitData)
}

export function getFruitById(fruitId) {
 return get(endpoints.getFruitById + fruitId)

}

export function editFruit(id,fruitData) {
    return put(endpoints.editFruit + id, fruitData)
}

export function deleteFruitById(fruitId) {
    return del(endpoints.deleteById + fruitId)
}

//bonus

export function searchFruitsByQuery(query) {
    return get(`/data/fruits?where=name%20LIKE%20%22${query}%22`)
}