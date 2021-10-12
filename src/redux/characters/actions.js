import { types } from "./actionTypes";

export const setCharactersData = (payload) => ({
    type: types.SET_CHARACTERS_DATA,
    payload,
});

export const setCharacterInfoData = (payload) => ({
    type: types.SET_CHARACTER_INFO_DATA,
    payload,
});

export const setCharacterFilms = (payload) => ({
    type: types.SET_CHARACTER_FILMS,
    payload,
});

export const setCharacterSpecies = (payload) => ({
    type: types.SET_CHARACTER_SPECIES,
    payload,
});

export const setCharacterVehicles = (payload) => ({
    type: types.SET_CHARACTER_VEHICLES,
    payload,
});