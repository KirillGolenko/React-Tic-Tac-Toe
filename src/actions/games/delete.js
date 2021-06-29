// src/actions/games/delete.js

import API from '../../api/client'

export const FETCHED_GAMES = 'FETCHED_GAMES'
export const FETCHED_ONE_GAME = 'FETCHED_ONE_GAME'
const api = new API()

export const deleteGamesFrom = (id) => {

    return () => {
      api.delete(`/games/${id}`)
        .then((result) => {
          
        })
        .catch((error) => {
        
        })
    }
}