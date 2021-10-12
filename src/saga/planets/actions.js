import { types } from "./actionTypes";

export const setPlanets = (payload) => ({
    type: types.SET_PLANETS,
    payload,
});

export const setPlanetInfo = (payload) => ({
    type: types.SET_PLANET_INFO,
    payload,
});

export const setPlanetFilmsSaga = (payload) => ({
    type: types.SET_PLANET_FILMS_SAGA,
    payload,
});

export const setPlanetResidentsSaga = (payload) => ({
    type: types.SET_PLANET_RESIDENTS_SAGA,
    payload,
});