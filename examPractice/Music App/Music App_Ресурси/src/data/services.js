
import {get, post,del,put} from './api.js'



const endpoints = {

getAllAlbums: '/data/albums?sortBy=_createdOn%20desc&distinct=name',
createAlbum : '/data/albums',
getAlbumById : '/data/albums/',
deleteAlbum: '/data/albums/',
editAlbum : '/data/albums/'

} 


export function getAllAlbums(name,
    imgUrl,
    price,
    releaseDate,
    artist,
    genre,
    description
  ) {
    return get(endpoints.getAllAlbums)
}

export function createAlbum (name,imgUrl,price,releaseDate,artist,genre,description) {

    return post(endpoints.createAlbum,{name,imgUrl,price,releaseDate,artist,genre,description
      })

}

export function getAlbumById(albumId) {
    return get(endpoints.getAlbumById + albumId)
}

export function deleteAlbumById(id) {

    return del(endpoints.deleteAlbum + id)

}

export function editAlbum (id,name,imgUrl,price,releaseDate,artist,genre,description) {

    return put(endpoints.editAlbum + id,{name,imgUrl,price,releaseDate,artist,genre,description})

}

//search requests

export function getAlbumsByQuery(query) {
    return get(`/data/albums?where=name%20LIKE%20%22${query}%22`)
}