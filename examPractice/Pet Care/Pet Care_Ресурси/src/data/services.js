import {del,post,get,put} from './api.js'



const endpoints = {

getAllPets : '/data/pets?sortBy=_createdOn%20desc&distinct=name',
createPet : '/data/pets',
getPetsById : '/data/pets/',
editPet : '/data/pets/',
deletePet: '/data/pets/'


}


export function getAllPets() {
    return get(endpoints.getAllPets)
}

export function createPet (userData) {
return post(endpoints.createPet,userData)

}

export function getPetById(id) {
    return get(endpoints.getPetsById + id)
}

export function deletePetById(id) {
    return del(endpoints.deletePet + id)
}

export function editPet(id, userData) {

    return put(endpoints.editPet + id, userData)
}


//bonus 

export function postDonation (petId) {
    return post('/data/donation', {petId})

}

export function getTotalDonations (petId) {
    return get(`/data/donation?where=petId%3D%22${petId}%22&distinct=_ownerId&count`)
}

export function getDonationForThisUser(petId,userId) {
    return get(`/data/donation?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
}