import {del,get,post,put} from './api.js'



const endPoinst = {

    getAllBooks : '/data/books?sortBy=_createdOn%20desc',
    postBook : '/data/books',
    getOneBook : '/data/books/',
    deleteBook : '/data/books/',
    editBook : '/data/books/'
}


export function  getAllBooks () {
    return get(endPoinst.getAllBooks)
}


export function createBook (title,description,imageUrl,type) {
    return post(endPoinst.postBook, {title,description,imageUrl,type})
}

export function getBookById(id) {
    return get(endPoinst.getOneBook + id)
}

export function deleteById (id) {
    return del(endPoinst.deleteBook + id)
}

export function postEditedBook(id,title,description,imageUrl,type) {
    return put(endPoinst.editBook + id, {title,description,imageUrl,type})
}

export function getMyBooks(userId) {

    return get(`/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
}


//bonus requests

export function addLike (bookId) {
    return post('/data/likes', {bookId})
}

export function getTotalBookLike(bookId) {
    return get(`/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`)
}

export function getLikeForUser(bookId,userId) {
    return get(`/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
    //return 0 || 1
}