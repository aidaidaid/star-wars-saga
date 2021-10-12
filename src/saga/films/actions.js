import { types } from "./actionTypes";

export const setFilms = (payload) => ({
    type: types.SET_FILMS,
    payload,
});

export const setFilmInfo = (payload) => ({
    type: types.SET_FILM_INFO,
    payload,
});

export const setFilmCharactersSaga = (payload) => ({
    type: types.SET_FILM_CHARACTERS_SAGA,
    payload,
});

export const setFilmPlanetsSaga = (payload) => ({
    type: types.SET_FILM_PLANETS_SAGA,
    payload,
});

export const setFilmStarshipsSaga = (payload) => ({
    type: types.SET_FILM_STARSHIPS_SAGA,
    payload,
})

export const setFilmVehiclesSaga = (payload) => ({
    type: types.SET_FILM_VEHICLES_SAGA,
    payload,
});

export const setFilmSpeciesSaga = (payload) => ({
    type: types.SET_FILM_SPECIES_SAGA,
    payload,
})