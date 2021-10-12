import { types } from "./actionTypes";

export const setStarships = (payload) => ({
    type: types.SET_STARSHIPS,
    payload,
});

export const setStarshipInfo = (payload) => ({
    type: types.SET_STARSHIP_INFO,
    payload,
});

export const setStarshipFilmsSaga = (payload) => ({
    type: types.SET_STARSHIP_FILMS_SAGA,
    payload,
});

export const setStarshipPilotsSaga = (payload) => ({
    type: types.SET_STARSHIP_PILOTS_SAGA,
    payload,
});