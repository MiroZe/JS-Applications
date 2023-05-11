import {post,get,put,del} from './api.js'



const endpoints = {
    getAllCars : '/data/cars?sortBy=_createdOn%20desc',
    createCar : '/data/cars',
    getCarById : '/data/cars/',
    deleteCar : '/data/cars/',
    editCar : '/data/cars/',
    'myItems' : (userId) => `/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`

}


export function getAllCars() {
    return get(endpoints.getAllCars)
}

export function createCar(brand,model,description,year,imageUrl,price) {

    return post(endpoints.createCar,({brand,model,description,year,imageUrl,price}))
}

export function getCarById(id) {
    return get(endpoints.getCarById + id)
}

export function deleteCarById(id) {
    return del(endpoints.deleteCar + id)
}

export function editCar(id,brand,model,description,year,imageUrl,price) {
  return  put(endpoints.editCar + id, {brand,model,description,year,imageUrl,price})

}

export function getMyItems(userId) {
    return get(endpoints.myItems(userId))
}

//bonus 

export function getCarsByQuery(query) {
    return get(`/data/cars?where=year%3D${query}`)
}
