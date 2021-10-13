import { types } from "./actionTypes";

export const setCharacters = (payload) => ({
    type: types.SET_CHARACTERS,
    payload,
});

export const setCharacterInfo = (payload) => ({
    type: types.SET_CHARACTER_INFO,
    payload,
});

export const setCharacterFilmsSaga = (payload) => ({
    type: types.SET_CHARACTER_FILMS_SAGA,
    payload,
});

export const setCharacterSpeciesSaga = (payload) => ({
    type: types.SET_CHARACTER_SPECIES_SAGA,
    payload,
});

export const setCharacterVehiclesSaga = (payload) => ({
    type: types.SET_CHARACTER_VEHICLES_SAGA,
    payload,
})

export const setCharacterStarshipsSaga = (payload) => ({
    type: types.SET_CHARACTER_STARSHIPS_SAGA,
    payload,
});

export const setCharacterHomeworldSaga = (payload) => ({
    type: types.SET_CHARACTER_HOMEWORLD_SAGA,
    payload,
})