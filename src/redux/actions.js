import { types } from "./actionTypes";

export const setList = (payload) => ({
    type: types.SET_LIST,
    payload,
});

export const setInfoData = (payload) => ({
    type: types.SET_INFO_DATA,
    payload,
});

export const setLinksFilms = (payload) => ({
    type: types.SET_LINKS_FILMS,
    payload,
});

export const setLinksSpecies = (payload) => ({
    type: types.SET_LINKS_SPECIES,
    payload,
});

export const setLinksVehicles = (payload) => ({
    type: types.SET_LINKS_VEHICLES,
    payload,
});

export const setLinksResidents = (payload) => ({
    type: types.SET_LINKS_RESIDENTS,
    payload,
});

export const setLinksCharacters = (payload) => ({
    type: types.SET_LINKS_CHARACTERS,
    payload,
});

export const setLinksPlanets = (payload) => ({
    type: types.SET_LINKS_PLANETS,
    payload,
});

export const setLinksStarships = (payload) => ({
    type: types.SET_LINKS_STARSHIPS,
    payload,
});