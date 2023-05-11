import {del, get,post,put} from './api.js'

const endpoints = {
    getAll : '/data/offers?sortBy=_createdOn%20desc',
    createOffer : '/data/offers',
    getOfferDetail: '/data/offers/',
    deleteById : '/data/offers/',
    editByID : '/data/offers/'
}

export  async function getAllOffers() {

    return get(endpoints.getAll)

}

export async function createOffer(data) {
   return  post(endpoints.createOffer,(data))
}

export async function getOfferById(id) {
    return get(endpoints.getOfferDetail + id)
}

export async function onDelete(id) {
    return del(endpoints.deleteById + id)
}

export async function editByID(id,data) {
    return put(endpoints.editByID + id,data)

}
