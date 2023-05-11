import {get,post,del,put} from '../app,js'




const endpoints = {

    getAll : '',
    getById : '',
    cteateById : '',
    deleteById : '',
    editById : '',


}



export function getAll() {

    return get(endpoints.getAll)
}

export function getById(id) {
    return get(endpoints.getById + id)
}

export function createById(el,el1,el2,el3) {
    return post(endpoints.cteateById, {el,el1,el2,el3})
}

export function editById(id,el,el1,el2,el3) {
    return put(endpoints.editById + id, {el,el1,el2,el3})
}

export function deleteById (id) {
    return del(endpoints.deleteById + id)
}
