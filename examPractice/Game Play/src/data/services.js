
import{del,post,put,get} from './api.js'

const enpoints = {
    getAllGames : '/data/games?sortBy=_createdOn%20desc',
    getRecentGames : '/data/games?sortBy=_createdOn%20desc&distinct=category',
    createGame: '/data/games',
    gameDetails : '/data/games/',
    getGameById : '/data/games/',
    deleteById :'/data/games/'
}



export function getAllGames() {

    return get(enpoints.getAllGames)

}

export function getRecentGames() {

    return get(enpoints.getRecentGames)

}

export function createGame (createdGame) {
    return post(enpoints.createGame,createdGame)
}

export function gameDetails(id) {
    return get(enpoints.gameDetails + id)
}

export function getGameById (id) {
    return get(enpoints.getGameById + id)

}
export function postEditedGame (id,data) {
    return put(enpoints.getGameById + id,data)

}

export function deleteById(id) {
    return del(enpoints.deleteById + id)
}

export function getComments(gameId) {
    return get(`/data/comments?where=gameId%3D%22${gameId}%22`);
}


export function createComment(gameId,comments) {
    return post('/data/comments',gameId,comments)

}