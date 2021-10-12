import { types } from "./actionTypes";

export const setPlanetsData = (payload) => ({
    type: types.SET_PLANETS_DATA,
    payload,
});

export const setPlanetInfoData = (payload) => ({
    type: types.SET_PLANET_INFO_DATA,
    payload,
});

export const setPlanetFilms = (payload) => ({
    type: types.SET_PLANET_FILMS,
    payload,
});

export const setPlanetsResidents = (payload) => ({
    type: types.SET_PLANET_RESIDENTS,
    payload,
});